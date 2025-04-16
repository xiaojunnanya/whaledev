import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello() {
    return {
      code: 0,
      type: 'success',
      message: '你好世界',
      data: null,
    }
  }
}
