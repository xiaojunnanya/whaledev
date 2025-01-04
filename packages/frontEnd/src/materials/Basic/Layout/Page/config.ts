import { ComponentConfig } from '@/materials/interface'
import PageDev from './dev'
import PageProd from './prod'

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
