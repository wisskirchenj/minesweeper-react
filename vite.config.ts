/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {fileURLToPath, URL} from 'node:url';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx'],
  },
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      reporter: ['lcov', 'text'],
    },
    server: {
      deps: {
        inline: ['react'],
      },
    },
  },
})
