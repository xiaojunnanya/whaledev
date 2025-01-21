import { JwtService } from '@nestjs/jwt'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { WHAKE_Skip_AUTH } from '@/decorator/router.decorator'
import { Reflector } from '@nestjs/core'
import { StoreService } from '@/global/store/store.service'
import { PrismaService } from '@/global/prisma/prisma.service'
import { ErrorException } from '@/config'

// 遗留的问题：待验证
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService

  @Inject(Reflector)
  private readonly reflector: Reflector

  @Inject(StoreService)
  private readonly store: StoreService

  @Inject(PrismaService)
  private readonly prisma: PrismaService

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查路由或控制器是否有 `@WhaleSkipAuth()` 标记，有就不需要权限验证
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      WHAKE_Skip_AUTH,
      [
        context.getHandler(), // 路由级别
        context.getClass(), // 控制器级别
      ],
    )

    if (isSkipAuth) return true

    const request: Request = context.switchToHttp().getRequest()

    const authorization = request.header('authorization') || ''

    if (!authorization) {
      throw new UnauthorizedException(ErrorException.UserTokenErr)
    }

    const bearer = authorization.split(' ')

    if (!bearer || bearer.length !== 2) {
      throw new UnauthorizedException(ErrorException.UserTokenErr)
    }

    const token = bearer[1]

    // 遗留的问题，对token内容的验证
    try {
      const { user_id = undefined } = this.jwtService.verify(token)
      const res = await this.prisma.user.findUnique({
        where: {
          user_id,
        },
      })

      if (!res) {
        throw new UnauthorizedException(ErrorException.UserTokenErr)
      }

      this.store.set('user_id', user_id)

      return true
    } catch (e) {
      throw new UnauthorizedException(ErrorException.UserTokenErr)
    }
  }

  async userInfoAuth(user_id: string) {
    const res = await this.prisma.user.findUnique({
      where: {
        user_id,
      },
    })

    if (!res) {
      throw new UnauthorizedException('用户身份信息错误，请重新登录')
    } else {
      return res
    }
  }
}
