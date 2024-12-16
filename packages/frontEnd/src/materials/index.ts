import { ButtonConfig } from './General/Button/config'
import { ComponentConfig } from './interface'
import { ContainerConfig } from './Layout/Container/config'
import { PageConfig } from './Layout/Page/config'

interface IType {
  [key: string]: ComponentConfig
}

const config: IType = {
  Container: ContainerConfig,
  Button: ButtonConfig,
  Page: PageConfig,
}

export default config
