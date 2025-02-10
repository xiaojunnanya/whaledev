import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Checker from 'vite-plugin-checker'

const isDev = process.env.NODE_ENV === 'development'
const LOCALURL = 'http://localhost:3173'
const PRODURL = 'http://whaleback.xiaojunnan.cn'

const URL = isDev ? LOCALURL : PRODURL

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
    proxy: {
      '/api': {
        target: URL,
        changeOrigin: true,
        rewrite: path => path.replace('/api', '/whaledev/v1'),
      },
      '/img': {
        target: URL,
        changeOrigin: true,
        rewrite: path => path.replace('/img', '/img'),
      },
    },
  },
  build: {
    outDir: '../../build/front',
    emptyOutDir: true,
  },
})
