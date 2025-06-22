import { defineConfig } from 'vite'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import Checker from 'vite-plugin-checker'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

const isDev = process.env.NODE_ENV === 'development'

const LOCALURL = 'http://localhost:3173'
const PRODURL = 'http://whaledev.xiaojunnan.cn'

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
    codeInspectorPlugin({
      bundler: 'vite',
      editor: 'code',
    }),
    viteCompression({
      threshold: 1024 * 10, // 10kb
      algorithm: 'gzip',
      ext: '.gz',
      deleteOriginFile: false,
    }),
    visualizer({ open: true }),
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
      '/whaledev': {
        target: URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../../build/front',
    emptyOutDir: true,
  },
})
