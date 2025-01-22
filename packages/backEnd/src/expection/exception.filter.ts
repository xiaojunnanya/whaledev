import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { formatDate } from '@/utils'
import { responseType } from '@/type'
import { ErrorException } from '@/config'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception, 'exception')
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    let response: any = {}
    let code = 500

    let message = ''

    if (exception instanceof HttpException) {
      response = exception.getResponse() as any
      code = exception.getStatus()
    } else if ((exception as any) instanceof Error) {
      // 处理普通 Error 对象
      message = (exception as any).message
      response = { message, type: 'SystemError' }
    } else {
      // 处理未知类型的异常
      message = 'Internal Server Error'
      response = { message, type: 'UnknownError' }
    }

    if (
      exception?.name === 'BadRequestException' &&
      response?.type === 'ValidatorError'
    ) {
      // 处理 class-validator 异常
      message = response?.message || ErrorException.ValidatorError
    } else if (
      exception?.name === 'HttpException' &&
      response?.type === 'PrismaError'
    ) {
      // 处理处理数据库异常
      message = response?.message || ErrorException.PrismaError
    } else {
      message = exception.message || ErrorException.ServerError
    }

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
