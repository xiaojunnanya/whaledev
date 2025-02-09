import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    react(),
    Checker({
      typescript: {
        buildMode: true,
        tsconfigPath: './tsconfig.json',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: 'localhost',
    port: 5173,
    open: false,
    proxy:
      process.env.NODE_ENV === 'development'
        ? {
            '/api': {
              target: 'http://localhost:3173/',
              changeOrigin: true,
              rewrite: path => path.replace('/api', '/whaledev/v1'),
            },
            '/img': {
              target: 'http://localhost:3173/',
              changeOrigin: true,
              rewrite: path => path.replace('/img', '/img'),
            },
          }
        : {
            '/api': {
              target: 'http://whaleback.xiaojunnan.cn/',
              changeOrigin: true,
              rewrite: path => path.replace('/api', '/whaledev/v1'),
            },
            '/img': {
              target: 'http://whaleback.xiaojunnan.cn/',
              changeOrigin: true,
              rewrite: path => path.replace('/img', '/img'),
            },
          },
  },
  build: {
    outDir: '../../build/front',
  },
})
