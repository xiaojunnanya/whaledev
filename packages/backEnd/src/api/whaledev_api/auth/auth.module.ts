import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { AUTHOR } from '@/config'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: AUTHOR.secret,
      signOptions: { expiresIn: AUTHOR.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
