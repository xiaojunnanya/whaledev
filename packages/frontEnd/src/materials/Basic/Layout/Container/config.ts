import { ComponentConfig } from '@/materials/interface'
import ContainerDev from './dev'
import ContainerProd from './prod'

const ContainerConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '布局',
  name: 'Container',
  defaultProps: {},
  desc: '容器',
  component: {
    dev: ContainerDev,
    prod: ContainerProd,
  },
  // stylesSetter: [
  //   {
  //     title: '容器大小',
  //     styleList: [
  //       {
  //         name: 'width',
  //         label: '宽度',
  //         type: 'inputNumber',
  //       },
  //       {
  //         name: 'height',
  //         label: '高度',
  //         type: 'inputNumber',
  //       },
  //     ],
  //   },
  // ],
}

export default ContainerConfig
