interface responseType {
  code: number
  data?: any
  type: 'system' | 'custom'
  timestamp: any
}

export interface errorResponseType extends responseType {
  error: string
}

export interface customResponseType extends responseType {
  message: string
}

export type responseObj = Pick<customResponseType, 'data' | 'message' | 'code'>

export type codeType = {
  [key: number]: string
}
