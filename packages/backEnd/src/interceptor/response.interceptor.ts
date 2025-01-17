import { responseType } from '@/type'
import { formatDate } from '@/utils'
import { Response } from 'express'
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(response => {
        const res = context.switchToHttp().getResponse<Response>()
        const contentType = res.getHeader('Content-Type')
        // 检查响应类型是否是图像（例如验证码）, 如果是图像响应，直接返回图像数据
        if (
          (Array.isArray(contentType) &&
            contentType.some(type => type.startsWith('image'))) ||
          (typeof contentType === 'string' && contentType.startsWith('image'))
        )
          return response

        // 默认错误处理
        const { code, message, msgType, data = null } = response

        if (data?.token) {
          res.setHeader('authorization', data.token)
          delete data.token
        }

        const returnMsg: responseType = {
          code,
          timestamp: formatDate(),
          data: {
            data,
            message,
            msgType,
          },
          type: 'custom',
        }

        res.send(returnMsg)
      }),
      catchError(err => {
        // 系统级的错误，在这里抛出，异常那边捕获
        return throwError(() => new Error(err)) // 你可以自定义错误信息
      }),
    )
  }
}

export const customResponse = (
  code: any,
  message: any,
  msgType: any,
  data: any = null,
) => ({
  code,
  message,
  data,
  msgType,
})
