import { Injectable, Scope } from '@nestjs/common'
import { AsyncLocalStorage } from 'async_hooks'

@Injectable()
export class StoreService {
  private readonly storage = new AsyncLocalStorage<Map<string, any>>()

  run(callback: () => void) {
    const store = new Map<string, any>()
    this.storage.run(store, callback)
  }

  set(key: string, value: any) {
    const store = this.storage.getStore()
    if (store) {
      store.set(key, value)
    }
  }

  get(key: string): any {
    const store = this.storage.getStore()
    return store ? store.get(key) : undefined
  }
}
