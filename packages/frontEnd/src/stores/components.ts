import { getComponentById, updateObjectById } from '@/utils/components'
import { CSSProperties } from 'react'
import { create } from 'zustand'

export const PAGEID = 'Page_WhaleDev'

// 待思考：组件添加版本
export interface Component {
  id: string // ID
  name: string // 名字
  props: any // 属性
  desc: string // 描述
  styles?: CSSProperties // 样式
  children?: Component[] // 子
  parentId?: string // 父ID
  events?: any[] // 事件
}

interface State {
  components: Component[] // 组件列表
  curComponentId?: string | null // 当前组件ID
  curComponent: Component | null // 当前组件
  componentActionList: any[] // 组件操作列表
}

interface Action {
  addComponent: (component: Component, parentId?: string) => void // 添加组件
  updeteComponent: (component: Component[]) => void // 更新组件
  deleteComponent: (componentId: string) => void // 删除组件
  updeteComponentById: (componentId: string, component: Component) => void // 更新组件通过ID
  updateComponentProps: (componentId: string, props: any) => void // 更新组件属性
  updateComponentEvents: (componentId: string, event: any) => void // 更新组件事件
  setCurComponentId: (componentId: string | null) => void // 设置选中组件ID
  updateComponentStyles: (
    componentId: string,
    styles: CSSProperties,
    replace?: boolean,
  ) => void // 更新组件样式
  setComponentActionList: (actionList: any[]) => void // 设置组件操作列表
}

export const initComponents: Component[] = [
  {
    id: PAGEID,
    name: 'Page',
    props: {},
    desc: '页面',
    children: [],
  },
]

export const useComponetsStore = create<State & Action>((set, get) => ({
  // State
  components: initComponents,
  curComponentId: null,
  curComponent: null,
  componentActionList: [],
  // Action
  updeteComponent: (component: Component[]) =>
    set(() => ({
      components: component,
    })),
  setCurComponentId: componentId =>
    set(state => ({
      curComponentId: componentId,
      curComponent: getComponentById(componentId, state.components),
    })),
  addComponent: (component, parentId) =>
    set(state => {
      if (parentId) {
        const parentComponent = getComponentById(parentId, state.components)

        if (parentComponent) {
          if (parentComponent.children) {
            parentComponent.children.push(component)
          } else {
            parentComponent.children = [component]
          }
        }

        component.parentId = parentId
        return { components: [...state.components] }
      }
      return { components: [...state.components, component] }
    }),
  deleteComponent: componentId => {
    if (!componentId) return

    const component = getComponentById(componentId, get().components)
    if (component?.parentId) {
      const parentComponent = getComponentById(
        component.parentId,
        get().components,
      )

      if (parentComponent) {
        parentComponent.children = parentComponent?.children?.filter(
          item => item.id !== componentId,
        )

        set({ components: [...get().components] })
      }
    }
  },
  updeteComponentById: (componentId, comp) =>
    set(state => {
      let component = getComponentById(componentId, state.components)

      if (component) {
        const arr = updateObjectById(state.components, componentId, comp)
        return { components: [...arr] }
      }
      return { components: [...state.components] }
    }),
  updateComponentProps: (componentId, props) =>
    set(state => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.props = { ...component.props, ...props }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  updateComponentEvents: (componentId, events) =>
    set(state => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        if (component.events) {
          // component.events.push(events);
          for (const item of component.events) {
            if (item.name === events.name) {
              item.action = events.action
              break
            }
          }
        } else {
          component.events = [events]
        }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  updateComponentStyles: (componentId, styles, replace) =>
    set(state => {
      const component = getComponentById(componentId, state.components)
      if (component) {
        component.styles = replace
          ? { ...styles }
          : { ...component.styles, ...styles }

        return { components: [...state.components] }
      }

      return { components: [...state.components] }
    }),
  setComponentActionList: (list: any[]) =>
    set(() => ({
      componentActionList: list,
    })),
}))
