import { OpenAIOutlined } from '@ant-design/icons'
import { Sender, Welcome } from '@ant-design/x'
import { memo, useState } from 'react'

export default memo(() => {
  const [value, setValue] = useState<string>('灵析你好')
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className="ai_container">
      <div className="ai_container_content">
        <Welcome
          style={{
            backgroundImage: 'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
            borderStartStartRadius: 4,
          }}
          icon={<OpenAIOutlined style={{ fontSize: 40 }} />}
          title="你好，我是精灵开发平台智能助手灵析AI，有什么可以帮助你的。"
          description="灵析AI是一个基于大模型的智能助手，可以帮助您快速了解灵开发的功能和使用方法。"
        />
      </div>
      <div className="ai_container_sender">
        <Sender
          loading={loading}
          value={value}
          onChange={v => {
            setValue(v)
          }}
          onSubmit={() => {
            setValue('')
            setLoading(true)
          }}
          onCancel={() => {
            setLoading(false)
          }}
          autoSize={{ minRows: 1, maxRows: 8 }}
        />
      </div>
    </div>
  )
})
