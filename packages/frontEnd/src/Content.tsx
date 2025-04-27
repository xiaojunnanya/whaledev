import { message } from 'antd'
import { memo, useEffect } from 'react'
import { useGlobal } from './stores/global'
import { useLocation, useRoutes } from 'react-router-dom'
import routes from './router'
import Footer from './components/Footer'
import checkPageRefresh from './utils/pageRefresh'

const App = memo(() => {
  const [messageApi, msgContextHolder] = message.useMessage()
  const { message: globalMessage } = useGlobal()
  const { pathname } = useLocation()

  useEffect(() => {
    // 不加这个在存在弹窗的时候路由跳转重新弹出弹窗
    messageApi.destroy()
  }, [pathname])

  useEffect(() => {
    // 生产环境轮询检测页面是否刷新
    process.env.NODE_ENV === 'production' && checkPageRefresh()

    window.addEventListener('error', catchErr)
    window.addEventListener('unhandledrejection', catchErr)

    return () => {
      window.removeEventListener('error', catchErr)
      window.removeEventListener('unhandledrejection', catchErr)
    }
  }, [])

  useEffect(() => {
    messageApi.destroy()

    const { type, text } = globalMessage

    type ? messageApi[type](text) : messageApi.destroy()
  }, [globalMessage])

  // 捕获错误：系统+网络(在封装的axios中通过promise.reject抛出)
  const catchErr = (e: any) => {
    const target = e.target
    const reason = e.reason

    if (reason && reason?.errorFields) {
      console.error('react form 表单验证错误')
    } else if (!target || (target && !target?.localName)) {
      console.error('JS运行错误', reason)
    } else if (target?.localName) {
      console.error('资源加载错误')
    } else {
      console.error('未知错误')
    }
  }

  return (
    <>
      {msgContextHolder}

      <>{useRoutes(routes)}</>

      {pathname === '/' && (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </>
  )
})

export default App
