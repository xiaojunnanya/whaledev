import { memo, useState } from 'react'
import Content from './Content'
import { FloatButton } from 'antd'
import { OpenAIOutlined, WechatOutlined } from '@ant-design/icons'
import { SELFWEBURL } from './assets/defaultData'
import Ai from './components/Ai'

const App = memo(() => {
  const [openAiModal, setOpenAiModal] = useState(false)

  return (
    <>
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
    </>
  )
})

export default App
