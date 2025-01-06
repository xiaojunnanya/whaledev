## 注意

1. prod 相比于 dev 少了 data-component-id={id}/ref={drop}
2. 要写组件开发规范
3. 了解所有 props 的参数：一定有 key/id/name/styles/author/children
4.  page/Container 需要添加基础配置



## 组件开发

### dev.tsx

```tsx
import { CommonComponentProps } from '@/materials/interface'
import { memo } from 'react'
import styleLess from './index.module.less'

export default memo((props: CommonComponentProps) => {
  const { id, styles, ...otherProps } = props

  return (
    <div
      {...otherProps}
      className={styleLess['whale-input']}
      style={styles}
      data-component-id={id}
    >
      dev
    </div>
  )
})
```



### prod.tsx

```tsx
import { CommonComponentProps } from '@/materials/interface'
import { memo } from 'react'
import styleLess from './index.module.less'

export default memo((props: CommonComponentProps) => {
  const { styles, ...otherProps } = props

  return (
    <div
      {...otherProps}
      className={styleLess['whale-input']}
      style={styles}
    >
      prod
    </div>
  )
})
```



### index.module.less

```less
.whale-input{}
```



### config.ts

```ts
import { ComponentConfig } from '@/materials/interface'
import dev from './dev'
import prod from './prod'

export const DividerConfig: ComponentConfig = {
  firstTitle: '基础组件',
  secondaryTitle: '数据录入',
  name: 'Input',
  defaultProps: {},
  desc: '输入框',
  component: {
    dev: dev,
    prod: prod,
  },
  setter: [
    {
      title: '输入框属性',
      propsList: [],
    },
  ],
}
```

