import { Inject, Injectable } from '@nestjs/common'
import { I18nContext, I18nService } from 'nestjs-i18n'

@Injectable()
export class AppService {
  @Inject()
  i18n: I18nService

  getHello() {
    return {
      code: 0,
      type: 'success',
      message: this.i18n.t('lang.hello', {
        lang: I18nContext.current()?.lang,
      }),
      data: null,
    }
  }
}
