import { whaleRequset as req } from '..'

/**
 * 获取项目列表
 * @param page 页码
 * @returns
 */
export const getProjectList = (page: number): any => {
  return req.request({
    url: '/project/list',
    method: 'get',
    params: {
      page,
    },
  })
}

/**
 * 新增项目
 * @param data
 * @returns
 */
export const createProject = (data: any): any => {
  return req.request({
    url: '/project/create',
    method: 'post',
    data,
  })
}

/**
 * 删除项目
 * @param id 项目地
 * @returns
 */
export const deleteProject = (id: string): any => {
  return req.request({
    url: `/project/delete/${id}`,
    method: 'delete',
  })
}

/**
 * 更新项目
 * @param id
 * @param data
 * @returns
 */
export const updateProject = (id: string, data: any): any => {
  return req.request({
    url: `/project/update/${id}`,
    method: 'put',
    data,
  })
}

/**
 * 关键词查询搜索
 * @param keyword
 * @param page
 * @returns
 */
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

/**
 * 根据id获取页面详细信息
 * @param id
 * @returns
 */
export const getProjectDetail = (id: string): any => {
  return req.request({
    url: `/project/detail/${id}`,
    method: 'get',
  })
}

export const getProjectAndPages = () => {
  return req.request({
    url: '/project/pages',
    method: 'get',
  })
}
