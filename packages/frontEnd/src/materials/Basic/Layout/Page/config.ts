import { ComponentConfig } from '@/materials/interface'
import PageDev from './dev'
import PageProd from './prod'

const PageConfig: ComponentConfig = {
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

export default PageConfig
