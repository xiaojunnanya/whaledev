export const customCode = {
  0: '执行成功',
  1: '参数错误',
  2: '参数校验错误',
  99: '未知错误',
  98: '系统错误',
  97: '提示错误',
}

// 提取 customCode 对象的 key 值类型
export type CustomCodeKeys = keyof typeof customCode

export interface responseType {
  code: CustomCodeKeys
  timestamp: string
  message: string // 确保 message 字段是必需的
  messageType: 'success' | 'error' | 'warning' | 'info'
  data?: any
  type: 'custom' | 'system'
}

export type returnType = Pick<
  responseType,
  'code' | 'message' | 'messageType' | 'data'
>
