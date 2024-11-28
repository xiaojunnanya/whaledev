import { createElement, memo } from 'react'
import type { MouseEventHandler, ReactNode } from 'react'
import { MiddleStyled } from './style'
import { Component, useComponetsStore } from '@/stores/components'
import { useComponentMapStore } from '@/stores/componentMap'
import SelectedMask from '@/components/SelectedMask'

export default memo(() => {
  const { components, setCurComponentId, curComponentId } = useComponetsStore()
  const { componentMap } = useComponentMapStore()

  const renderComponents = (components: Component[]): ReactNode => {
    return components.map((component: Component) => {
      const config = componentMap?.[component.name]

      if (!config?.component.dev) {
        return null
      }

      // createElement，三个参数，type/props/children, type 参数必须是一个有效的 React 组件类型

      // 遗留的问题：style字段undefined，配置的问题
      return createElement(
        config.component.dev,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          author: 'whale',
          ...config.defaultProps, // 将默认值设施上去
          ...component.props,
        },
        renderComponents(component.children || []),
      )
    })
  }

  // 点击选中当前组件
  const handleClick: MouseEventHandler = e => {
    const path = e.nativeEvent.composedPath()

    for (let i = 0; i < path.length; i += 1) {
      const ele = path[i] as HTMLElement

      const componentId = ele.dataset?.componentId
      if (componentId) {
        setCurComponentId(componentId)
        return
      }
    }
  }

  return (
    <MiddleStyled className="whale-edit-area" onClick={handleClick}>
      {renderComponents(components)}

      {curComponentId && (
        <SelectedMask
          portalWrapperClassName="whale-wrapper"
          containerClassName="whale-edit-area"
          componentId={curComponentId}
        />
      )}

      <div className="whale-wrapper"></div>
    </MiddleStyled>
  )
})
