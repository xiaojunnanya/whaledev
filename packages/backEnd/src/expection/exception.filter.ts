import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { formatDate } from '@/utils'
import { customCode, responseType } from '@/type'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    const code = exception.getStatus()
    console.log('exception', exception)
    // 对class-validator的异常做兼容
    const { message: validatorErr } = exception.getResponse() as {
      message: string[]
    }

    const message = validatorErr?.join
      ? validatorErr.join(',')
      : exception.message || customCode[98]

    const errorResponse: responseType = {
      code: 98,
      timestamp: formatDate(),
      data: {
        data: null,
        message,
      },
      type: 'system',
    }

    res.status(code).json(errorResponse)
  }
}
