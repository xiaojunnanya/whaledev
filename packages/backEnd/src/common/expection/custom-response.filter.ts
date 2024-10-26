import { codeType, customResponseType } from './type'

export class customResponse<T> {
  private readonly customCode: codeType = {
    200: 'OK',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
  }

  public baseResponse(code: number, data: T) {
    const customResponse: customResponseType<T> = {
      code,
      timestamp: new Date().toString(),
      message: this.customCode[code],
      type: 'custom',
      data,
    }

    return customResponse
  }
}
