import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    // Otros ajustes como la inclusión de archivos de test pueden ir aquí
  },
});
