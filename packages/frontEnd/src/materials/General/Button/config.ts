import ButtonDev from './dev'
import ButtonProd from './prod'
import { ComponentConfig } from '../../interface'

export const ButtonConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '通用',
  name: 'Button',
  defaultProps: {
    type: 'primary',
    text: '按钮',
    autoInsertSpace: true,
    block: false,
    disabled: false,
    icon: '',
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
            { label: '主按钮 primary', value: 'primary' },
            { label: '次按钮 default', value: 'default' },
            { label: '虚线按钮 dashed', value: 'dashed' },
            { label: '文本按钮 text', value: 'text' },
            { label: '链接按钮 link', value: 'link' },
          ],
        },
        {
          name: 'text',
          label: '文本',
          type: 'input',
        },
        {
          name: 'autoInsertSpace',
          label: '添加空格',
          type: 'switch',
          prompt: '两个汉字之间默认显示一个空格',
        },
        {
          name: 'block',
          label: '块级按钮',
          type: 'switch',
          prompt: '将按钮宽度调整为其父宽度',
        },
        {
          name: 'disabled',
          label: '禁用',
          type: 'switch',
        },
        {
          name: 'icon',
          label: '图标',
          type: 'selectIcon',
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
