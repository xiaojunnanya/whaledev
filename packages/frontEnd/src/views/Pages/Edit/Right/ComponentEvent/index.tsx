import { memo, useState } from 'react'
import { ComponentEventStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { Button, Collapse, CollapseProps, Drawer } from 'antd'
import {
  CaretRightOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useComponentMapStore } from '@/stores/componentMap'

export default memo(() => {
  const { componentMap } = useComponentMapStore()
  const { curComponent } = useComponetsStore()
  const [open, setOpen] = useState(false)
  if (!curComponent) return null

  const arr = componentMap[curComponent.name].events || []

  if (arr.length === 0)
    return <div className="whale-props-noselect">当前组件暂无事件</div>

  const items: CollapseProps['items'] = arr.map((event, index) => {
    return {
      key: index,
      label: event.label,
      children: (
        <div
          className="addAction"
          onClick={() => {
            setOpen(true)
          }}
        >
          {!event.name ? (
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
  })

  const save = () => {
    setOpen(false)
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
        title="添加服务编排"
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
        {/* <ServiceLayout curEventAction={curEvent?.action}/> */}
      </Drawer>
    </ComponentEventStyled>
  )
})
