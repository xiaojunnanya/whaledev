import { memo, useState } from 'react'
import Content from './Content'
import { ConfigProvider, FloatButton } from 'antd'
import { OpenAIOutlined, WechatOutlined } from '@ant-design/icons'
import { SELFWEBURL } from './assets/defaultData'
import zhCN from 'antd/es/locale/zh_CN'
import Ai from './components/Ai'
import theme from './assets/theme'
import { XProvider } from '@ant-design/x'

const configTheme = {
  token: {
    colorPrimary: theme.primaryColor[700],
  },
}

const App = memo(() => {
  const [openAiModal, setOpenAiModal] = useState(false)

  return (
    <ConfigProvider locale={zhCN} theme={configTheme}>
      <XProvider locale={zhCN} theme={configTheme}>
        <Content></Content>

        <FloatButton.Group
          shape="square"
          style={{
            bottom: 120,
          }}
        >
          <FloatButton
            href={SELFWEBURL['blog/about']}
            target="_blank"
            icon={<WechatOutlined />}
          />
          <FloatButton
            icon={<OpenAIOutlined />}
            onClick={() => setOpenAiModal(!openAiModal)}
          />
        </FloatButton.Group>

        {openAiModal && <Ai setOpenAiModal={setOpenAiModal} />}
      </XProvider>
    </ConfigProvider>
  )
})

export default App
