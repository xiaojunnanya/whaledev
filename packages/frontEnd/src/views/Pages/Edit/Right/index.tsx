import { lazy, memo, useState } from 'react'
import { RightStyled } from './style'
import { Segmented } from 'antd'

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

  return (
    <RightStyled>
      <Segmented
        value={key}
        onChange={setKey}
        block
        options={['属性', '样式', '事件']}
        className="whale-segmented"
      />
      <>{ComponentMap[key]}</>
    </RightStyled>
  )
})
