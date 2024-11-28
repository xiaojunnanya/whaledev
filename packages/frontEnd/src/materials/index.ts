import { ButtonConfig } from './Button/config'
import { ContainerConfig } from './Container/config'
import { ComponentConfig } from './interface'
import { PageConfig } from './Page/config'

interface IType {
  [key: string]: ComponentConfig
}

const config: IType = {
  Container: ContainerConfig,
  Button: ButtonConfig,
  Page: PageConfig,
}

export default config
