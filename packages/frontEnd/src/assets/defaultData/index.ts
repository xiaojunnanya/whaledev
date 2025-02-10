const isDev = process.env.NODE_ENV === 'development'

export const SELFWEBURL = {
  blog: 'http://www.xiaojunnan.cn/',
  github: 'https://github.com/xiaojunnanya',
  juejin: 'https://juejin.cn/user/3633256370537165',
  whaleDocs: isDev
    ? 'http://localhost:4173/'
    : 'https://whaledoc.xiaojunnan.cn/',
  profile: '/img/avatar/default-avatar.jpg',
}

export const OUTWEBURL = {
  antd: 'https://ant-design.antgroup.com/index-cn',
}
