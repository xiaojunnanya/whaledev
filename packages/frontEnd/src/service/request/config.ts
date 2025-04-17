import { whaleRequset as req } from '..'

// 项目类型
export const getProjectType = () => {
  return req.get('/staticonfig/project_type')
}

// 项目状态
export const getProjectStatus = () => {
  return req.get('/staticonfig/project_status')
}

// 展示图片
export const getShowImg = (url: any) => {
  return `/whaledev${url}`
}
