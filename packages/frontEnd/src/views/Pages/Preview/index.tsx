import { getPageJsonByPageId } from '@/service/request/page_json'
import { useComponentMapStore } from '@/stores/componentMap'
import { Component, initComponents } from '@/stores/components'
import { handleActionFlow } from '@/utils/actions'
import { Empty } from 'antd'
import {
  createElement,
  memo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'react-router-dom'
import { StyleProvider } from '@ant-design/cssinjs'

// 导入需要的样式
import resetStyle from '@/assets/css/reset.css?raw'
import antdResetStyle from '@/assets/css/antd-reset.css?raw'

export default memo(() => {
  const params = useParams()
  const { page_id = '' } = params
  const { componentMap } = useComponentMapStore()
  const [pageJson, setPageJson] = useState<Component[]>([] as Component[])
  const shadowDivRef = useRef<HTMLDivElement | null>(null)
  const shadowRootRef = useRef<ShadowRoot | null>(null)

  useEffect(() => {
    getPageJson()
  }, [page_id])

  useEffect(() => {
    if (shadowDivRef.current && !shadowRootRef.current) {
      // 创建Shadow DOM并保存引用
      shadowRootRef.current = shadowDivRef.current.attachShadow({
        mode: 'open',
      })

      const headElement = document.createElement('head')
      shadowRootRef.current.appendChild(headElement)

      // 创建样式元素，用于注入全局样式
      const styleElement = document.createElement('style')

      // 将所有样式合并到一起
      styleElement.textContent = `
        ${resetStyle}
        ${antdResetStyle}
        
        /* 其他自定义样式 */
        body{
          height: 100%;
          overflow: auto;
        }
      `

      headElement.appendChild(styleElement)

      // 创建一个容器来放置渲染的组件
      const containerElement = document.createElement('body')
      shadowRootRef.current.appendChild(containerElement)
    }
  }, [])

  const getPageJson = async () => {
    try {
      // 获取页面信息
      const { data } = await getPageJsonByPageId(page_id)
      let pageJson = data?.page_json
      if (!pageJson || pageJson === JSON.stringify(initComponents))
        pageJson = JSON.stringify([])

      setPageJson(JSON.parse(pageJson))
    } catch (_) {}
  }

  const handleEvent = (component: Component) => {
    const props: Record<string, any> = {}
    const events = component?.events || []
    // 一个组件可能会有多个事件，遍历事件
    events.forEach(event => {
      const actions = event?.action || []
      if (actions.length <= 2) return

      props[event.name] = () => {
        // 执行事件
        handleActionFlow(actions)
      }
    })

    return props
  }

  const renderComponents = (components: Component[]): ReactNode => {
    if (components.length === 0) return null
    return components.map((component: Component) => {
      const config = componentMap?.[component.name]

      if (!config?.component.prod) {
        return null
      }
      // handleEvent(component)
      return createElement(
        config.component.prod,
        {
          key: component.id,
          id: component.id,
          name: component.name,
          styles: component.styles,
          author: 'whale',
          ...config.defaultProps,
          ...component.props,
          ...handleEvent(component),
        },
        renderComponents(component.children || []),
      )
    })
  }

  // 使用createPortal将组件渲染到Shadow DOM中
  const renderShadowContent = () => {
    if (!shadowRootRef.current) return null

    const container = shadowRootRef.current.querySelector('body')
    if (!container) return null

    return createPortal(
      <StyleProvider
        // 将style 标签注册到head中
        container={shadowRootRef.current.querySelector('head')!}
      >
        {pageJson.length === 0 ? (
          <Empty description="该页面暂无组件" style={{ marginTop: 100 }} />
        ) : (
          <>{renderComponents(pageJson)}</>
        )}
      </StyleProvider>,
      container,
    )
  }

  return (
    <div
      ref={shadowDivRef}
      className="whale-shadow"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {shadowRootRef.current && renderShadowContent()}
    </div>
  )
})
