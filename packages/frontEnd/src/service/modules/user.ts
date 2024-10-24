import { whaleReq } from "..";


export const getUserInfo = () =>{
    return whaleReq.get({ url: '/user/info' })
}

