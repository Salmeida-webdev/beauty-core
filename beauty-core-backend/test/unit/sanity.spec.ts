describe('Beauty Core Unit Sanity', () => {
  it('deve executar ambiente unit?rio Jest corretamente', () => {
    expect(true).toBe(true);
  });

  it('deve estar em ambiente de teste quando NODE_ENV for definido', () => {
    process.env.NODE_ENV = process.env.NODE_ENV ?? 'test';
    expect(['test', 'development', 'production']).toContain(
      process.env.NODE_ENV,
    );
  });
});
