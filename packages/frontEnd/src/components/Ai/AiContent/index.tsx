import { CopyOutlined, OpenAIOutlined, UserOutlined } from '@ant-design/icons'
import { Bubble, BubbleProps, Sender, Welcome } from '@ant-design/x'
import { memo, useState } from 'react'
import { AiContentStyled } from './style'
import { getAiTream } from '@/service/request/ai'
import { Button } from 'antd'

export interface AiContentType {
  content: string
  role: string
}

export default memo(() => {
  const [value, setValue] = useState<string>('1+1等于几')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiReplyList, setAiReplyList] = useState<AiContentType[]>([]) // AI 输出的内容列表

  const local_user_info = JSON.parse(localStorage.getItem('USER_INFO') || '{}')

  const handleSubmit = async () => {
    setValue('')
    setLoading(true)

    const aiReplyNewList = [
      ...aiReplyList,
      {
        content: value,
        role: 'user',
      },
    ]

    setAiReplyList([
      ...aiReplyNewList,
      {
        content: '',
        role: 'assistant',
      },
    ])

    getAiTream(
      {
        messages: aiReplyNewList,
      },
      (chunk: string) => {
        const eventMatch = chunk.match(/event:\s*(\w+)/)
        const dataMatch = chunk.match(/data:\s*({.*})/)
        const result = {
          event: eventMatch ? eventMatch[1] : null, // 提取 event 的值
          data: dataMatch ? JSON.parse(dataMatch[1]) : null, // 提取 data 的值并解析为对象
        }

        //更新 aiReplyList 中的最后一个消息对象
        setAiReplyList(prev => {
          const lastMessage = prev[prev.length - 1]
          if (lastMessage?.role === 'assistant') {
            // 更新最后一个 AI 消息的内容
            return [
              ...prev.slice(0, -1),
              {
                ...lastMessage,
                content: lastMessage.content + result.data.content,
              },
            ]
          } else {
            // 如果没有 AI 消息，用之前的
            return [...prev]
          }
        })
      },
      () => {
        setLoading(false)
      },
      () => {
        setLoading(false)
      },
    )
  }

  return (
    <AiContentStyled className="ai_container">
      <div className="ai_container_content">
        {aiReplyList.length > 0 ? (
          <>
            <Bubble.List
              roles={(bubbleData: BubbleProps) => {
                const renderContent: BubbleProps['messageRender'] = content =>
                  content

                let obj = {}

                switch (bubbleData.role) {
                  case 'assistant':
                    obj = {
                      placement: 'start' as const,
                      avatar: {
                        icon: <OpenAIOutlined />,
                        style: { background: '#fde3cf' },
                      },
                      header: '灵析AI',
                    }
                    break
                  case 'user':
                    obj = {
                      placement: 'end' as const,
                      avatar: {
                        icon: <UserOutlined />,
                        style: { background: '#87d068' },
                      },
                      header: `${local_user_info.username}`,
                    }
                    break
                  default:
                    break
                }

                return {
                  ...obj,
                  messageRender: renderContent,
                  loading: !bubbleData.content,
                  footer: (
                    <Button
                      color="default"
                      variant="text"
                      size="small"
                      icon={<CopyOutlined />}
                    />
                  ),
                }
              }}
              items={aiReplyList}
            />
          </>
        ) : (
          <Welcome
            style={{
              backgroundImage:
                'linear-gradient(97deg, #f2f9fe 0%, #f7f3ff 100%)',
              borderStartStartRadius: 4,
            }}
            icon={<OpenAIOutlined style={{ fontSize: 40 }} />}
            title="你好，我是精灵开发平台智能助手灵析AI，有什么可以帮助你的。"
            description="灵析AI是一个基于大模型的智能助手，可以帮助您快速了解灵开发的功能和使用方法。"
          />
        )}
      </div>

      <Sender
        className="ai_container_sender"
        loading={loading}
        value={value}
        onChange={v => {
          setValue(v)
        }}
        onSubmit={handleSubmit}
        onCancel={() => {
          setLoading(false)
        }}
        autoSize={{ minRows: 1, maxRows: 8 }}
      />
    </AiContentStyled>
  )
})
