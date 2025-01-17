/**
 * 自定义错误码
 */
export class ErrorCode {
  public static readonly SUCCESS = new ErrorCode(0, 'ok')
  public static readonly PARAMS_ERROR = new ErrorCode(40000, '请求参数错误')
  public static readonly NOT_LOGIN_ERROR = new ErrorCode(40100, '未登录')
  public static readonly NO_AUTH_ERROR = new ErrorCode(40100, '无权限')
  public static readonly TOO_MANY_REQUEST = new ErrorCode(40200, '请求过于频繁')
  public static readonly FORBIDDEN_ERROR = new ErrorCode(40300, '禁止访问')
  public static readonly NOT_FOUND_ERROR = new ErrorCode(
    40400,
    '请求数据不存在',
  )
  public static readonly PARAM_NOT_VALID = new ErrorCode(40500, '参数错误')
  public static readonly NULL_ERROR = new ErrorCode(40600, '请求数据为空')
  public static readonly SYSTEM_ERROR = new ErrorCode(50000, '系统内部异常')
  public static readonly TOKEN_ERROR = new ErrorCode(50100, 'Token解析失败')
  public static readonly OPERATION_ERROR = new ErrorCode(50001, '操作失败')

  readonly code: number
  readonly message: string

  private constructor(code: number, message: string) {
    this.code = code
    this.message = message
  }
}
