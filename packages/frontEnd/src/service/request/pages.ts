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

export const deletePage = (page_id: string): any => {
  return req.request({
    url: `/pages/delete/${page_id}`,
    method: 'delete',
  })
}

export const getPageDetail = (project_id: string, page_id: string): any => {
  return req.request({
    url: `/pages/detail/${project_id}/${page_id}`,
    method: 'get',
  })
}

/**
 * 复制页面
 */

export const copyPage = (page_id: string): any => {
  return req.request({
    url: `/pages/copy/${page_id}`,
    method: 'get',
  })
}
