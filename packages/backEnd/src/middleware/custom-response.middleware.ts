import { responseObj } from '@/type'
import { formatDate } from '@/utils'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

// 扩展 Express 的 Response 接口以添加 customResponse 方法
declare global {
  namespace Express {
    interface Response {
      customResponse: (response: responseObj) => void
    }
  }
}

@Injectable()
export class CustomResponseMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.customResponse = (response: responseObj) => {
      const { code, message, data } = response
      const customCode: { [key: number]: string } = {
        200: 'OK',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
      }

      // 获取对应的消息，如果状态码未定义，使用默认消息
      const mes = message || customCode[code] || 'Unknown Error'

      res.status(code).json({
        code,
        timestamp: formatDate(),
        message: mes,
        type: 'custom',
        data,
      })
    }
    next()
  }
}
