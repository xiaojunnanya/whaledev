import { whaleRequset as req } from '..'

export const getProjectType = () => {
  return req.get('/staticonfig/project_type')
}

// 展示图片
export const getShowImg = (url: any) => {
  return `/img${url}`
}
