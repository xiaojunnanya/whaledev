import { CSSProperties, PropsWithChildren } from 'react'

export interface CommonComponentProps extends PropsWithChildren {
  id: string
  name: string
  styles?: CSSProperties
  [key: string]: any
}

type IType =
  | 'select'
  | 'input'
  | 'inputNumber'
  | 'switch'
  | 'selectIcon'
  | 'segmented'

export interface ComponentSetter {
  name: string // 字段名
  label: string // 前面的文案
  type: IType // 表单类型，比如 select
  prompt?: string // 提示
  options?: { label: string; value: string | number }[] // select、segmented 的选项
  [key: string]: any
}

export interface ComponentEvent {
  name: string
  label: string
  action?: any[]
}

// 遗留的问题：ignoredProps并没有限制
export interface ComponentConfig {
  name: string // 组件名
  defaultProps: {
    [key: string]: any // defaultProps 的键名与 setter 的 name 一一对应
  } // 默认属性
  ignoredProps?: {
    [key in keyof ComponentConfig['defaultProps']]: any // 忽略的属性
  }
  desc: string // 组件描述
  firstTitle: string // 一级标题
  secondaryTitle: string // 二级标题
  component: {
    dev: any
    prod: any
  } // 渲染哪个组件
  setter?: {
    // 属性
    title: string
    propsList: ComponentSetter[]
  }[]
  stylesSetter?: {
    // 样式
    title: string
    styleList: ComponentSetter[]
  }[]
  events?: ComponentEvent[] // 事件
}
