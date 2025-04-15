import {
  CheckOutlined,
  CopyOutlined,
  FireOutlined,
  OpenAIOutlined,
  ReadOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Bubble,
  BubbleProps,
  Prompts,
  PromptsProps,
  Sender,
  Welcome,
} from '@ant-design/x'
import { memo, useEffect, useRef, useState } from 'react'
import { AiContentStyled } from './style'
import { getAiTream } from '@/service/request/ai'
import { Button, Space, Typography } from 'antd'
import markdownit from 'markdown-it'
import { useTheme } from 'styled-components'
import copy from 'copy-to-clipboard'
import { useGlobal } from '@/stores/global'
import { useComponetsStore } from '@/stores/components'
import { extractJSONFromString } from '@/utils'
import { useLocation } from 'react-router-dom'

const md = markdownit({ html: true, breaks: true })

export interface AiContentType {
  content: string
  role: string
}

const renderTitle = (icon: React.ReactElement, title: string) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
)

const promptsItems: PromptsProps['items'] = [
  {
    key: '1',
    label: renderTitle(
      <FireOutlined style={{ color: '#FF4D4F' }} />,
      '关于精灵开发',
    ),
    children: [
      {
        key: '1-1',
        description: `精灵开发是做什么的？`,
      },
      {
        key: '1-2',
        description: `你是谁？`,
      },
    ],
  },
  {
    key: '2',
    label: renderTitle(<ReadOutlined style={{ color: '#1890FF' }} />, '低代码'),
    children: [
      {
        key: '2-1',
        description: `低代码的作用是什么？`,
      },
    ],
  },
  {
    key: '3',
    label: renderTitle(
      <RocketOutlined style={{ color: '#722ED1' }} />,
      '灵析AI',
    ),
    children: [
      {
        key: '3-1',
        description: `帮我生成一个页面，页面有一个输入框和一个按钮，按钮名字为确定，颜色为粉色`,
      },
      // {
      //   key: 'analysis_page',
      //   description: `帮我分析一下当前页面的内容`,
      // },
    ],
  },
]

export default memo(() => {
  const [value, setValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [aiReplyList, setAiReplyList] = useState<AiContentType[]>([]) // AI 输出的内容列表
  const theme = useTheme()
  const local_user_info = JSON.parse(localStorage.getItem('USER_INFO') || '{}')
  const { setMessage } = useGlobal()
  const bubbleListRef = useRef<HTMLDivElement | null>(null)
  const controllerRef = useRef<AbortController | null>(null)
  const { updeteComponent } = useComponetsStore()
  const { pathname } = useLocation()
  console.log(pathname, 'pathname')

  // 滚动到最底部的函数
  const scrollToBottom = () => {
    // 遗留的问题：当用户主动向上滚动的时候没法滚动
    const element = bubbleListRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }

  useEffect(() => {
    // 页面加载或 aiReplyList 更新后滚动到底部
    scrollToBottom()
  }, [aiReplyList])

  const handleClick = (s: string) => {
    const str = extractJSONFromString(s)
    if (str) {
      updeteComponent(str)
    } else {
      setMessage({
        type: 'error',
        text: '解析失败，详情请查看控制台',
      })
    }
  }

  const handleSubmit = async (v: string = '') => {
    if (!value && !v) return
    const controller = new AbortController()
    controllerRef.current = controller
    setValue('')
    setLoading(true)

    const aiReplyNewList = [
      ...aiReplyList,
      {
        content: value || v,
        role: 'user',
        extra: {
          path: String(pathname),
        },
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

        // 更新 aiReplyList 中的最后一个消息对象
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
      controller,
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

                const showSureButton =
                  typeof bubbleData?.content === 'string' &&
                  bubbleData.role === 'assistant' &&
                  bubbleData?.content?.includes('```') &&
                  pathname.includes('/project') &&
                  pathname.includes('/page') &&
                  pathname.includes('/edit')

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
                      {showSureButton && (
                        <>
                          <Button
                            onClick={() => {
                              handleClick(bubbleData?.content as string)
                            }}
                            icon={<CheckOutlined />}
                          >
                            确认使用
                          </Button>
                        </>
                      )}

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
          <>
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
            <Prompts
              className="ai_container_prompts"
              title="你可能想问："
              items={promptsItems}
              wrap
              styles={{
                item: {
                  flex: 'none',
                  width: 'calc(30% - 6px)',
                  backgroundImage: `linear-gradient(137deg, #e5f4ff 0%, #efe7ff 100%)`,
                  border: 0,
                },
                subItem: {
                  background: 'rgba(255,255,255,0.45)',
                  border: '1px solid #FFF',
                },
              }}
              onItemClick={info => {
                if (info.data.key === 'analysis_page') {
                  handleSubmit(info.data.description as string)
                } else {
                  handleSubmit(info.data.description as string)
                }
              }}
            />
          </>
        )}
      </div>

      <Sender
        placeholder="有什么我能帮你的吗？"
        className="ai_container_sender"
        loading={loading}
        value={value}
        onChange={v => {
          setValue(v)
        }}
        onSubmit={handleSubmit}
        onCancel={() => {
          if (controllerRef.current) {
            controllerRef.current.abort()
          }
          setLoading(false)
        }}
        autoSize={{ minRows: 1, maxRows: 8 }}
      />
    </AiContentStyled>
  )
})
