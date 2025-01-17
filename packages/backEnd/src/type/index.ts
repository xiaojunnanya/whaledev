export type MessageType = 'success' | 'error' | 'warning' | 'info'

export interface responseType {
  code: any
  timestamp: string
  data: null | {
    data: any
    message: string // 确保 message 字段是必需的
    msgType: MessageType
  }
  type: 'custom' | 'system'
}
