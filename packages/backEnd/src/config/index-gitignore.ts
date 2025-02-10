// 配置发送邮箱验证码
export const EMAIL_USER = 'xxx' // 邮箱
export const EMAIL_PASS = 'xxx' // 邮箱密钥

// 用户信息
export const AUTHOR = {
  NAME: 'xxx', // 用户名
  PROJECTNAME: 'xxx', // 项目名称
  secret: 'xxx', // token密钥
  expiresIn: 'xxx', // token时间
}

export const ErrorException = {
  ServerError: '服务器异常，请稍后重试',
  ValidatorError: '参数校验失败',
  PrismaError: '服务器异常，请稍后重试',
  UserTokenErr: '用户身份信息错误，请重新登陆',
}

export const REDISCONNEST = {
  host: 'localhost',
  port: 6379,
  password: 'xxx',
}
