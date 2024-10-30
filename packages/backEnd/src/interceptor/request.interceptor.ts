import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable, tap } from 'rxjs'

@Injectable()
export class RequestInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const { method, url } = request
    Logger.log(
      `[${method}] ${url} - Request received - params: ${JSON.stringify(
        request.body,
      )}`,
    )
    return next.handle().pipe(
      tap(() => {
        Logger.log(`[${method}] ${url} - Response send`)
      }),
    )
  }
}
