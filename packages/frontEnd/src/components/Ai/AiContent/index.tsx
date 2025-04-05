import { CopyOutlined, OpenAIOutlined, UserOutlined } from '@ant-design/icons'
import { Bubble, BubbleProps, Sender, Welcome } from '@ant-design/x'
import { memo, useEffect, useRef, useState } from 'react'
import { AiContentStyled } from './style'
import { getAiTream } from '@/service/request/ai'
import { Button, Typography } from 'antd'
import markdownit from 'markdown-it'
import { useTheme } from 'styled-components'
import copy from 'copy-to-clipboard'
import { useGlobal } from '@/stores/global'

const md = markdownit({ html: true, breaks: true })

export interface AiContentType {
  content: string
  role: string
}

export default memo(() => {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiReplyList, setAiReplyList] = useState<AiContentType[]>([]) // AI 输出的内容列表
  const theme = useTheme()
  const local_user_info = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  const { setMessage } = useGlobal()
  const bubbleListRef = useRef<HTMLDivElement | null>(null)

  // 滚动到最底部的函数
  const scrollToBottom = () => {
    const element = bubbleListRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  useEffect(() => {
    // 页面加载或 aiReplyList 更新后滚动到底部
    scrollToBottom()
  }, [aiReplyList])

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
        // 遗留的问题：异常兼容
        setLoading(false)
      },
    )
  }

  return (
    <AiContentStyled className="ai_container">
      <div className="ai_container_content">
        {aiReplyList.length > 0 ? (
          <div ref={bubbleListRef} className="ai_container_content_bubbleList">
            <Bubble.List
              roles={(bubbleData: BubbleProps) => {
                const renderContent: BubbleProps['messageRender'] = content => (
                  <Typography className="ai_content_typography">
                    <div
                      className={String(+new Date())}
                      dangerouslySetInnerHTML={{ __html: md.render(content) }}
                    />
                  </Typography>
                )

                let obj = {}

                switch (bubbleData.role) {
                  case 'assistant':
                    obj = {
                      placement: 'start' as const,
                      avatar: {
                        icon: <OpenAIOutlined />,
                        style: { background: theme.primaryColor[700] },
                      },
                      header: '灵析AI',
                    }
                    break
                  case 'user':
                    obj = {
                      placement: 'end' as const,
                      avatar: {
                        icon: <UserOutlined />,
                        style: { background: theme.primaryColor[900] },
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
                    <div
                      style={{
                        visibility: !loading ? 'visible' : 'hidden',
                      }}
                    >
                      <Button
                        color="default"
                        variant="text"
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => {
                          copy(bubbleData.content as string)
                          setMessage({
                            type: 'success',
                            text: '复制成功',
                          })
                        }}
                      />
                    </div>
                  ),
                }
              }}
              items={aiReplyList}
            />
          </div>
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
