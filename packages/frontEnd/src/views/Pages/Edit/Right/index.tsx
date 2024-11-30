import { lazy, memo, useState } from 'react'
import { RightStyled } from './style'
import { Segmented } from 'antd'
import { useComponetsStore } from '@/stores/components'

const ComponentAttr = lazy(() => import('./ComponentAttr'))
const ComponentStyle = lazy(() => import('./ComponentStyle'))
const ComponentEvent = lazy(() => import('./ComponentEvent'))

const ComponentMap: Record<string, JSX.Element> = {
  属性: <ComponentAttr />,
  样式: <ComponentStyle />,
  事件: <ComponentEvent />,
}

export default memo(() => {
  const [key, setKey] = useState<string>('属性')
  const { curComponentId } = useComponetsStore()

  return (
    <RightStyled>
      {curComponentId ? (
        <>
          <Segmented
            value={key}
            onChange={setKey}
            block
            options={['属性', '样式', '事件']}
            className="whale-segmented"
          />
          <>{ComponentMap[key]}</>
        </>
      ) : (
        <div className="whale-props-noselect">请在左侧画布选择节点</div>
      )}
    </RightStyled>
  )
})
