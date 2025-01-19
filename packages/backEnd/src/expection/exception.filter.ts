import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common'
import { Response } from 'express'
import { formatDate } from '@/utils'
import { responseType } from '@/type'
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from '@prisma/client/runtime/library'
import { ReturnResult } from '@/common/returnResult'
import { ErrorCode } from '@/common/errorCode'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    // Logger.error(exception, 'EXCEPTION')

    // 遗留的问题：处理数据库异常
    console.log(exception)

    // 遗留的问题： class-validator 的异常兼容
    console.log(exception instanceof HttpException, '1')
    const validatorErr =
      exception instanceof HttpException &&
      typeof exception.getResponse === 'function'
        ? (exception.getResponse() as { message: string[] }).message
        : null

    const message = validatorErr?.join
      ? validatorErr.join(',')
      : exception.message || '未知错误，请稍后重试'

    const code =
      exception instanceof HttpException ? exception.getStatus() : 500 // 非 HttpException，默认为 500

    const errorResponse: responseType = {
      code: code,
      timestamp: formatDate(),
      data: {
        data: null,
        message,
        msgType: 'error',
      },
      type: 'system',
    }

    res.status(code).json(errorResponse)
  }
}

function prismaFilter(error: any) {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025': // 表示尝试更新或删除的记录未找到
        return ReturnResult.errByErrCode(ErrorCode.NO_AUTH_ERROR)
      case 'P2002': // 表示唯一约束冲突（例如插入重复数据）
      case 'P2003': // 表示外键约束错误
      case 'P2023': // 表示无效的关系，可能是外键字段值不匹配等
      default:
        return ReturnResult.errByErrCode(ErrorCode.SYSTEM_ERROR)
    }
  }

  if (error instanceof PrismaClientUnknownRequestError) {
    return ReturnResult.errByErrCodeAndMsg(
      ErrorCode.SYSTEM_ERROR,
      '数据库异常， 请稍后重试',
    )
  }

  return 'isNotPrismaError'
}
