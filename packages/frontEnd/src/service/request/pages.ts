import { whaleRequset as req } from '..'

export const createPage = (data: any): any => {
  return req.request({
    url: '/pages/create',
    method: 'post',
    data,
  })
}

export const getPagesList = (project_id: string): any => {
  return req.request({
    url: '/pages/list',
    method: 'get',
    params: {
      project_id,
    },
  })
}

export const updatePage = (data: any): any => {
  return req.request({
    url: '/pages/update',
    method: 'post',
    data,
  })
}

export const deletePage = (id: string): any => {
  return req.request({
    url: `/pages/delete/${id}`,
    method: 'delete',
  })
}

export const getPageDetail = (id: string): any => {
  return req.request({
    url: `/pages/detail/${id}`,
    method: 'get',
  })
}
