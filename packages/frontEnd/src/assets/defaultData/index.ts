const isDev = process.env.NODE_ENV === 'development'

export const SELFWEBURL = {
  blog: 'http://www.xiaojunnan.cn/',
  'blog/about': 'http://www.xiaojunnan.cn/about/',
  github: 'https://github.com/xiaojunnanya',
  juejin: 'https://juejin.cn/user/3633256370537165',
  whaleDocs: isDev
    ? 'http://localhost:4173/'
    : 'https://whaledoc.xiaojunnan.cn/',
  profile: '/img/avatar/default-avatar.jpg',
  projectGithub: 'https://github.com/xiaojunnanya/whaledev',
}

export const OUTWEBURL = {
  antd: 'https://ant-design.antgroup.com/index-cn',
  antdx: 'https://x.ant.design/index-cn',
  react: 'https://react.dev/',
}

export const INITIALDATA = {
  loginInfo: isDev
    ? {
        email: '2376974436@qq.com',
        password: 'qwer1234',
        code: '1234',
      }
    : undefined,
}
