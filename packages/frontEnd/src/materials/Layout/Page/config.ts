import PageDev from './dev'
import PageProd from './prod'
import { ComponentConfig } from '../interface'

export const PageConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '布局',
  name: 'Page',
  defaultProps: {},
  desc: '页面',
  component: {
    dev: PageDev,
    prod: PageProd,
  },
}
