import { Module, Global } from '@nestjs/common'
import { AxiosService } from './axios.service'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
    }),
  ],
  providers: [AxiosService],
  exports: [AxiosService],
})
export class AxiosModule {}
