import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import { errorResponseType } from '@/type'
import { formatDate } from '@/utils'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR // 500

    let errorMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error'

    errorMessage =
      typeof errorMessage === 'string'
        ? errorMessage
        : (errorMessage as { error: string }).error

    const errorResponse: errorResponseType = {
      code: status,
      timestamp: formatDate(),
      error: errorMessage,
      type: 'system',
    }

    response.status(status).json(errorResponse)
  }
}
