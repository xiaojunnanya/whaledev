import { MessageType } from '@/type'
import { BaseResponse } from './baseResponse'
import { ErrorCode } from './errorCode'

export class ReturnResult {
  /**
   * 成功 - 使用 data 和 message
   *
   * @param data
   * @param message
   * @return
   */
  public static success<T>(
    message: string = '请求成功',
    data: T | null = null,
  ): BaseResponse<T> {
    return {
      code: 0,
      message,
      data,
      msgType: 'success',
    }
  }

  /**
   * 失败 - 使用 data 和 message
   *
   * @param data
   * @param message
   * @return
   */
  public static error<T>(
    message: string = '请求失败',
    data: T | null = null,
  ): BaseResponse<T> {
    return {
      code: 0,
      message,
      data,
      msgType: 'error',
    }
  }

  /**
   * 提示 - 使用 data 和 message
   *
   * @param data
   * @param message
   * @return
   */
  public static info<T>(
    message: string = '提示信息',
    data: T | null = null,
  ): BaseResponse<T> {
    return {
      code: 0,
      message,
      data,
      msgType: 'info',
    }
  }

  /**
   * 成功 - 使用 data 、 message 和 msgType
   *
   * @param data
   * @param message
   * @return
   */
  public static useMsgWithType<T>(
    message: string = '请求成功',
    msgType: MessageType = 'success',
    data: T | null = null,
  ): BaseResponse<T> {
    return {
      code: 0,
      message,
      data,
      msgType,
    }
  }

  /**
   * 失败 - 使用 ErrorCode
   *
   * @param errorCode
   * @return
   */
  public static errByErrCode(errorCode: ErrorCode): BaseResponse<null> {
    return new BaseResponse<null>(
      errorCode.code,
      errorCode.message,
      null,
      'error',
    )
  }

  /**
   * 失败 - 使用 ErrorCode 和 message
   *
   * @param errorCode
   * @param message
   * @return
   */
  public static errByErrCodeAndMsg(
    errorCode: ErrorCode,
    message: string,
  ): BaseResponse<null> {
    return new BaseResponse<null>(errorCode.code, message, null, 'error')
  }
}
