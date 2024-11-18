import { whaleRequset as req } from '..'

export const getUserInfoData = (): any => {
  return req.get('/user/info')
}
