import { memo } from 'react'
import { OutlineTreeStyled, TreeTitleStyled } from './style'
import { PAGEID, useComponetsStore } from '@/stores/components'
import { Tree } from 'antd'
import { DeleteOutlined, DownOutlined, EditOutlined } from '@ant-design/icons'

export default memo(() => {
  const { components, setCurComponentId, deleteComponent } = useComponetsStore()

  const handleDelete = (e: any, node: any) => {
    console.log('12', node.id)
    e.stopPropagation()
    deleteComponent(node.id)
    setCurComponentId('')
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
        titleRender={node => {
          return (
            <TreeTitleStyled>
              {/* @ts-ignore */}
              <span>{node?.desc}</span>
              {
                // @ts-ignore
                node?.id !== PAGEID && (
                  <>
                    <EditOutlined />
                    <DeleteOutlined onClick={e => handleDelete(e, node)} />
                  </>
                )
              }
            </TreeTitleStyled>
          )
        }}
      />
    </OutlineTreeStyled>
  )
})
