import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Login = lazy(() => import('@/views/Login'))
const NotFound = lazy(() => import('@/components/NotFound'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound></NotFound>,
  },
]
export default routes
