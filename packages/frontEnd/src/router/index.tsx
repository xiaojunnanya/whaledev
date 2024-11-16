import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home/index'))
const Login = lazy(() => import('@/views/Login/index.tsx'))
const Engineering = lazy(() => import('@/views/Engineering'))
const NotFound = lazy(() => import('@/components/NotFound/index'))

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
    path: '/engineering/:name',
    element: <Engineering />,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]
export default routes
