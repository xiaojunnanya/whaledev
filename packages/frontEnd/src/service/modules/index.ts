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

        const { data: result, code } = data
        const { message: msg } = result

        // 这边需要对自定义状态码进行处理

        if (code !== 0) {
          message.error(msg)
          return Promise.reject(new Error(msg))
        }

        return {
          ...result,
        }
      },
      error => {
        // 对http状态码进行处理
        const { status } = error
        let messageText = ''

        switch (status) {
          case 401:
            messageText = '登录过期，请重新登录'
            break
          // case 404:
          //   messageText = '404'
          //   break
          case 500:
            messageText = '服务器内部错误，请稍后重试'
            break
        }

        if (messageText) {
          // message.destroy()
          // message.error(messageText)
          // setTimeout(() => {
          //   if (window.location.pathname !== '/login') {
          //     window.location.href = '/login'
          //   }
          // }, 1000)
          // return
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
