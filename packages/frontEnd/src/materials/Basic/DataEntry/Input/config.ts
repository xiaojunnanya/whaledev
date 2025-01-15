import { ComponentConfig } from '@/materials/interface'
import dev from './dev'
import prod from './prod'

const defaultProps = {
  allowClear: false,
  showCount: false,
  disabled: false,
  status: 'default',
  size: 'middle',
  inputMode: 'Input',
  autoSize: false,
  length: 6,
}

const ignoredProps = {
  inputTextArea: [
    'inputMode === Input',
    'inputMode === Input.Search',
    'inputMode === Input.Password',
    'inputMode === Input.OTP',
  ],
  inputSearch: [
    'inputMode === Input',
    'inputMode === Input.TextArea',
    'inputMode === Input.Password',
    'inputMode === Input.OTP',
  ],
  inputOTP: [
    'inputMode === Input',
    'inputMode === Input.TextArea',
    'inputMode === Input.Search',
    'inputMode === Input.Password',
  ],
  inputFilterOTP: ['inputMode === Input.OTP'],
  inputFilterAreaOTP: [
    'inputMode === Input.TextArea',
    'inputMode === Input.OTP',
  ],
}

export const InputConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '数据录入',
  name: 'Input',
  defaultProps: defaultProps,
  ignoredProps: ignoredProps,
  desc: '输入框',
  component: {
    dev: dev,
    prod: prod,
  },
  setter: [
    {
      title: '输入框模式',
      propsList: [
        {
          name: 'inputMode',
          label: '输入框模式',
          type: 'select',
          options: [
            { label: '文本框', value: 'Input' },
            { label: '文本域', value: 'Input.TextArea' },
            { label: '搜索框', value: 'Input.Search' },
            { label: '密码框', value: 'Input.Password' },
            { label: '一次性密码框', value: 'Input.OTP' },
          ],
        },
      ],
    },
    {
      title: '输入框属性',
      propsList: [
        {
          name: 'addonBefore',
          label: '前置图标',
          type: 'selectIcon',
          ignoreConfig: [
            'inputMode === Input.TextArea',
            'inputMode === Input.OTP',
          ],
        },
        {
          name: 'addonAfter',
          label: '后置图标',
          type: 'selectIcon',
          ignoreConfig: ignoredProps['inputFilterAreaOTP'],
        },
        {
          name: 'prefix',
          label: '前缀图标',
          type: 'selectIcon',
          ignoreConfig: ignoredProps['inputFilterAreaOTP'],
        },
        {
          name: 'suffix',
          label: '后缀图标',
          type: 'selectIcon',
          ignoreConfig: ignoredProps['inputFilterAreaOTP'],
        },
        {
          name: 'allowClear',
          label: '清空内容',
          type: 'switch',
          ignoreConfig: ignoredProps['inputFilterOTP'],
        },
        {
          name: 'showCount',
          label: '显示计数',
          type: 'switch',
          ignoreConfig: ignoredProps['inputFilterOTP'],
        },
        {
          name: 'autoSize',
          label: '自适应高度',
          type: 'switch',
          ignoreConfig: ignoredProps['inputTextArea'],
        },
        {
          name: 'enterButton',
          label: '确认按钮',
          type: 'switch',
          ignoreConfig: ignoredProps['inputSearch'],
        },
        {
          name: 'loading',
          label: '搜索加载',
          type: 'switch',
          ignoreConfig: ignoredProps['inputSearch'],
        },
        {
          name: 'defaultValue',
          label: '默认内容',
          type: 'input',
          placeholder: '请输入默认内容',
        },
        {
          name: 'placeholder',
          label: '占位符',
          type: 'input',
          placeholder: '请输入占位符',
          ignoreConfig: ignoredProps['inputFilterOTP'],
        },
        {
          name: 'disabled',
          label: '禁用',
          type: 'switch',
        },
        {
          name: 'maxLength',
          label: '最大长度',
          type: 'inputNumber',
          min: 0,
          placeholder: '请输入最大长度',
          ignoreConfig: ignoredProps['inputFilterOTP'],
        },
        {
          name: 'length',
          label: '元素数量',
          type: 'inputNumber',
          min: 0,
          placeholder: '请输入元素数量',
          ignoreConfig: ignoredProps['inputOTP'],
        },
        {
          name: 'status',
          label: '状态',
          type: 'segmented',
          options: [
            {
              label: '默认',
              value: 'default',
            },
            {
              label: '错误',
              value: 'error',
            },
            {
              label: '警告',
              value: 'warning',
            },
          ],
        },
        {
          name: 'size',
          label: '大小',
          type: 'segmented',
          options: [
            {
              label: '大',
              value: 'large',
            },
            {
              label: '中',
              value: 'middle',
            },
            {
              label: '小',
              value: 'small',
            },
          ],
        },
      ],
    },
  ],
  events: [
    {
      name: 'onChange',
      label: '内容发生变化',
    },
    {
      name: 'onPressEnter',
      label: '按下回车',
    },
    {
      name: 'onClear',
      label: '点击清除按钮',
    },
  ],
}
