import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
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
    let message = ''

    const response: {
      message: any
      type: string
    } = exception.getResponse() as any

    console.error(response, 'exception')

    // 遗留的问题:判断异常是否是 class-validator 抛出的
    if (exception.name === 'BadRequestException') {
      // 处理 class-validator 异常
      const validatorErr = response?.message
      message = validatorErr?.join
        ? validatorErr.join(',')
        : exception.message || '未知错误，请稍后重试'
    } else if (
      exception.name === 'HttpException' &&
      response?.type === 'PrismaError'
    ) {
      // 处理处理数据库异常
      message = response?.message || '数据库异常，请稍后重试'
    } else {
      message = exception.message || '未知错误，请稍后重试'
    }

    const code =
      exception instanceof HttpException ? exception.getStatus() : 500

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
