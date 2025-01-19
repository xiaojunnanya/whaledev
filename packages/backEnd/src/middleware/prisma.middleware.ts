import { Prisma } from '@prisma/client'
import { HttpException, HttpStatus } from '@nestjs/common'

export function prismaErrorMiddleware() {
  return async (
    params: Prisma.MiddlewareParams,
    next: (params: Prisma.MiddlewareParams) => Promise<any>,
  ) => {
    try {
      return await next(params)
    } catch (error) {
      // 检查 Prisma 错误并转化为 HttpException
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2025': // 表示尝试更新或删除的记录未找到
            throw new HttpException(
              { message: '记录未找到' },
              HttpStatus.NOT_FOUND,
            )
          case 'P2002': // 唯一约束冲突
            throw new HttpException(
              { message: '唯一约束冲突，请检查数据' },
              HttpStatus.BAD_REQUEST,
            )
          case 'P2003': // 外键约束错误
            throw new HttpException(
              { message: '外键约束错误' },
              HttpStatus.BAD_REQUEST,
            )
          case 'P2023': // 无效的关系
            throw new HttpException(
              { message: '无效的关系，数据不匹配' },
              HttpStatus.BAD_REQUEST,
            )
          default:
            throw new HttpException(
              { message: '数据库错误，请稍后重试' },
              HttpStatus.INTERNAL_SERVER_ERROR,
            )
        }
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // 未知 Prisma 错误
        throw new HttpException(
          { message: '数据库异常，请稍后重试' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      } else {
        // 捕获其他错误并抛出
        throw new HttpException(
          { message: error.message || '未知错误' },
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  }
}
