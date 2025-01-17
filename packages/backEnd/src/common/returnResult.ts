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
    data: T,
    message: string = '请求成功',
  ): BaseResponse<T> {
    return {
      code: 0,
      message,
      data,
      msgType: 'success',
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
