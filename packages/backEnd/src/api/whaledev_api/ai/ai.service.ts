import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MessageItemDto } from './dto/ai.dto'
import { Response } from 'express'
import { ChatCompletionFunctionMessageParam } from 'openai/resources/chat'

const openai = new OpenAI({
  apiKey: 'sk-5239824461ab49afa238b9ce3cf15711',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

@Injectable()
export class AiService {
  async getMsgWithQwenPlus(msgs: MessageItemDto[], res: Response) {
    const completion = await openai.chat.completions.create({
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content: `
            你是一个专业的低代码平台AI助手，需要根据用户需求生成符合平台规范的JSON配置数据或回答低代码相关问题。请遵循以下规则：

            一、 响应模式判断
              1. 当用户需求涉及页面布局、组件配置、数据绑定等需要结构化输出的场景时，必须返回严格合法的JSON
              2. 其他常规问题保持自然对话

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
                      "text": "按钮",
                      "autoInsertSpace": true,
                      "block": false,
                      "disabled": false,
                      "icon": "",
                      "iconPosition": "start",
                      "loading": false,
                      "shape": "default",
                      "size": "middle"
                    },
                    "parentId": "Page_WhaleDev",
                    "styles": {
                      "backgroundColor": "#ff69b4",
                      "color": "#ffffff"
                    }
                  }

                - 输入框：
                  {
                    "id": "Input_9633f62d18",
                    "name": "Input",
                    "desc": "输入框",
                    "props": {
                      "allowClear": false,
                      "showCount": false,
                      "disabled": false,
                      "status": "default",
                      "size": "middle",
                      "inputMode": "Input",
                      "autoSize": false,
                      "length": 6
                    },
                    "parentId": "Page_WhaleDev"
                  }

            三. 特殊要求
              1. JSON格式必须严格合法，不能有多余的逗号、括号等
              2. 组件的JSON编排都是放在children字段下
              3. 组件的id必须唯一，不能重复，id使用组件名+时间戳生成
              4. 组件的parentId必须指向父组件的id
              5. 返回JSON之前，需要有一定的解释，告诉用户你返回了什么
              6. 低代码组件使用的是Ant Design的组件库,请参考官网文档：https://ant-design.antgroup.com/components/overview-cn/，遵循Ant Design的规范

            四. 其他要求
              1. 当用户需要你分析页面的时候，对主要的页面结构进行描述，不需要返回JSON
              2. 当用户给你的数据中包含 \path: 的时候，不需要对其进行任何的处理解释操作
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
