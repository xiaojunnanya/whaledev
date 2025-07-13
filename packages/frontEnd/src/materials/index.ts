import { ComponentConfig } from './interface'

// 自动导入所有组件配置
const componentConfigs = import.meta.glob('./Basic/**/config.ts', {
  eager: true,
})

interface IType {
  [key: string]: ComponentConfig
}

const config: IType = {}

// 自动处理导入的配置
Object.entries(componentConfigs).forEach(([path, module]) => {
  try {
    // 从路径中提取组件名称
    // 例如: './Basic/Layout/Container/config.ts' -> 'Container'
    const pathParts = path.split('/')
    const componentName = pathParts[pathParts.length - 2] // 获取倒数第二个部分作为组件名

    // 获取配置对象
    // 优先查找命名导出（如 ButtonConfig, ContainerConfig）
    const configKey = `${componentName}Config`
    const componentConfig =
      (module as any)[configKey] ||
      (module as any).default ||
      Object.values(module as any)[0]

    if (componentConfig) {
      config[componentName] = componentConfig
    }
  } catch (error) {
    console.warn(`导入组件配置失败: ${path}`, error)
  }
})

export default config
