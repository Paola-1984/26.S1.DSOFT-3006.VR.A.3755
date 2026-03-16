/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,      // Aquí fijamos el puerto
    strictPort: true // Evitamos que salte a otros puertos
  },
  test: {
    globals: true,
    environment: 'jsdom'
  },
  build: {
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
  }
})