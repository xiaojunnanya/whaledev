import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/menu.dto'
import { ReturnResult } from '@/common/returnResult'

@Injectable()
export class MenuService {
  login(data: LoginDto) {
    if (data.username === 'admin' && data.password === 'admin123456') {
      const data = {
        is_not_delete_token: true,
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
      return ReturnResult.successUseCode200('登录成功', data)
    } else {
      return ReturnResult.successUseCode200('登录失败')
    }
  }

  getMenuList() {
    const data = [
      {
        label: '仪表盘',
        labelEn: 'Dashboard',
        icon: 'la:tachometer-alt',
        key: '/dashboard',
        rule: '/dashboard',
      },
      {
        label: '组件',
        labelEn: 'Components',
        icon: 'fluent:box-20-regular',
        key: '/demo',
        children: [
          {
            label: '剪切板',
            labelEn: 'Copy',
            key: '/demo/copy',
            rule: '/demo/copy',
          },
          {
            label: '水印',
            labelEn: 'Watermark',
            key: '/demo/watermark',
            rule: '/demo/watermark',
          },
          {
            label: '虚拟滚动',
            labelEn: 'Virtual Scroll',
            key: '/demo/virtualScroll',
            rule: '/demo/virtualScroll',
          },
          {
            label: '富文本',
            labelEn: 'Editor',
            key: '/demo/editor',
            rule: '/demo/editor',
          },
          {
            label: '动态路由参数',
            labelEn: 'Dynamic',
            key: '/demo/123/dynamic',
            rule: '/demo/dynamic',
          },
          {
            label: '层级1',
            labelEn: 'Level1',
            key: '/demo/level1',
            children: [
              {
                label: '层级2',
                labelEn: 'Level2',
                key: '/demo/level1/level2',
                children: [
                  {
                    label: '层级3',
                    labelEn: 'Level3',
                    key: '/demo/level1/level2/level3',
                    rule: '/demo/watermark',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: '系统管理',
        labelEn: 'System Management',
        icon: 'ion:settings-outline',
        key: '/system',
        children: [
          {
            label: '用户管理',
            labelEn: 'User Management',
            key: '/system/user',
            rule: '/authority/user',
          },
          {
            label: '菜单管理',
            labelEn: 'Menu Management',
            key: '/system/menu',
            rule: '/authority/menu',
          },
        ],
      },
      {
        label: '内容管理',
        labelEn: 'Content Management',
        icon: 'majesticons:article-search-line',
        key: '/content',
        children: [
          {
            label: '文章管理',
            labelEn: 'Article Management',
            key: '/content/article',
            rule: '/content/article',
          },
        ],
      },
    ]

    return ReturnResult.successUseCode200('', data)
  }

  refreshPermissions() {
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
        '/demo/dynamic',
        '/demo/level',
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

    return ReturnResult.successUseCode200('', data)
  }

  dashboard() {
    return ReturnResult.successUseCode200('')
  }
}
