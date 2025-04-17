import ContainerVh from '@/components/ContainerVh'
import { getPageJsonByPageId } from '@/service/request/page_json'
import { useComponentMapStore } from '@/stores/componentMap'
import { Component, initComponents } from '@/stores/components'
import { handleActionFlow } from '@/utils/actions'
import { Empty } from 'antd'
import { createElement, memo, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface IProps {
  height?: number
}

export default memo((props: IProps) => {
  const { height } = props
  const params = useParams()
  const { page_id = '' } = params
  const { componentMap } = useComponentMapStore()
  const [pageJson, setPageJson] = useState<Component[]>([] as Component[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPageJson()
  }, [page_id])

  const getPageJson = async () => {
    try {
      // 获取页面信息
      const { data } = await getPageJsonByPageId(page_id)
      let pageJson = data?.page_json
      if (!pageJson || pageJson === JSON.stringify(initComponents))
        pageJson = JSON.stringify([])

      setPageJson(JSON.parse(pageJson))
    } catch (_) {
    } finally {
      setLoading(false)
    }
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

  return (
    <>
      <ContainerVh isLoading={loading} height={height ? height : 0}>
        {pageJson.length === 0 ? (
          <Empty description="该页面暂无组件" style={{ marginTop: 100 }} />
        ) : (
          <>{renderComponents(pageJson)}</>
        )}
      </ContainerVh>
    </>
  )
})
