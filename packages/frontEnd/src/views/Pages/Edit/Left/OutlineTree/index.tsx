import { memo, useState } from 'react'
import { OutlineTreeStyled, TreeTitleStyled } from './style'
import { Component, PAGEID, useComponetsStore } from '@/stores/components'
import { Input, Tree } from 'antd'
import {
  CheckOutlined,
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { removeLastParenthesisContent } from '@/utils'

export default memo(() => {
  const {
    components,
    setCurComponentId,
    deleteComponent,
    updeteComponentById,
  } = useComponetsStore()

  const [isEdit, setIsEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [inputValue, setInputValue] = useState('')

  const handleDelete = (e: any, node: Component) => {
    e.stopPropagation()
    deleteComponent(node.id)
    setCurComponentId('')
  }

  const handleEdit = (e: any, node: Component, type: 'edit' | 'save') => {
    e.stopPropagation()
    setIsEdit(!isEdit)
    const { withoutLastParenthesis, lastParenthesisContent } =
      removeLastParenthesisContent(node.desc)
    if (type === 'edit') {
      setCurComponentId('')
      setEditId(node.id)
      setInputValue(withoutLastParenthesis)
    } else {
      setEditId('')
      if (!inputValue || lastParenthesisContent === inputValue) return
      const obj = {
        ...node,
        desc: `${inputValue}(${lastParenthesisContent})`,
      }
      updeteComponentById(node.id, obj)
    }
  }

  const handleChange = (value: string) => {
    setInputValue(value)
  }

  return (
    <OutlineTreeStyled>
      <Tree
        fieldNames={{ title: 'desc', key: 'id' }}
        treeData={components as any}
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandAll
        onSelect={([selectedKey]) => {
          setCurComponentId(selectedKey as string)
        }}
        // @ts-ignore
        titleRender={(node: Component) => {
          if (node?.id === PAGEID) return node.desc

          return (
            <TreeTitleStyled>
              {isEdit && node.id === editId ? (
                <>
                  <Input
                    value={inputValue}
                    size="small"
                    style={{ width: 100 }}
                    onChange={e => handleChange(e.target.value)}
                  />
                  <CheckOutlined onClick={e => handleEdit(e, node, 'save')} />
                </>
              ) : (
                <>
                  <span>{node.desc}</span>
                  <EditOutlined onClick={e => handleEdit(e, node, 'edit')} />
                </>
              )}

              <DeleteOutlined onClick={e => handleDelete(e, node)} />
            </TreeTitleStyled>
          )
        }}
      />
    </OutlineTreeStyled>
  )
})
