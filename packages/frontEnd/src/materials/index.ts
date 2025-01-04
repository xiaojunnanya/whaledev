import { ComponentConfig } from './interface'

import { ButtonConfig } from './Basic/General/Button/config'

import { ContainerConfig } from './Basic/Layout/Container/config'
import { PageConfig } from './Basic/Layout/Page/config'
import { DividerConfig } from './Basic/Layout/Divider/config'

interface IType {
  [key: string]: ComponentConfig
}

const config: IType = {
  Container: ContainerConfig,
  Button: ButtonConfig,
  Page: PageConfig,
  Divider: DividerConfig,
}

export default config
