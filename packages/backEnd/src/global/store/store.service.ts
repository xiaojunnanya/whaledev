import { Injectable, Scope } from '@nestjs/common'

@Injectable({ scope: Scope.REQUEST }) // 设置为 Request-scoped
export class StoreService {
  private userId: any

  setUserId(userId: string) {
    console.log(userId, '222')
    this.userId = userId
    console.log(this.userId, '333')
  }

  getUserId() {
    console.log(this.userId, '123')
    return this.userId
  }
}
