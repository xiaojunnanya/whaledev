import { memo, useState } from 'react'
import { ComponentEventStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { Button, Collapse, CollapseProps, Drawer, Popover } from 'antd'
import {
  CaretRightOutlined,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons'
import { useComponentMapStore } from '@/stores/componentMap'
import ServiceLayout from './ServiceLayout'
import { ComponentEvent } from '@/materials/interface'

export default memo(() => {
  const { componentMap } = useComponentMapStore()
  const {
    curComponent,
    componentActionList,
    updateComponentEvents,
    setComponentActionList,
  } = useComponetsStore()
  if (!curComponent) return null
  const [curEvent, setCurEvent] = useState<ComponentEvent>({} as ComponentEvent)
  const [open, setOpen] = useState(false)

  const arrGet = curComponent?.events || []
  const arrIn = componentMap[curComponent.name]?.events || []
  // arr2是内置的事件，arr1是接口获取的，arr1存在的时候将arr2过滤掉

  // 将 arr1 中的事件名称存入一个 Set 中，优化查找效率
  const arrGetNames = new Set(arrGet.map(item => item.name))

  // 过滤 arr2 中已存在的事件
  const filteredArrIn = arrIn.filter(itemIn => !arrGetNames.has(itemIn.name))

  const arr = [...arrGet, ...filteredArrIn]

  if (arr.length === 0)
    return <div className="whale-props-noselect">当前组件暂无事件</div>

  const items: CollapseProps['items'] = arr.map(
    (event: ComponentEvent, index: number) => {
      return {
        key: index,
        label: event.label,
        children: (
          <div
            className="addAction"
            onClick={() => {
              setCurEvent(event)
              setOpen(true)
            }}
          >
            {event.action && event.action?.length > 2 ? (
              <>
                <EditOutlined /> 编辑当前服务编排
              </>
            ) : (
              <>
                <PlusOutlined /> 添加服务编排
              </>
            )}
          </div>
        ),
      }
    },
  )

  const save = () => {
    updateComponentEvents(curComponent.id, {
      ...curEvent,
      action: componentActionList,
    })
    setOpen(false)
    setComponentActionList([])
  }

  return (
    <ComponentEventStyled>
      <Collapse
        items={items}
        ghost
        defaultActiveKey={new Array(arr.length).fill(0).map((_, i) => i)}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
      />

      <Drawer
        title={
          <>
            <span style={{ marginRight: '8px' }}>添加服务编排</span>
            <Popover
              placement="right"
              content={
                <>
                  <div>1. 这是第一个</div>
                  <div>2. 这是第二个</div>
                </>
              }
            >
              <QuestionCircleOutlined />
            </Popover>
          </>
        }
        extra={
          <>
            <Button
              type="primary"
              style={{ marginRight: '16px' }}
              onClick={save}
            >
              保存
            </Button>
            <Button onClick={() => setOpen(false)}>取消</Button>
          </>
        }
        placement="top"
        closeIcon={null}
        open={open}
        key="top"
        height="100%"
        destroyOnClose={true}
      >
        <ServiceLayout
          curEventActions={
            curComponent.events?.find(e => e.name === curEvent.name)?.action ||
            []
          }
        />
      </Drawer>
    </ComponentEventStyled>
  )
})
