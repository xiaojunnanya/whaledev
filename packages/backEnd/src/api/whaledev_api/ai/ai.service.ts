import { Injectable } from '@nestjs/common'
import OpenAI from 'openai'
import { MessagesDto } from './dto/ai.dto'
import { Response } from 'express'
import { ChatCompletionFunctionMessageParam } from 'openai/resources/chat'

const openai = new OpenAI({
  apiKey: '',
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

@Injectable()
export class AiService {
  async getMsgWithQwenPlus(msgs: MessagesDto, res: Response) {
    const completion = await openai.chat.completions.create({
      model: 'qwen-plus',
      messages: [
        {
          role: 'system',
          content:
            '你是一个低代码开发助手，名为灵析AI。你的任务是帮助用户快速理解和使用低代码平台的功能，例如创建表单、配置工作流、设置权限等。你的回答应该简洁明了，并尽量结合具体的步骤或示例进行说明。如果问题超出范围，请引导用户查阅官方文档或联系技术支持。',
        },
        ...(msgs.messages as ChatCompletionFunctionMessageParam[]),
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
