import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/menu.dto'
import { ReturnResult } from '@/common/returnResult'

@Injectable()
export class MenuService {
  login(data: LoginDto) {
    if (data.username === 'admin' && data.password === 'admin123456') {
      const data = {
        token: 'mock_token_123456',
        user: {
          id: 1,
          username: 'south后台',
          email: '1275093225@qq.com',
          phone: '123456789',
        },
        permissions: [
          '/dashboard',
          '/demo',
          '/demo/copy',
          '/demo/editor',
          '/demo/wangEditor',
          '/demo/virtualScroll',
          '/demo/watermark',
          '/authority/user',
          '/authority/user/index',
          '/authority/user/create',
          '/authority/user/update',
          '/authority/user/view',
          '/authority/user/delete',
          '/authority/user/authority',
          '/authority/role',
          '/authority/role/index',
          '/authority/role/create',
          '/authority/role/update',
          '/authority/role/view',
          '/authority/role/delete',
          '/authority/menu',
          '/authority/menu/index',
          '/authority/menu/create',
          '/authority/menu/update',
          '/authority/menu/view',
          '/authority/menu/delete',
          '/content/article',
          '/content/article/index',
          '/content/article/create',
          '/content/article/update',
          '/content/article/view',
          '/content/article/delete',
        ],
      }
      return ReturnResult.success('登录成功', data)
    } else {
      return 'fail'
    }
  }
}
