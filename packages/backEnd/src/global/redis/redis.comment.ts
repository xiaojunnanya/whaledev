import { Injectable } from '@nestjs/common'
import { RedisService } from './redis.service'

// 存放较复杂的redis存储逻辑
@Injectable()
export class RedisComment {
  constructor(private readonly redisService: RedisService<any>) {}

  // 完善用户信息
  public saveUserInfo(user_id: string, userInfo: any) {
    this.redisService.set(user_id, userInfo)
  }

  public getUserInfo(user_id: string) {
    return this.redisService.get(user_id)
  }
}
