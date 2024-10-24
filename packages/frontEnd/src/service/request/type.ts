import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

// 在这里配置拦截器的类型，这样我们就可以动态的设置哪个请求有对应的拦截器
export interface WhaleRequestConfig extends AxiosRequestConfig{
    // 可选
    interceptors?: {
        requestSuccessFn?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig,
        // requestSuccessFn?: (config: AxiosRequestConfig) => AxiosRequestConfig,
        requestFailureFn?: (error: any) => any,
        responseSuccessFn?: (res: AxiosResponse) => AxiosResponse,
        responseFailureFn?: (error :any) => any,
    }
}