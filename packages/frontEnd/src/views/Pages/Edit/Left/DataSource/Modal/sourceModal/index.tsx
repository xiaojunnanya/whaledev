import { memo, useState } from 'react'

import { SourceModalStyled } from './style'
import { Button, Form, Input, Radio, Steps } from 'antd'

const steps = [
  {
    title: '接口设置',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
]

export default memo(() => {
  const [current, setCurrent] = useState(0)

  const next = () => {
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const items = steps.map(item => ({ key: item.title, title: item.title }))

  return (
    <SourceModalStyled>
      <Steps current={current} items={items} />
      <div className="content">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 19 }}>
          {current === 0 && (
            <>
              <Form.Item label="接口名称" name="name" required>
                <Input
                  placeholder="请输入接口中文名称"
                  maxLength={20}
                  showCount
                />
              </Form.Item>
              <Form.Item label="请求方式" name="method">
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="GET">GET</Radio.Button>
                  <Radio.Button value="POST">POST</Radio.Button>
                  <Radio.Button value="PUT">PUT</Radio.Button>
                  <Radio.Button value="PATCH">PATCH</Radio.Button>
                  <Radio.Button value="DELETE">DELETE</Radio.Button>
                </Radio.Group>
              </Form.Item>
            </>
          )}
          {current === 1 && <>Last-content</>}
          {current === 2 && <>First-content</>}
        </Form>
      </div>
      <div className="operateBtn">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && <Button type="primary">完成</Button>}
      </div>
    </SourceModalStyled>
  )
})
