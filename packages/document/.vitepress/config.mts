import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '鲸灵开发',
  description: '鲸灵开发开发文档',
  lang: 'zh-CN',
  head: [['link', { rel: 'icon', href: '/images/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/docs/platform/index' },
      { text: '思考', link: '/docs/think/index' },
      { text: '团队', link: '/docs/team/index' },
    ],
    sidebar: {
      'docs/platform/': [
        {
          text: '精灵开发平台',
          collapsed: false,
          items: [
            { text: '介绍', link: '/docs/platform/index' },
            {
              text: 'React Playground 使用指南',
              link: '/docs/platform/reactplay',
            },
            { text: '鸣谢', link: '/docs/platform/acknowledgement' },
          ],
        },
        {
          text: '低代码组件开发',
          collapsed: false,
          items: [
            { text: '组件配置项', link: '/docs/platform/components-config' },
          ],
        },
        {
          text: '平台规划',
          collapsed: false,
          items: [
            { text: '项目规划', link: '/docs/platform/platform-plan' },
            { text: '组件规划', link: '/docs/platform/components-plan' },
          ],
        },
      ],
      '/docs/think/': [
        {
          text: '架构思考',
          collapsed: false,
          items: [],
        },
        {
          text: '重难点',
          collapsed: false,
          items: [],
        },
        {
          text: '平台开发',
          collapsed: false,
          items: [{ text: '开发纪录', link: '/docs/think/develop-record' }],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaojunnanya/whaledev' },
    ],
  },
  outDir: '../../build/docs',
})
