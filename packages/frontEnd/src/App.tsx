import { ConfigProvider, message } from 'antd'
import { memo, useEffect } from 'react'
import { useGlobal } from './stores/global'
import zhCN from 'antd/es/locale/zh_CN'
import { useLocation, useRoutes } from 'react-router-dom'
import theme from './assets/theme'
import routes from './router'
import Footer from './components/Footer'
import Header from './components/Header'

const App = memo(() => {
  const [messageApi, msgContextHolder] = message.useMessage()
  const { message: globalMessage } = useGlobal()
  const { pathname } = useLocation()

  useEffect(() => {
    // 不加这个在存在弹窗的时候路由跳转重新弹出弹窗
    messageApi.destroy()
  }, [pathname])

  useEffect(() => {
    console.log('请求头设置Accept-Language', navigator.language)

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
    if (!target || (target && !target?.localName)) {
      console.log('JS运行错误')
    }

    if (target?.localName) {
      console.log('资源加载错误')
    }
  }

  return (
    <>
      {msgContextHolder}

      <header style={{ height: '48px' }}>
        <Header></Header>
      </header>

      <ConfigProvider
        locale={zhCN}
        theme={{
          token: {
            colorPrimary: theme.color.primaryColor,
          },
        }}
      >
        {useRoutes(routes)}
      </ConfigProvider>

      {pathname === '/' && (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </>
  )
})

export default App
