import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    open: false,
    proxy: {
      '/img': {
        target: 'http://localhost:3173/',
        changeOrigin: true,
        rewrite: path => path.replace('/img', '/img'),
      },
      '/api': {
        target: 'http://localhost:3173/',
        changeOrigin: true,
        rewrite: path => path.replace('/api', '/whaledev/v1'),
      },
    },
  },
})
