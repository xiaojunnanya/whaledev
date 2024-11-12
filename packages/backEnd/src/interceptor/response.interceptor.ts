import { responseType, returnType } from '@/type'
import { formatDate } from '@/utils'
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
        // 默认错误处理
        const {
          code = 50,
          message = 'Internal Server Error',
          data = null,
        } = response as returnType

        const returnMsg: responseType = {
          code,
          timestamp: formatDate(),
          data: {
            message,
            data,
          },
          type: 'custom',
        }

        return returnMsg
      }),
    )
  }
}

export const createResponse = (
  code: returnType['code'],
  message: returnType['message'],
  data: returnType['data'] = null,
): returnType => ({
  code,
  message,
  data,
})
