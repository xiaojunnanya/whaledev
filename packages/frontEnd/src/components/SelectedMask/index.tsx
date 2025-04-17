import { memo, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Popconfirm } from 'antd'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { getComponentById } from '@/utils/components'
import { PAGEID, useComponetsStore } from '@/stores/components'
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
      curComponent,
      deleteComponent,
      setCurComponentId,
      updeteComponentById,
    } = useComponetsStore()
    const { width } = useGlobal()

    const el = document.querySelector(`.${portalWrapperClassName}`)!

    useEffect(() => {
      if (!componentId) return

      const node = document.querySelector(
        `[data-component-id="${componentId}"]`,
      )
      if (!node) return

      // 立即执行一次位置更新
      updatePosition()

      const observer = new MutationObserver(() => {
        updatePosition()
      })

      observer.observe(node, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['style', 'class'], // 只监听样式和类名变化
      })

      return () => {
        observer.disconnect()
      }
    }, [curComponent, components, componentId, width]) // 添加componentId依赖

    function updatePosition() {
      if (!componentId) return
      const container = document.querySelector(`.${containerClassName}`)
      if (!container) return

      const node = document.querySelector(
        `[data-component-id="${componentId}"]`,
      )
      if (!node) return

      // 组件的信息
      const { top, left, width, height } = node.getBoundingClientRect()
      const { top: containerTop, left: containerLeft } =
        container.getBoundingClientRect()

      let labelTop = top - containerTop + container.scrollTop
      let labelLeft = left - containerLeft + width

      if (labelTop <= 0) {
        // 除了页面组件，其他组件在最上方的时候，内容展示放在下面
        if (componentId === PAGEID) {
          labelTop += 20
        } else {
          labelTop += 20 + height
        }
      }

      const maskWidth = whaleMask?.current?.offsetWidth || 0

      // 如果组件的长度没有展示内容的长度长，展示内容需要从左开始
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

    function handleDelete() {
      deleteComponent(curComponentId!)
      setCurComponentId(null)
    }

    const move = (type: 'up' | 'down') => {
      if (!curComponent) return
      const { parentId = '' } = curComponent
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
              {curComponentId !== PAGEID && (
                <>
                  <div className="whale-mask-line">|</div>
                  <div className="whale-mask-icon">
                    <ArrowUpOutlined
                      onClick={() => {
                        move('up')
                      }}
                    />
                    <ArrowDownOutlined
                      onClick={() => {
                        move('down')
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
