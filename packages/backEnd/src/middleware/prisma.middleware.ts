import { Prisma } from '@prisma/client'
import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorException } from '@/config'

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
              { message: '未找到当前数据', type: 'PrismaError' },
              HttpStatus.OK,
            )
          case 'P2002': // 唯一约束冲突
            throw new HttpException(
              { message: '唯一约束冲突，请检查数据', type: 'PrismaError' },
              HttpStatus.OK,
            )
          case 'P2003': // 外键约束错误
            throw new HttpException(
              { message: '外键约束错误', type: 'PrismaError' },
              HttpStatus.OK,
            )
          case 'P2023': // 无效的关系
            throw new HttpException(
              { message: '无效的关系，数据不匹配', type: 'PrismaError' },
              HttpStatus.OK,
            )
          default:
            throw new HttpException(
              { message: ErrorException.PrismaError, type: 'PrismaError' },
              HttpStatus.OK,
            )
        }
      } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        // 未知 Prisma 错误
        throw new HttpException(
          { message: ErrorException.PrismaError, type: 'PrismaError' },
          HttpStatus.OK,
        )
      } else {
        // 捕获其他错误并抛出
        throw new HttpException(
          {
            message: error.message || ErrorException.PrismaError,
            type: 'PrismaError',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        )
      }
    }
  }
}
