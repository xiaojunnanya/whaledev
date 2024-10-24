import { whaleReq } from "..";


/**
 * 新建页面
 */
export const createPage = (args: any) =>{
    return whaleReq.post({
        url: '/pages/create',
        data:{
            ...args
        }
    })
}


// 获取页面
export const getPage = (projectId: string) =>{
    return whaleReq.get({
        url: `/pages/${projectId}`
    })
}


// 更新页面
export const updatePage = (args: any) =>{
    return whaleReq.post({
        url: '/pages/update',
        data:{
            ...args
        }
    })
}

// 删除页面
export const deletePage = (pageId: string) => whaleReq.delete({url:`/pages/${pageId}`})

// 获取页面信息
export const getPageInfoById = (pageId: string) => whaleReq.get({url: `/pages/info/${pageId}`})

// 保存json
export const saveJson = (args: any) => whaleReq.post({
    url: '/pages/savejson',
    data:{
        ...args
    }
})

// 获取页面json
export const getPageJsonById = (projectId: string, pageId: string) => whaleReq.get({url: `/pages/json/${projectId}/${pageId}`})