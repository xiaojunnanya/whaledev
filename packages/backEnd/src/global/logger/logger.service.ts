import { ConsoleLogger, Injectable } from '@nestjs/common'

// 暂未使用
@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: any, context: string) {
    console.log(`[${context}]`, message)
  }
}
