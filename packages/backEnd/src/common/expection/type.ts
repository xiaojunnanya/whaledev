interface responseType<T> {
  code: number
  data?: T
  type: 'system' | 'custom'
  timestamp: any
}

export interface errorResponseType<T> extends responseType<T> {
  error: string
}

export interface customResponseType<T> extends responseType<T> {
  message: string
}

export type codeType = {
  [key: number]: string
}
