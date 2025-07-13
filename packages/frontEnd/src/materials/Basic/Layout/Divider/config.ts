import { ComponentConfig } from '@/materials/interface'
import dev from './dev'
import prod from './prod'

const DividerConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '布局',
  name: 'Divider',
  defaultProps: {
    variant: 'solid',
    text: '分割线',
    orientation: 'center',
    type: 'horizontal',
    plain: false,
  },
  desc: '分割线',
  component: {
    dev: dev,
    prod: prod,
  },
  setter: [
    {
      title: '分割线属性',
      propsList: [
        {
          name: 'text',
          label: '嵌套标题',
          type: 'input',
        },
        {
          name: 'orientation',
          label: '标题位置',
          type: 'select',
          options: [
            { label: '中间 center', value: 'center' },
            { label: '左边 left', value: 'left' },
            { label: '右边 right', value: 'right' },
          ],
        },
        {
          name: 'variant',
          label: '分割线样式',
          type: 'select',
          options: [
            { label: '实线 solid', value: 'solid' },
            { label: '虚线 dashed', value: 'dashed' },
            { label: '点线 dotted', value: 'dotted' },
          ],
        },
        {
          name: 'type',
          label: '类型',
          type: 'segmented',
          options: [
            {
              label: '水平',
              value: 'horizontal',
            },
            {
              label: '垂直',
              value: 'vertical',
            },
          ],
        },
        {
          name: 'plain',
          label: '文字样式',
          type: 'switch',
          prompt: '文字是否显示为普通正文样式',
        },
      ],
    },
  ],
}

export default DividerConfig
