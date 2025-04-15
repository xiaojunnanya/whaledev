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
      '/whaledev': {
        target: URL,
        changeOrigin: true,
        // rewrite: path => path.replace('/whaledev', '/whaledev')
      },
      '/img': {
        target: URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../../build/front',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
            // 希望合并的库, 合并成 vendor.[hash].js，减少请求数。
            const vendorPackages = [
              'lodash-es',
              'axios',
              'react',
              'antd',
              '@ant-design/x',
              '@ant-design/icons',
              'typescript',
              'vite',
            ]
            return vendorPackages.includes(packageName) ? 'vendor' : packageName
          }
        },
      },
    },
  },
})
