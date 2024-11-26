import { whaleRequset as req } from '..'

export const getProjectList = (page: number): any => {
  return req.request({
    url: '/project/list',
    method: 'get',
    params: {
      page,
    },
  })
}

export const createProject = (data: any): any => {
  return req.request({
    url: '/project/create',
    method: 'post',
    data,
  })
}

// 删除项目
export const deleteProject = (id: string): any => {
  return req.request({
    url: `/project/delete/${id}`,
    method: 'delete',
  })
}

// 更新项目
export const updateProject = (id: string, data: any): any => {
  return req.request({
    url: `/project/update/${id}`,
    method: 'put',
    data,
  })
}

// 查询
export const searchProject = (keyword: string, page: number): any => {
  return req.request({
    url: '/project/search',
    method: 'get',
    params: {
      keyword,
      page,
    },
  })
}

export const getProjectDetail = (id: string): any => {
  return req.request({
    url: `/project/detail/${id}`,
    method: 'get',
  })
}
