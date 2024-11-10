export const customCode = {
  0: 'OK',
  1: 'Created',
  40: 'Bad Request',
  41: 'Unauthorized',
  43: 'Forbidden',
  44: 'Not Found',
  50: 'Internal Server Error',
  99: 'Unknown Error',
  98: 'System Error',
}

// 提取 customCode 对象的 key 值类型
export type CustomCodeKeys = keyof typeof customCode

export interface responseType {
  code: CustomCodeKeys
  timestamp: string
  data: {
    data: any
    message: string
  }
  type: 'custom' | 'system'
}

export type returnType = Pick<responseType, 'code'> & responseType['data']
