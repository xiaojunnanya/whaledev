import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello() {
    return {
      code: 200,
      message: 'Welcome to whaledev back-end!',
      data: null,
    }
  }
}
