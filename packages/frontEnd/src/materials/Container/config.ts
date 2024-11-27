import ContainerDev from './dev'
import ContainerProd from './prod'
import { ComponentConfig } from '../interface'

export const ContainerConfig: ComponentConfig = {
  headTitle: '基础组件',
  smallTitle: '布局',
  name: 'Container',
  defaultProps: {},
  desc: '容器',
  component: {
    dev: ContainerDev,
    prod: ContainerProd,
  },
}
