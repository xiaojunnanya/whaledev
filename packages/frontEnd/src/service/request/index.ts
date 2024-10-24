import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { WhaleRequestConfig } from './type'

class WhaleRequest{
    instance: AxiosInstance

    // 创建axios实例
    constructor(config: WhaleRequestConfig){
        this.instance = axios.create(config)

        // 请求拦截器
        this.instance.interceptors.request.use((config)=>{
            // config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/x-www-form-urlencoded'
            const token = localStorage.getItem('token')
            if(token) config.headers['token'] = localStorage.getItem('token')
            return config
        },(error) =>{
            Promise.reject(error)
        })

        // 响应拦截器
        this.instance.interceptors.response.use((res)=>{
            return res
        },(error) =>{
            Promise.reject(error)
        })

        // 针对特定的实例添加拦截器
        this.instance.interceptors.request.use(
            config.interceptors?.requestSuccessFn,
            config.interceptors?.requestFailureFn
        )

        this.instance.interceptors.response.use(
            config.interceptors?.responseSuccessFn,
            config.interceptors?.responseFailureFn
        )
    }

    // 创建网络请求的方法
    request<T=any>(config: WhaleRequestConfig){
        // 可以设置单次请求的成功拦截
        // if(config.interceptors?.requestSuccessFn){
        //     config = config.interceptors.requestSuccessFn(config)
        // }
 
        return this.instance.request<T>(config)
    }

    get<T=any>(config: WhaleRequestConfig){
        return this.request<T>({...config, method:'GET'})
    }

    post<T=any>(config: WhaleRequestConfig){
        return this.request<T>({...config, method:'POST'})
    }

    delete<T=any>(config: WhaleRequestConfig){
        return this.request<T>({...config, method:'delete'})
    }
}

export default WhaleRequest