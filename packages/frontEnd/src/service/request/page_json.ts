import { whaleRequset as req } from '..'

export const savePageJson = (data: any): any => {
  return req.request({
    url: '/page_json/save',
    method: 'post',
    data,
  })
}

export const getPageJsonByPageId = (page_id: string): any => {
  return req.request({
    url: '/page_json/get',
    method: 'get',
    params: {
      page_id,
    },
  })
}
