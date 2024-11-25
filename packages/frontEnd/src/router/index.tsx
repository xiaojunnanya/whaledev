import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home'))
const Login = lazy(() => import('@/views/Login'))
const Engineering = lazy(() => import('@/views/Engineering'))
const NotFound = lazy(() => import('@/components/NotFound'))
const ReactPlay = lazy(() => import('@/views/ReactPlay'))
const Project = lazy(() => import('@/views/Project'))
const Pages = lazy(() => import('@/views/Pages'))
const PreviewPages = lazy(() => import('@/views/Pages/Preview'))

// 遗留的问题，URL权限问题
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/engineering',
    element: <Engineering />,
    children: [
      {
        path: ':name?', // 可选参数
        element: <Engineering />,
      },
    ],
  },
  {
    path: '/project/:project_id',
    element: <Project />,
    children: [
      // 使用 `index` 路由来处理根路径
      {
        index: true,
        element: <Project />,
        // 如果不指定 `element`，则继承父级的 `element`
        // 但是不指定页面会报警告，还是指定为了消除警告
        // 下面的都是重定向
      },
      {
        path: ':config',
        element: <Project />,
      },
      {
        path: ':config/page',
        element: <Project />,
      },
      {
        path: ':config/page/:page_id',
        element: <Project />,
      },
    ],
  },
  {
    path: '/project/:project_id/page/:page_id/edit',
    element: <Pages />,
  },
  {
    path: '/project/:project_id/page/:page_id/preview',
    element: <PreviewPages />,
  },
  {
    path: '/reactplay',
    element: <ReactPlay />,
  },
  {
    path: '/404',
    element: <NotFound></NotFound>,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]
export default routes
