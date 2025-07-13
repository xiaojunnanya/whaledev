import { ComponentConfig } from '@/materials/interface'
import dev from './dev'
import prod from './prod'

const FlexConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '布局',
  name: 'Flex',
  defaultProps: {
    flexNum: 2,
  },
  desc: 'Flex布局',
  component: {
    dev: dev,
    prod: prod,
  },
  setter: [
    {
      title: 'flex属性',
      propsList: [
        {
          name: 'flexNum',
          label: '最大长度',
          type: 'inputNumber',
          max: 9,
          min: 1,
          placeholder: '请输入最大长度',
        },
      ],
    },
  ],
}

export default FlexConfig
