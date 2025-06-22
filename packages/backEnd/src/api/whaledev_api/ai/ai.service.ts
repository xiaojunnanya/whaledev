import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MessageItemDto } from './dto/ai.dto'
import { Response } from 'express'
import { ChatCompletionFunctionMessageParam } from 'openai/resources/chat'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AiService {
  private openai: OpenAI

  constructor(private configService: ConfigService) {
    // 获取环境变量
    const apiKey = this.configService.get<string>('OPENAI_API_KEY')
    const baseURL = this.configService.get<string>('OPENAI_BASE_URL')

    // 初始化 OpenAI 客户端
    this.openai = new OpenAI({
      apiKey: apiKey,
      baseURL: baseURL,
    })
  }

  async getMsgWithQwenPlus(msgs: MessageItemDto[], res: Response) {
    // @ts-ignore
    const completion = await this.openai.chat.completions.create({
      model: 'qwen3-235b-a22b',
      enable_thinking: false,
      messages: [
        {
          role: 'system',
          content: `
            你的名字是鲸灵开发，你是一个专业的低代码平台 AI 助手，负责根据用户需求生成平台规范的 JSON 配置数据，或回答与低代码相关的问题。请根据用户意图，自然对话或输出结构化 JSON。
            
            请遵循以下规则：

            一、 响应模式判断
              1. 当用户需求涉及页面布局、组件配置、数据绑定等结构化内容时，必须返回 **严格合法的 JSON 配置**。  
              2. 当用户提出常规或泛化问题时，以自然语言进行对话。

            二、 JSON格式要求
              1. 基础结构：
                [
                  {
                    "id": "Page_WhaleDev",
                    "name": "Page",
                    "props": {},
                    "desc": "页面",
                    "children": []
                  }
                ]

              2. 组件模板示例：
                - 按钮：
                  {
                    "id": "Button_8b33187c0e",
                    "name": "Button",
                    "desc": "按钮",
                    "props": {
                      "type": "primary",
                      "text": "按钮"
                    },
                    "parentId": "Page_WhaleDev",
                    "styles": {}
                  }

                - 输入框：
                  {
                    "id": "Input_9633f62d18",
                    "name": "Input",
                    "desc": "输入框",
                    "props": {},
                    "parentId": "Page_WhaleDev"
                  }

            三. 特殊要求
              1. 保证 JSON 格式完全合法，避免多余的逗号、括号等语法错误
              2. 所有组件应放在其父组件的 children 字段中。
              3. 组件的 id 必须唯一，建议使用「组件名 + 时间戳」生成
              4. parentId 必须正确指向父组件的 id。
              5. 在返回 JSON 前，请用简洁语言说明生成内容及其作用。
              6. 所有组件基于 Ant Design 组件库,请参考官网文档：https://ant-design.antgroup.com/components/overview-cn/，遵循Ant Design的规范
          `,
        },
        ...(msgs as ChatCompletionFunctionMessageParam[]),
      ],
      stream: true,
    })
    try {
      for await (const chunk of completion) {
        const text = chunk.choices[0]?.delta?.content || ''
        const obj = {
          content: text,
          role: 'assistant',
        }

        if (text) {
          // 实时写入给前端
          res.write(`event: message\ndata: ${JSON.stringify(obj)}\n\n`)
        }
      }
    } catch (error) {
      res.write(`event: error\ndata: 处理失败\n\n`)
    } finally {
      res.end() // 关闭流
    }
  }
}
