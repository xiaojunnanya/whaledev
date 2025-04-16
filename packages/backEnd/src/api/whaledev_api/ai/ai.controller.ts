import { Body, Controller, Header, Post, Res } from '@nestjs/common'
import { AiService } from './ai.service'
import { RawResponse, WhaleSkipAuth } from '@/decorator/router.decorator'
import { MessagesDto } from './dto/ai.dto'
import { Response } from 'express'

@WhaleSkipAuth()
@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @RawResponse()
  @Post('completions')
  @Header('Content-Type', 'text/event-stream; charset=utf-8')
  @Header('Cache-Control', 'no-cache')
  @Header('Connection', 'keep-alive')
  async getMsgWithQwenPlus(
    @Body() messages: MessagesDto,
    @Res() res: Response,
  ) {
    // 立即把已设置的响应头发送到客户端，即使还没开始写入正文内容
    res.flushHeaders?.()

    const msg = messages.messages

    msg.map(item => {
      if (item.extra && Object.keys(item.extra).length > 0) {
        item.content = item.content + 'path: ' + item.extra.path
      }

      return item
    })

    await this.aiService.getMsgWithQwenPlus(msg, res)
  }
}
