import { memo, useEffect, useRef, useState } from 'react'
import { FileNameItemStyled } from './style'
import { Popconfirm } from 'antd'

export interface IProps {
  value: string
  actived: boolean
  creating: boolean
  onEditComplete: (name: string) => void
  onClick: () => void
  onRemove: () => void
  readonly: Boolean
}

export default memo((props: IProps) => {
  const {
    value,
    actived = false,
    onClick,
    onEditComplete,
    creating,
    onRemove,
    readonly,
  } = props
  const [name, setName] = useState(value)
  const [editing, setEditing] = useState(creating)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (creating) {
      inputRef?.current?.focus()
    }
  }, [creating])

  const handleDoubleClick = () => {
    setEditing(true)
    setTimeout(() => {
      inputRef?.current?.focus()
    }, 0)
  }

  const hanldeInputBlur = () => {
    setEditing(false)
    onEditComplete(name)
  }

  return (
    <FileNameItemStyled
      className={`tab-item ${actived ? 'actived' : ''}`}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          className="tabs-item-input"
          value={name}
          onBlur={hanldeInputBlur}
          onChange={e => setName(e.target.value)}
        />
      ) : (
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <Popconfirm
              title="确认删除该文件吗？"
              okText="确定"
              cancelText="取消"
              onConfirm={e => {
                e?.stopPropagation()
                onRemove()
              }}
            >
              <span style={{ marginLeft: 5, display: 'flex' }}>
                <svg width="12" height="12" viewBox="0 0 24 24">
                  <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                  <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </span>
            </Popconfirm>
          ) : null}
        </>
      )}
    </FileNameItemStyled>
  )
})
