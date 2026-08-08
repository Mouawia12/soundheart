import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 3020,
    strictPort: true,
    proxy: {
      // Dev: hit the Laravel API through a same-origin proxy (no CORS in dev).
      '/api': {
        target: 'http://127.0.0.1:8020',
        changeOrigin: true,
      },
    },
  },
})
