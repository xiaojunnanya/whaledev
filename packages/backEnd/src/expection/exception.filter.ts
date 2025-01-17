import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { formatDate } from '@/utils'
import { responseType } from '@/type'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()

    Logger.error(exception, 'exception')

    // 处理 class-validator 的异常兼容
    const validatorErr =
      exception instanceof HttpException &&
      typeof exception.getResponse === 'function'
        ? (exception.getResponse() as { message: string[] }).message
        : null

    const message = validatorErr?.join
      ? validatorErr.join(',')
      : exception.message || '未知错误，请稍后重试'

    const code =
      exception instanceof HttpException ? exception.getStatus() : 500 // 非 HttpException，默认为 500

    const errorResponse: responseType = {
      code: code,
      timestamp: formatDate(),
      data: {
        data: null,
        message,
        msgType: 'error',
      },
      type: 'system',
    }

    res.status(code).json(errorResponse)
  }
}
