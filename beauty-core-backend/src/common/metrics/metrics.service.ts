import { Injectable } from '@nestjs/common';

type HttpRequestLabels = {
  method: string;
  route: string;
  statusCode: string;
};

type HttpErrorLabels = HttpRequestLabels & {
  errorFamily: string;
};

type HistogramState = {
  labels: HttpRequestLabels;
  buckets: Map<number, number>;
  sum: number;
  count: number;
};

@Injectable()
export class MetricsService {
  private readonly serviceName = 'beauty-core-api';
  private readonly environment = process.env.NODE_ENV ?? 'development';
  private readonly version = process.env.APP_VERSION ?? '1.0.0';

  private readonly histogramBuckets = [
    0.005,
    0.01,
    0.025,
    0.05,
    0.1,
    0.25,
    0.5,
    1,
    2.5,
    5,
    10,
  ];

  private readonly httpRequests = new Map<string, number>();
  private readonly httpErrors = new Map<string, number>();
  private readonly httpRequestDurations = new Map<string, HistogramState>();

  observeHttpRequest(params: {
    method: string;
    route: string;
    statusCode: number;
    durationMs: number;
  }): void {
    const labels: HttpRequestLabels = {
      method: this.normalizeLabelValue(params.method || 'UNKNOWN'),
      route: this.normalizeRoute(params.route || 'unknown'),
      statusCode: String(params.statusCode || 0),
    };

    const durationSeconds = Math.max(params.durationMs, 0) / 1000;

    this.increment(this.httpRequests, this.createHttpRequestKey(labels));
    this.observeDuration(labels, durationSeconds);

    if (params.statusCode >= 400) {
      const errorLabels: HttpErrorLabels = {
        ...labels,
        errorFamily: `${Math.floor(params.statusCode / 100)}xx`,
      };

      this.increment(this.httpErrors, this.createHttpErrorKey(errorLabels));
    }
  }

  renderPrometheusMetrics(): string {
    const lines: string[] = [];

    lines.push('# HELP beauty_core_app_info Beauty Core application information.');
    lines.push('# TYPE beauty_core_app_info gauge');
    lines.push(
      `beauty_core_app_info{${this.formatLabels({
        service: this.serviceName,
        environment: this.environment,
        version: this.version,
      })}} 1`,
    );

    lines.push('');
    lines.push('# HELP beauty_core_http_requests_total Total HTTP requests received by the API.');
    lines.push('# TYPE beauty_core_http_requests_total counter');

    for (const [key, value] of [...this.httpRequests.entries()].sort()) {
      const labels = this.parseHttpRequestKey(key);
      lines.push(
        `beauty_core_http_requests_total{${this.formatLabels({
          method: labels.method,
          route: labels.route,
          status_code: labels.statusCode,
        })}} ${value}`,
      );
    }

    lines.push('');
    lines.push('# HELP beauty_core_http_errors_total Total HTTP error responses by status code.');
    lines.push('# TYPE beauty_core_http_errors_total counter');

    for (const [key, value] of [...this.httpErrors.entries()].sort()) {
      const labels = this.parseHttpErrorKey(key);
      lines.push(
        `beauty_core_http_errors_total{${this.formatLabels({
          method: labels.method,
          route: labels.route,
          status_code: labels.statusCode,
          error_family: labels.errorFamily,
        })}} ${value}`,
      );
    }

    lines.push('');
    lines.push('# HELP beauty_core_http_request_duration_seconds HTTP request duration in seconds.');
    lines.push('# TYPE beauty_core_http_request_duration_seconds histogram');

    for (const [, state] of [...this.httpRequestDurations.entries()].sort()) {
      for (const bucket of this.histogramBuckets) {
        lines.push(
          `beauty_core_http_request_duration_seconds_bucket{${this.formatLabels({
            method: state.labels.method,
            route: state.labels.route,
            status_code: state.labels.statusCode,
            le: String(bucket),
          })}} ${state.buckets.get(bucket) ?? 0}`,
        );
      }

      lines.push(
        `beauty_core_http_request_duration_seconds_bucket{${this.formatLabels({
          method: state.labels.method,
          route: state.labels.route,
          status_code: state.labels.statusCode,
          le: '+Inf',
        })}} ${state.count}`,
      );

      lines.push(
        `beauty_core_http_request_duration_seconds_sum{${this.formatLabels({
          method: state.labels.method,
          route: state.labels.route,
          status_code: state.labels.statusCode,
        })}} ${state.sum.toFixed(6)}`,
      );

      lines.push(
        `beauty_core_http_request_duration_seconds_count{${this.formatLabels({
          method: state.labels.method,
          route: state.labels.route,
          status_code: state.labels.statusCode,
        })}} ${state.count}`,
      );
    }

    lines.push('');

    return `${lines.join('\n')}\n`;
  }

  getContentType(): string {
    return 'text/plain; version=0.0.4; charset=utf-8';
  }

  private observeDuration(
    labels: HttpRequestLabels,
    durationSeconds: number,
  ): void {
    const key = this.createHttpRequestKey(labels);

    let state = this.httpRequestDurations.get(key);

    if (!state) {
      state = {
        labels,
        buckets: new Map(this.histogramBuckets.map((bucket) => [bucket, 0])),
        sum: 0,
        count: 0,
      };

      this.httpRequestDurations.set(key, state);
    }

    state.count += 1;
    state.sum += durationSeconds;

    for (const bucket of this.histogramBuckets) {
      if (durationSeconds <= bucket) {
        state.buckets.set(bucket, (state.buckets.get(bucket) ?? 0) + 1);
      }
    }
  }

  private increment(map: Map<string, number>, key: string): void {
    map.set(key, (map.get(key) ?? 0) + 1);
  }

  private createHttpRequestKey(labels: HttpRequestLabels): string {
    return [
      labels.method,
      labels.route,
      labels.statusCode,
    ].join('|');
  }

  private createHttpErrorKey(labels: HttpErrorLabels): string {
    return [
      labels.method,
      labels.route,
      labels.statusCode,
      labels.errorFamily,
    ].join('|');
  }

  private parseHttpRequestKey(key: string): HttpRequestLabels {
    const [method, route, statusCode] = key.split('|');

    return {
      method,
      route,
      statusCode,
    };
  }

  private parseHttpErrorKey(key: string): HttpErrorLabels {
    const [method, route, statusCode, errorFamily] = key.split('|');

    return {
      method,
      route,
      statusCode,
      errorFamily,
    };
  }

  private normalizeRoute(route: string): string {
    return route
      .replace(/\/+/g, '/')
      .replace(/\?.*$/, '')
      .trim() || 'unknown';
  }

  private normalizeLabelValue(value: string): string {
    return String(value || 'unknown').trim() || 'unknown';
  }

  private formatLabels(labels: Record<string, string>): string {
    return Object.entries(labels)
      .map(([key, value]) => `${key}="${this.escapeLabelValue(value)}"`)
      .join(',');
  }

  private escapeLabelValue(value: string): string {
    return String(value)
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/"/g, '\\"');
  }
}
