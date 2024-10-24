import { BASE_URL, TIMEOUT } from "./config";
import WhaleRequest from "./request";

const whaleReq = new WhaleRequest({
    baseURL:BASE_URL,
    timeout:TIMEOUT
})

// const jlReq1 = new WhaleRequest({
//     baseURL:BASE_URL,
//     timeout:TIMEOUT,
//     // 当我们这个接口需要额外的拦截器的时候，我们就可以配置
//     interceptors:{
//         requestSuccessFn(config){
//             console.log('jlReq1的请求拦截');
            
//             return config
//         },
//         requestFailureFn(error){
//             return error
//         },
//         responseSuccessFn(res) {
//             return res
//         },
//         responseFailureFn(error) {
//             return error
//         },
//     }
// })

export { whaleReq }