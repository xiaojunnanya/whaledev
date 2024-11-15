import { RouteObject } from 'react-router-dom'
import { lazy } from 'react'

const Home = lazy(() => import('@/views/Home/index'))
const Login = lazy(() => import('@/views/Login/index.tsx'))
// const ProjectCollection = lazy(() => import('@/views/Project'))
// const CountPages = lazy(() => import('@/views/Pages/index'))
// const EditPages = lazy(() => import('@/views/Pages/Rapid/Edit/index'))
// const NotFound = lazy(() => import('@/components/NotFound/index'))
// const Preview = lazy(() => import('@/views/Pages/Preview/index'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // {
  //     path:'/project',
  //     element: <ProjectCollection />
  // },
  // {
  //     path: '/project/:projectId',
  //     element: <CountPages />,
  //     children: [
  //         // 使用 `index` 路由来处理根路径
  //         {
  //             index: true,
  //             element: <CountPages />,
  //             // 如果不指定 `element`，则继承父级的 `element`
  //             // 但是不指定页面会报警告，还是指定为了消除警告
  //             // 下面的都是重定向
  //         },
  //         {
  //             path: ':config',
  //             element: <CountPages />,
  //         },
  //         {
  //             path: ':config/page',
  //             element: <CountPages />,
  //         },
  //         {
  //             path: ':config/page/:pageId',
  //             element: <CountPages />,
  //         },
  //     ],
  // },
  // {
  //     path:'/project/:projectId/edit/page/:pageId',
  //     element: <EditPages />
  // },
  // {
  //     path:'/project/:projectId/preview/page/:pageId',
  //     element: <Preview />
  // },
  // {
  //     path:'*',
  //     element: <NotFound></NotFound>
  // },
]
export default routes
