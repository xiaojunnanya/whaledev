import { memo, useMemo, useState } from 'react'
import { ComponentLibraryStyled } from './style'
import { MaterialItem } from '@/components/MaterialItem'
import { Collapse, CollapseProps, Input, Tabs, TabsProps } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { debounce } from 'lodash-es'
import { useComponentMapStore } from '@/stores/componentMap'
import Container from '@/components/ContainerVh'

export default memo(() => {
  const [inputValue, setInputValue] = useState('')
  const { componentMap } = useComponentMapStore()

  // 按照类型分类
  const groupByTitle = (items: any[], groupKey: string) => {
    const groupedArr: any[] = []
    const titleSet: Set<string> = new Set()

    if (inputValue)
      items = items.filter(
        item =>
          item.desc.includes(inputValue) ||
          item.name.toLowerCase().includes(inputValue.toLowerCase()),
      )

    items.forEach(item => {
      const label = item[groupKey]

      if (!titleSet.has(label)) {
        titleSet.add(label)
        groupedArr.push({
          label,
          children: [item],
        })
      } else {
        const group = groupedArr.find(groupItem => groupItem.label === label)
        group?.children.push(item)
      }
    })

    return groupedArr
  }

  const components = useMemo(() => {
    let childArr = groupByTitle(
      Object.values(componentMap).filter(item => item.name !== 'Page'),
      'firstTitle',
    )
    childArr.forEach(item => {
      item.children = groupByTitle(item.children, 'secondaryTitle')
    })

    return childArr
  }, [componentMap, inputValue])

  const handleChange = debounce((value: string) => {
    setInputValue(value)
  }, 500)

  const collapseItems = (data: any): CollapseProps['items'] => {
    return data.map((item: any, index: number) => {
      return {
        key: index,
        label: item.label,
        children: item.children.map((childItem: any, childIndex: number) => {
          return (
            <MaterialItem
              key={childItem.name + childIndex}
              name={childItem.name}
              desc={childItem.desc}
            ></MaterialItem>
          )
        }),
      }
    })
  }

  const tabsItems: TabsProps['items'] = useMemo(() => {
    return components.map((comItem, index) => {
      return {
        key: comItem.label,
        label: comItem.label,
        children: (
          <Container height={216} key={index}>
            <Collapse
              ghost
              defaultActiveKey={new Array(comItem.children.length)
                .fill(0)
                .map((_, i) => i)}
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              items={collapseItems(comItem.children)}
            ></Collapse>
          </Container>
        ),
      }
    })
  }, [components])

  return (
    <ComponentLibraryStyled className="edit-compoennt-library">
      <div className="search-input">
        <Input
          placeholder="搜索组件"
          allowClear
          size="small"
          onChange={e => {
            handleChange(e.target.value)
          }}
        />
      </div>
      <Tabs centered items={tabsItems}></Tabs>
    </ComponentLibraryStyled>
  )
})
