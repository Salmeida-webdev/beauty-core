function sanitizeFilenamePart(
  value: string,
): string {
  return value.replace(
    /[^a-zA-Z0-9_-]/g,
    "-",
  );
}

export function downloadClienteLgpdJson(
  payload: unknown,
  clienteId: string,
): void {
  const content = JSON.stringify(
    payload,
    null,
    2,
  );

  const blob = new Blob(
    [content],
    {
      type: "application/json;charset=utf-8",
    },
  );

  const objectUrl =
    URL.createObjectURL(
      blob,
    );

  const anchor =
    document.createElement(
      "a",
    );

  anchor.href = objectUrl;
  anchor.download =
    `cliente-${sanitizeFilenamePart(
      clienteId,
    )}-lgpd.json`;

  document.body.appendChild(
    anchor,
  );

  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(
    objectUrl,
  );
}
