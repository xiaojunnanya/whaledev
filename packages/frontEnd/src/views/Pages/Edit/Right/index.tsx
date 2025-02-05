import { lazy, memo, Suspense } from 'react'
import { RightStyled } from './style'
import { Tabs, TabsProps } from 'antd'
import { useComponetsStore } from '@/stores/components'

const ComponentAttr = lazy(() => import('./ComponentAttr'))
const ComponentStyle = lazy(() => import('./ComponentStyle'))
const ComponentEvent = lazy(() => import('./ComponentEvent'))
import Loading from '@/components/Loading'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '属性',
    children: (
      <Suspense fallback={<Loading />}>
        <ComponentAttr />
      </Suspense>
    ),
  },
  {
    key: '2',
    label: '样式',
    children: (
      <Suspense fallback={<Loading />}>
        <ComponentStyle />
      </Suspense>
    ),
  },
  {
    key: '3',
    label: '事件',
    children: (
      <Suspense fallback={<Loading />}>
        <ComponentEvent />
      </Suspense>
    ),
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
