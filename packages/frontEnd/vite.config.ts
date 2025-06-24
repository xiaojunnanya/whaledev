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
    rollupOptions: {
      output: {
        // 入口文件命名规则
        entryFileNames: 'js/[name].[hash].js',
        // 动态 import 的 chunk 命名规则
        chunkFileNames: 'js/[name].[hash].js',
        // 静态资源分类打包
        assetFileNames: assetInfo => {
          const ext = assetInfo.name?.split('.').pop()?.toLowerCase()
          if (!ext) return 'assets/[name].[hash][extname]'

          if (['png', 'jpg', 'jpeg', 'gif', 'svg', 'webp'].includes(ext)) {
            return 'images/[name].[hash][extname]'
          }

          if (['css'].includes(ext)) {
            return 'css/[name].[hash][extname]'
          }

          if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
            return 'fonts/[name].[hash][extname]'
          }

          return 'assets/[name].[hash][extname]'
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]

            // // React
            // if (
            //   [
            //     'react',
            //     'react-dom',
            //     'react-router-dom',
            //     'zustand',
            //     'typescript',
            //     'styled-components',
            //   ].includes(packageName)
            // ) {
            //   return 'react-vendor'
            // }

            // // Antd
            // if (
            //   [
            //     'antd',
            //     '@ant-design/icons',
            //     '@ant-design/x',
            //     'antd-img-crop',
            //   ].includes(packageName)
            // ) {
            //   return 'antd-vendor'
            // }

            // // 编辑器
            // if (
            //   [
            //     '@monaco-editor/react',
            //     '@babel/standalone',
            //     '@typescript/ata',
            //   ].includes(packageName)
            // ) {
            //   return 'editor-vendor'
            // }

            // 工具
            if (
              [
                'lodash-es',
                'markdown-it',
                'file-saver',
                'copy-to-clipboard',
                'spark-md5',
                'jszip',
                'uuid',
              ].includes(packageName)
            ) {
              return 'misc-vendor'
            }
          }
        },
      },
    },
  },
})
