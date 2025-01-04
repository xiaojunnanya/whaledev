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
      { text: '平台', link: '/docs/whale' },
      { text: '项目规划', link: '/docs/whale-plan' },
    ],

    sidebar: [
      {
        text: 'WhaleDev',
        items: [
          { text: '介绍', link: '/docs/whale' },
          { text: 'React Playground 使用指南', link: '/docs/reactplay' },
          { text: '鸣谢', link: '/docs/acknowledgement' },
        ],
      },
      {
        text: '平台开发',
        items: [
          { text: '开发纪录', link: '/docs/develop-record' },
          { text: '组件配置项', link: '/docs/components-config' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaojunnanya/whaledev' },
    ],
  },
})
