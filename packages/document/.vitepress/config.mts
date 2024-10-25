import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "鲸灵开发",
  description: "鲸灵开发开发文档",
  lang: 'zh-CN',
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/images/favicon.ico',
    nav: [
      { text: '首页', link: '/' },
      { text: '例子', link: '/docs/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples1',
        items: [
          { text: 'Markdown Examples', link: '/docs/markdown-examples' },
          { text: 'Runtime API Examples', link: '/docs/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xiaojunnanya/whaledev' }
    ]
  }
})
