import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface otherResp extends AxiosResponse {
  message: string
}

// http状态码
export const httpStatusCode = [200, 201, 400, 401, 403, 404, 500, 502]

// 遗留的问题：aixos重新封装
class WhaleRequest {
  instance: AxiosInstance

  // 创建axios实例
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)

    // 请求拦截器
    this.instance.interceptors.request.use(
      config => {
        if (config.url)
          config.url = `${config.url}?time=${new Date().getTime()}`

        const token = localStorage.getItem('token')
        if (token) config.headers['Authorization'] = token
        return config
      },
      error => {
        Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      res => {
        const { data, status } = res
        // 遗留的问题：对status进行处理(http状态码)

        // 这边我是在不知道在去声明axios返回值的类型，只好将数据进行一层封装放到data中
        // console.log('data', data)

        const newData = {
          data: data.data,
          status: data.code,
          timestamp: data.timestamp,
        } as any

        return newData
      },
      error => {
        Promise.reject(error)
      },
    )
  }

  // 创建网络请求的方法
  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config)
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'delete' })
  }
}

export default WhaleRequest
