import ButtonDev from './dev'
import ButtonProd from './prod'
import { ComponentConfig } from '../interface'

export const ButtonConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '通用',
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
            { label: '虚线按钮', value: 'dashed' },
            { label: '文本按钮', value: 'text' },
            { label: '链接按钮', value: 'link' },
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
