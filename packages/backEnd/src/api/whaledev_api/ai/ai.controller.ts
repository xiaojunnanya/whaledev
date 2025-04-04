import { Body, Controller, Header, Post, Res } from '@nestjs/common'
import { AiService } from './ai.service'
import { RawResponse } from '@/decorator/router.decorator'
import { MessagesDto } from './dto/ai.dto'
import { Response } from 'express'

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

    await this.aiService.getMsgWithQwenPlus(messages, res)
  }
}
