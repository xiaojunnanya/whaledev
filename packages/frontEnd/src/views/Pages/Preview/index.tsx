import { getPageJsonByPageId } from '@/service/request/page_json'
import { useComponentMapStore } from '@/stores/componentMap'
import { Component } from '@/stores/components'
import { createElement, memo, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default memo(() => {
  const params = useParams()
  const { page_id = '' } = params
  const { componentMap } = useComponentMapStore()
  const [pageJson, setPageJson] = useState<Component[]>([] as Component[])

  useEffect(() => {
    getPageJson()
  }, [])

  const getPageJson = async () => {
    // 获取页面信息
    const { data } = await getPageJsonByPageId(page_id)
    if (data?.page_json) {
      setPageJson(JSON.parse(data?.page_json || ''))
    }
  }

  const renderComponents = (components: Component[]): ReactNode => {
    return components.map((component: Component) => {
      const config = componentMap?.[component.name]

      if (!config?.component.prod) {
        return null
      }

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
        },
        renderComponents(component.children || []),
      )
    })
  }

  return <>{renderComponents(pageJson)}</>
})
