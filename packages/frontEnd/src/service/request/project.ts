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

// 删除项目
export const deleteProject = (id: number): any => {
  return req.request({
    url: `/project/delete/${id}`,
    method: 'delete',
  })
}
