import { SetMetadata } from '@nestjs/common'

export const ROUTER_WHALEDEV_GLOBAL = 'router_whaledev'
export const ROUTER_WHALEDEV_V1 = 'router_whaledev_v1'
export const ROUTER_WHALEDEV_V2 = 'router_whaledev_v2'

// 路由是否有 /whaledev 前缀
export const NoRouterWhale = () => SetMetadata(ROUTER_WHALEDEV_GLOBAL, true)

// /whaledev/v1 版本
export const RouterWhaleV1 = () => SetMetadata(ROUTER_WHALEDEV_V1, true)

// /whaledev/v2 版本
export const RouterWhaleV2 = () => SetMetadata(ROUTER_WHALEDEV_V2, true)
