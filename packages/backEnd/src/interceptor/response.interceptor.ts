import { responseType } from '@/type'
import { formatDate } from '@/utils'
import { Response } from 'express'
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { RAW_RESPONSE_KEY } from '@/decorator/router.decorator'
import { Reflector } from '@nestjs/core'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isRaw = this.reflector.get<boolean>(
      RAW_RESPONSE_KEY,
      context.getHandler(),
    )

    // 如果打了 @RawResponse()，不做任何包装，直接放行
    if (isRaw) return next.handle()

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

          // 兼容monitor
          if (!data?.is_not_delete_token) {
            delete data.token
          }
        }

        const returnMsg: responseType = {
          code,
          timestamp: formatDate(),
          data,
          message,
          msgType,
          type: 'custom',
        }

        res.send(returnMsg)
      }),
      catchError(err => {
        throw err
      }),
    )
  }
}
