import { ConfigProvider, message } from 'antd'
import { memo, useEffect } from 'react'
import { useGlobal } from './stores/global'
import zhCN from 'antd/es/locale/zh_CN'
import { useLocation, useRoutes } from 'react-router-dom'
import theme from './assets/theme'
import routes from './router'
import Footer from './components/Footer'
// import wechat from '@/assets/images/png/wechat.png'
// import { CommentOutlined, MessageOutlined } from '@ant-design/icons'

const App = memo(() => {
  const [messageApi, msgContextHolder] = message.useMessage()
  const { message: globalMessage } = useGlobal()
  const { pathname } = useLocation()

  useEffect(() => {
    // 不加这个在存在弹窗的时候路由跳转重新弹出弹窗
    messageApi.destroy()
  }, [pathname])

  useEffect(() => {
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

      <article>
        <ConfigProvider
          locale={zhCN}
          theme={{
            token: {
              colorPrimary: theme.primaryColor[700],
            },
          }}
        >
          {useRoutes(routes)}
        </ConfigProvider>
      </article>

      {/* <>
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{ insetInlineEnd: 25 }}
          icon={<MessageOutlined />}
        >
          <Popover
            content={<img src={wechat} alt="wechat" style={{ width: 200 }} />}
            title="加我微信"
            placement="left"
          >
            <FloatButton icon={<CommentOutlined />} />
          </Popover>
        </FloatButton.Group>
      </> */}

      {pathname === '/' && (
        <footer>
          <Footer></Footer>
        </footer>
      )}
    </>
  )
})

export default App
