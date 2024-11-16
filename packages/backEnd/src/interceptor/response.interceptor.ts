import { responseType, returnType } from '@/type'
import { formatDate } from '@/utils'
import { Response } from 'express'
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

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
        const {
          code = 98,
          message = 'Internal Server Error',
          messageType,
          data = null,
        } = response as returnType

        if (data && data.token) {
          res.setHeader('authorization', data.token)
          delete data.token
        }

        const returnMsg: responseType = {
          code,
          timestamp: formatDate(),
          data: {
            message,
            messageType,
            ...data,
          },
          type: 'custom',
        }

        res.send(returnMsg)
      }),
    )
  }
}

export const customResponse = (
  code: returnType['code'],
  message: returnType['message'],
  messageType: returnType['messageType'],
  data: returnType['data'] = null,
): returnType => ({
  code,
  message,
  data,
  messageType,
})
