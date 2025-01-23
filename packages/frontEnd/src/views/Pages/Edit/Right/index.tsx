import { memo } from 'react'
import { RightStyled } from './style'
import { Tabs, TabsProps } from 'antd'
import { useComponetsStore } from '@/stores/components'

import ComponentAttr from './ComponentAttr'
import ComponentStyle from './ComponentStyle'
import ComponentEvent from './ComponentEvent'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '属性',
    children: <ComponentAttr />,
  },
  {
    key: '2',
    label: '样式',
    children: <ComponentStyle />,
  },
  {
    key: '3',
    label: '事件',
    children: <ComponentEvent />,
  },
]

export default memo(() => {
  const { curComponentId } = useComponetsStore()

  return (
    <RightStyled className="edit-right">
      {curComponentId ? (
        <Tabs defaultActiveKey="1" items={items} centered />
      ) : (
        <div className="whale-props-noselect">请在左侧画布选择节点</div>
      )}
    </RightStyled>
  )
})
