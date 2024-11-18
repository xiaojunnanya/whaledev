import { whaleRequset as req } from '..'

export const getProjectList = () => {
  return req.get('/project/list')
}

export const createProject = (data: any): any => {
  return req.request({
    url: '/project/create',
    method: 'post',
    data,
  })
}
