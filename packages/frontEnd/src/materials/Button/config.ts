import ButtonDev from './dev'
import ButtonProd from './prod'
import { ComponentConfig } from '../interface'

export const ButtonConfig: ComponentConfig = {
  headTitle: '基础组件',
  smallTitle: '通用',
  name: 'Button',
  defaultProps: {
    type: 'primary',
    text: '按钮',
  },
  desc: '按钮',
  component: {
    dev: ButtonDev,
    prod: ButtonProd,
  },
  setter: [
    {
      title: '按钮属性',
      propsList: [
        {
          name: 'type',
          label: '按钮类型',
          type: 'select',
          options: [
            { label: '主按钮', value: 'primary' },
            { label: '次按钮', value: 'default' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
      ],
    },
  ],
  stylesSetter: [
    {
      title: '按钮样式',
      styleList: [
        {
          name: 'width',
          label: '宽度',
          type: 'inputNumber',
        },
        {
          name: 'height',
          label: '高度',
          type: 'inputNumber',
        },
      ],
    },
  ],
  events: [
    {
      name: 'onClick',
      label: '点击事件',
    },
    {
      name: 'onDoubleClick',
      label: '双击事件',
    },
  ],
}
