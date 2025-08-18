import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,        // describe, it, expect disponibles sin importar
    environment: 'node',  // simula entorno Node.js
    coverage: {
      provider: 'v8',     // soporte de cobertura
      reportsDirectory: './coverage'
    }
  },
});
