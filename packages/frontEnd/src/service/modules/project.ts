import { whaleReq } from "..";


/**
 * 新建项目
 */
export const createProject = (args: any) =>{
    return whaleReq.post({
        url: '/project/create',
        data:{
            ...args,
            projectState:'inProgress',
            projectIcon:'/projectIcon/default-avatar.jpg'
        }
    })
}

/**
 * 获取项目
 * @returns 
 */
// export const getProject = (page: number) => whaleReq.get({ url: `/project/get/${page}`});

/**
 * 获取项目
 * @param page 
 * @param projectName 
 * @returns 
 */
export const getProject = (page: number, projectName: string | undefined) =>{
    return whaleReq.post({
        url: '/project/search',
        data:{
            page,
            projectName: projectName || '',
            pageSize: 8
        }
    })
}


/**
 * 删除项目
 * @param id 
 * @returns 
 */
export const deleteProject = (id: number) => whaleReq.delete({ url: `/project/delete/${id}` })


/**
 * 更新项目
 */
export const updateProject = (args: any) =>{
    return whaleReq.post({
        url: '/project/update',
        data:{
            ...args,
            projectIcon:'/projectIcon/default-avatar.jpg'
        }
    })
}

/**
 * 获取项目详细信息
 * @param id 
 * @returns 
 */
export const getProjectDetail = (id: string) => whaleReq.get({ url: `/project/info/${id}` });


/**
 * 项目类型
 * @returns 
 */
export const getProjectType = () => whaleReq.get({ url: '/project/type' });


/**
 * 项目状态
 * @returns 
 */
export const getProjectState = () => whaleReq.get({ url: '/project/state' });

/**
 * 项目状态颜色
 */

export const getProjectStateColor = () => whaleReq.get({ url: '/project/stateColor' });