import { Injectable, NestMiddleware } from '@nestjs/common'
import { StoreService } from '@/global/store/store.service'

@Injectable()
export class RouterMiddleware implements NestMiddleware {
  constructor(private readonly storeService: StoreService) {}

  use(req: any, res: any, next: () => void) {
    // 初始化store
    this.storeService.run(() => {
      next()
    })
  }
}
