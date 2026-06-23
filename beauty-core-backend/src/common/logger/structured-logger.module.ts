import { Global, Module } from '@nestjs/common';

import { RequestContextModule } from '../context/request-context.module';
import { StructuredLoggerService } from './structured-logger.service';

@Global()
@Module({
  imports: [RequestContextModule],
  providers: [StructuredLoggerService],
  exports: [StructuredLoggerService],
})
export class StructuredLoggerModule {}
