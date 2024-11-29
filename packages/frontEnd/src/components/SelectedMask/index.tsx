import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Popconfirm } from 'antd'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { getComponentById } from '@/utils'
import { Component, useComponetsStore } from '@/stores/components'
import { useGlobal } from '@/stores/global'
import { SelectedMaskStyled } from './style'

interface SelectedMaskProps {
  portalWrapperClassName: string
  containerClassName: string
  componentId: string
}

const SelectedMask = memo(
  ({
    containerClassName,
    portalWrapperClassName,
    componentId,
  }: SelectedMaskProps) => {
    const [position, setPosition] = useState({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      labelTop: 0,
      labelLeft: 0,
    })

    const whaleMask = useRef<HTMLDivElement>(null)

    const {
      components,
      curComponentId,
      deleteComponent,
      setCurComponentId,
      updeteComponentById,
    } = useComponetsStore()
    const { width } = useGlobal()

    useEffect(() => {
      updatePosition()
    }, [componentId, width])

    // 加个延迟，样式变化的时候需要一定的时间获取渲染
    useEffect(() => {
      setTimeout(() => {
        updatePosition()
      }, 100)
    }, [components])

    function updatePosition() {
      if (!componentId) return

      const container = document.querySelector(`.${containerClassName}`)
      if (!container) return

      const node = document.querySelector(
        `[data-component-id="${componentId}"]`,
      )
      if (!node) return

      const { top, left, width, height } = node.getBoundingClientRect()
      const { top: containerTop, left: containerLeft } =
        container.getBoundingClientRect()

      let labelTop = top - containerTop + container.scrollTop
      let labelLeft = left - containerLeft + width

      if (labelTop <= 0) {
        // 除了页面组件，其他组件在最上方的时候，内容展示放在下面
        if (componentId === 'Page_0') {
          labelTop += 20
        } else {
          labelTop += 20 + height
        }
      }

      // 如果组件的长度没有展示内容的长度长，展示内容需要从左开始
      const maskWidth = whaleMask?.current?.offsetWidth || 0

      if (labelLeft < maskWidth) {
        labelLeft = labelLeft + maskWidth - width
      }

      setPosition({
        top: top - containerTop + container.scrollTop,
        left: left - containerLeft + container.scrollTop,
        width,
        height,
        labelTop,
        labelLeft,
      })
    }

    const el = useMemo(() => {
      return document.querySelector(`.${portalWrapperClassName}`)!
    }, [])

    const curComponent = useMemo(() => {
      return getComponentById(componentId, components)
    }, [componentId])

    function handleDelete() {
      deleteComponent(curComponentId!)
      setCurComponentId(null)
    }

    const move = (curComponent: Component, type: 'up' | 'down') => {
      const { parentId } = curComponent
      // 拿到父id取父children
      const parent = getComponentById(parentId!, components)
      const children = parent?.children || []
      if (!children || !parent?.children) return

      const index = children.findIndex(item => item.id === componentId)
      const curIndex = type === 'up' ? index - 1 : index + 1
      const curLen = type === 'up' ? 0 : children.length - 1
      if (index === curLen) return
      ;[children[index], children[curIndex]] = [
        children[curIndex],
        children[index],
      ]
      parent.children = children
      updeteComponentById(parent!.id, parent!)
    }

    return el
      ? createPortal(
          <SelectedMaskStyled>
            <div
              className="whale-mask-container"
              style={{
                position: 'absolute',
                left: position.left,
                top: position.top,
                width: position.width,
                height: position.height,
              }}
            />
            <div
              className="whale-mask"
              style={{
                position: 'absolute',
                left: position.labelLeft,
                top: position.labelTop,
              }}
              ref={whaleMask}
            >
              <div className="whale-mask-desc">{curComponent?.desc}</div>
              {/* 画布不能被选中 */}
              {curComponentId !== 'Page_0' && (
                <>
                  <div className="whale-mask-line">|</div>
                  <div className="whale-mask-icon">
                    <ArrowUpOutlined
                      onClick={() => {
                        move(curComponent!, 'up')
                      }}
                    />
                    <ArrowDownOutlined
                      onClick={() => {
                        move(curComponent!, 'down')
                      }}
                    />
                    <CopyOutlined />
                    <Popconfirm
                      title="确认删除？"
                      okText={'确认'}
                      cancelText={'取消'}
                      onConfirm={handleDelete}
                    >
                      <DeleteOutlined />
                    </Popconfirm>
                  </div>
                </>
              )}
            </div>
          </SelectedMaskStyled>,
          el,
        )
      : null
  },
)

export default SelectedMask
