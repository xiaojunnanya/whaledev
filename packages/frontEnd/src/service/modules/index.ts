import { message } from 'antd'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

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
        if (config.url) config.url = `${config.url}?_=${new Date().getTime()}`

        const token = localStorage.getItem('token')
        if (token) config.headers['authorization'] = 'Bearer ' + token
        config.headers['Accept-Language'] = navigator.language
        return config
      },
      error => {
        Promise.reject(error)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      res => {
        const { data, headers } = res
        const token = headers['authorization']
        if (token) localStorage.setItem('token', token)

        return data
      },
      error => {
        // 遗留的问题：对status进行处理(http状态码)
        const { status } = error
        console.log(status, 'errstatus')

        let messageText = ''

        switch (status) {
          case 401:
            messageText = '登录过期，请重新登录'
            break
          case 500:
            messageText = '服务器内部错误'
            break
        }

        if (messageText) {
          // 跳转到登录页面
          window.location.href = '/login'
          localStorage.removeItem('token')
          message.destroy()
          message.error(messageText)
          return
        }

        Promise.reject(error)
      },
    )
  }

  // 创建网络请求的方法
  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<T>(config)
  }

  get<T = any>(configOrUrl: string | AxiosRequestConfig) {
    if (typeof configOrUrl === 'string') {
      return this.request<T>({ url: configOrUrl, method: 'GET' })
    } else {
      return this.request<T>({ ...configOrUrl, method: 'GET' })
    }
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'delete' })
  }
}

export default WhaleRequest
