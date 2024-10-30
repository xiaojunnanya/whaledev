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
        const {
          code = 500,
          message = '请求错误，请稍后重试',
          data = null,
        } = response
        const customCode: { [key: number]: string } = {
          200: 'OK',
          201: 'Created',
          400: 'Bad Request',
          401: 'Unauthorized',
          403: 'Forbidden',
          404: 'Not Found',
          500: 'Internal Server Error',
        }
        const mes = message || customCode[code] || 'Unknown Error'

        return {
          code,
          timestamp: formatDate(),
          message: mes,
          type: 'custom',
          data,
        }
      }),
    )
  }
}
