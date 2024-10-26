import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { errorResponseType } from './type'

// 捕获异常
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
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

    const errorResponse: errorResponseType<null> = {
      code: status,
      timestamp: new Date().toString(),
      error: errorMessage,
      type: 'system',
    }

    response.status(status).json(errorResponse)
  }
}
