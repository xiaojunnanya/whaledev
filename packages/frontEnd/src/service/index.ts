import { BASE_URL, TIMEOUT } from './config'
import WhaleRequest from './modules'

const whaleRequset = new WhaleRequest({
  baseURL: BASE_URL,
  withCredentials: true, // 跨域请求时是否需要使用凭证
  timeout: TIMEOUT,
})

export { whaleRequset }
