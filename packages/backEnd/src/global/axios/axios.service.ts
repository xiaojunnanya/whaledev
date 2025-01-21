import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AxiosRequestConfig } from 'axios'
import { firstValueFrom } from 'rxjs'

// 暂未使用
@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 发送 GET 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns 响应数据
   */
  async get<T>(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await firstValueFrom(
        this.httpService.get<T>(url, config),
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * 发送 POST 请求
   * @param url 请求地址
   * @param data 请求体
   * @param config 请求配置
   * @returns 响应数据
   */
  async post<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<T>(url, data, config),
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * 发送 PUT 请求
   * @param url 请求地址
   * @param data 请求体
   * @param config 请求配置
   * @returns 响应数据
   */
  async put<T>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.put<T>(url, data, config),
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * 发送 DELETE 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns 响应数据
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.httpService.delete<T>(url, config),
      )
      return response.data
    } catch (error) {
      this.handleError(error)
    }
  }

  /**
   * 统一处理错误
   * @param error 错误对象
   */
  private handleError(error: any): never {
    if (error.response) {
      // 服务端返回的错误
      throw new HttpException(
        error.response.data || '请求失败',
        error.response.status || HttpStatus.INTERNAL_SERVER_ERROR,
      )
    } else if (error.request) {
      // 请求未得到响应
      throw new HttpException('请求未响应', HttpStatus.GATEWAY_TIMEOUT)
    } else {
      // 其他错误
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
