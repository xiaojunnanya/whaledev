import { create } from 'zustand'
import comConfig from '@/materials/index'
import { ComponentConfig } from '@/materials/interface'

interface State {
  componentMap: { [key: string]: ComponentConfig }
}

interface Action {
  registerComponent: (name: string, componentMap: ComponentConfig) => void
}

// compnent 名字和 Component 实例的映射
export const useComponentMapStore = create<State & Action>(set => ({
  // State
  componentMap: comConfig,
  // Action
  registerComponent: (name, componentMap) =>
    set(state => {
      return {
        ...state,
        componentMap: {
          ...state.componentMap,
          [name]: componentMap,
        },
      }
    }),
}))
