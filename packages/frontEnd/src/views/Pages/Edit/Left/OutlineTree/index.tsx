import { memo } from 'react'
import { OutlineTreeStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'

export default memo(() => {
  const { components, setCurComponentId } = useComponetsStore()
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
      />
    </OutlineTreeStyled>
  )
})
