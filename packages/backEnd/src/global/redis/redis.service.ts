import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService<V> {
  // 注入 Redis
  constructor(
    @Inject('RedisClientConnect') private readonly redisClient: Redis,
  ) {}

  /**
   * 删除缓存
   * @param keys 一个或多个 key
   */
  async delete(...keys: string[]): Promise<void> {
    if (keys && keys.length > 0) {
      await this.redisClient.del(...keys)
    }
  }

  /**
   * 根据 key 获取值
   * @param key 键
   * @returns 返回值或 null
   */
  async get(key: string): Promise<V | null> {
    if (!key) return null
    const value = await this.redisClient.get(key)
    return value ? (JSON.parse(value) as V) : null
  }

  /**
   * 普通缓存放入
   * @param key 键
   * @param value 值
   * @returns true 成功，false 失败
   */
  async set(key: string, value: V): Promise<boolean> {
    try {
      await this.redisClient.set(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(
        `设置 Redis Key: ${key}, Value: ${JSON.stringify(value)} 失败`,
        error,
      )
      return false
    }
  }

  /**
   * 普通缓存放入并设置时间
   * @param key 键
   * @param value 值
   * @param time 时间（秒）>0 则设置时间，<=0 则设置为无限期
   * @returns true 成功，false 失败
   */
  async setex(key: string, value: V, time: number): Promise<boolean> {
    try {
      if (time > 0) {
        // 'EX'：表示设置过期时间（单位是秒）
        await this.redisClient.set(key, JSON.stringify(value), 'EX', time)
      } else {
        await this.set(key, value)
      }
      return true
    } catch (error) {
      console.error(
        `设置 Redis Key: ${key}, Value: ${JSON.stringify(value)} 失败`,
        error,
      )
      return false
    }
  }

  /**
   * 设置键的过期时间
   * @param key 键
   * @param time 时间（秒）
   * @returns true 成功，false 失败
   */
  async expire(key: string, time: number): Promise<boolean> {
    try {
      if (time > 0) {
        await this.redisClient.expire(key, time)
      }
      return true
    } catch (error) {
      console.error(`设置 Redis Key: ${key} 过期时间失败`, error)
      return false
    }
  }

  /**
   * 获取列表中的所有元素
   * @param key 键
   * @returns 列表值
   */
  async getQueueList(key: string): Promise<V[]> {
    const values = await this.redisClient.lrange(key, 0, -1)
    return values.map(v => JSON.parse(v) as V)
  }

  /**
   * 向列表左侧推入值
   * @param key 键
   * @param value 值
   * @param time 时间（秒）
   * @returns true 成功，false 失败
   */
  async listPush(key: string, value: V, time: number): Promise<boolean> {
    try {
      await this.redisClient.lpush(key, JSON.stringify(value))
      if (time > 0) {
        await this.expire(key, time)
      }
      return true
    } catch (error) {
      console.error(
        `向列表推入 Redis Key: ${key}, Value: ${JSON.stringify(value)} 失败`,
        error,
      )
      return false
    }
  }

  /**
   * 向列表左侧推入多个值
   * @param key 键
   * @param values 值列表
   * @param time 时间（秒）
   * @returns true 成功，false 失败
   */
  async listPushAll(key: string, values: V[], time: number): Promise<boolean> {
    try {
      const jsonValues = values.map(v => JSON.stringify(v))
      await this.redisClient.lpush(key, ...jsonValues)
      if (time > 0) {
        await this.expire(key, time)
      }
      return true
    } catch (error) {
      console.error(
        `向列表推入多个 Redis Key: ${key}, Values: ${JSON.stringify(
          values,
        )} 失败`,
        error,
      )
      return false
    }
  }

  /**
   * 移除列表中的元素
   * @param key 键
   * @param value 值
   * @returns 移除的数量
   */
  async remove(key: string, value: V): Promise<number> {
    try {
      return await this.redisClient.lrem(key, 1, JSON.stringify(value))
    } catch (error) {
      console.error(
        `移除 Redis Key: ${key}, Value: ${JSON.stringify(value)} 失败`,
        error,
      )
      return 0
    }
  }
}
