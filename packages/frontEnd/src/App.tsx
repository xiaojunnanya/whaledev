import { memo } from 'react'
import Content from './Content'
import { FloatButton } from 'antd'
import { OpenAIOutlined, WechatOutlined } from '@ant-design/icons'
// import Wechat from './assets/images/png/wechat.png'

const App = memo(() => {
  return (
    <>
      <Content></Content>

      <FloatButton.Group
        shape="square"
        style={{
          bottom: 120,
        }}
      >
        {/* 遗留的问题：Popover加载之后url跳转都会显示，然后第一次加载会出现滚动 */}
        {/* <Popover
          placement="left"
          title="联系方式"
          content={
            <img
              src={Wechat}
              alt="联系方式"
              style={{
                width: 200,
              }}
            />
          }
          defaultOpen={false}
        >
          <FloatButton icon={<WechatOutlined />} />
        </Popover> */}
        <FloatButton icon={<WechatOutlined />} />
        <FloatButton icon={<OpenAIOutlined />} />
      </FloatButton.Group>
    </>
  )
})

export default App
