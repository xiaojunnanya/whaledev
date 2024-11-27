import Editor from '@/components/Editor'
import { useComponetsStore } from '@/stores/components'
import { memo } from 'react'

export default memo(() => {
  const { components } = useComponetsStore()

  return (
    <Editor
      file={{
        name: 'index.json',
        value: JSON.stringify(components, null, 2),
        language: 'json',
      }}
      options={{
        readOnly: true, // 禁用编辑
        domReadOnly: true, // 禁用DOM只读
      }}
      isMount={false}
    ></Editor>
  )
})
