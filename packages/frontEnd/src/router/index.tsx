import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home'))
const Login = lazy(() => import('@/views/Login'))
const Engineering = lazy(() => import('@/views/Engineering'))
const NotFound = lazy(() => import('@/components/NotFound'))
const ReactPlay = lazy(() => import('@/views/ReactPlay'))

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
    path: '/reactplay',
    element: <ReactPlay />,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]
export default routes
