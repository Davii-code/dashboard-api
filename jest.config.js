/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  clearMocks: true,

  // ⚡ Ativar coverage
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',        // incluir todos os arquivos .ts da pasta src
    '!src/**/*.d.ts',     // excluir definições de tipo
    '!src/server.ts'      // opcional: excluir arquivo de inicialização
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
