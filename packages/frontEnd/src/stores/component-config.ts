import { create } from 'zustand'
import comConfig from '@/materials/index'
import { ComponentConfig } from '@/materials/interface'

interface State {
  componentConfig: { [key: string]: ComponentConfig }
}

interface Action {
  registerComponent: (name: string, componentConfig: ComponentConfig) => void
}
// compnent 名字和 Component 实例的映射
export const useComponentConfigStore = create<State & Action>(set => ({
  componentConfig: comConfig,
  registerComponent: (name, componentConfig) =>
    set(state => {
      return {
        ...state,
        componentConfig: {
          ...state.componentConfig,
          [name]: componentConfig,
        },
      }
    }),
}))
