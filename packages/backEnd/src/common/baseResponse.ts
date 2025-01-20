import { MessageType } from '@/type'

export class BaseResponse<T> {
  code: number
  message: string
  data: T | null
  msgType: MessageType

  constructor(code: number, message: string, data: T, msgType: MessageType) {
    this.code = code
    this.message = message
    this.data = data
    this.msgType = msgType
  }
}
