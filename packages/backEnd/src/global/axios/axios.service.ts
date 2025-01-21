import { HttpService } from '@nestjs/axios'
import { ConsoleLogger, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

// 暂未使用
@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  findAll(): Observable<AxiosResponse> {
    return this.httpService.get('http://localhost:3000/cats')
  }
}
