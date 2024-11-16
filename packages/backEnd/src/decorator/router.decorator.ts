import { SetMetadata } from '@nestjs/common'

export const WHALE_ROUTER_GLOBAL = 'router_whaledev'
export const WHALE_ROUTER_V1 = 'router_whaledev_v1'
export const WHALE_ROUTER_V2 = 'router_whaledev_v2'

export const WHAKE_Skip_AUTH = 'is_auth'

// 路由是否有 /whaledev 前缀
export const WhaleRouterGloabl = () => SetMetadata(WHALE_ROUTER_GLOBAL, true)

// /whaledev/v1 版本
export const WhaleRouterV1 = () => SetMetadata(WHALE_ROUTER_V1, true)

// /whaledev/v2 版本
export const WhaleRouterV2 = () => SetMetadata(WHALE_ROUTER_V2, true)

// 是否需要auth权限验证
export const WhaleSkipAuth = () => SetMetadata(WHAKE_Skip_AUTH, true)
