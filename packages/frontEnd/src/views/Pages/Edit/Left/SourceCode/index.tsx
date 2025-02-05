import Editor from '@/components/Editor'
import { useComponetsStore } from '@/stores/components'
import { useGlobal } from '@/stores/global'
import { debounce } from 'lodash-es'
import { memo } from 'react'

export default memo(() => {
  const { components, updeteComponent } = useComponetsStore()
  const { setMessage } = useGlobal()

  const handleEditorChange = debounce(value => {
    try {
      updeteComponent(JSON.parse(value))
    } catch (error) {
      // 转json异常
      setMessage({
        type: 'error',
        text: '数据异常，异常原因可查看控制台',
      })
      console.error(error)
    }
  }, 500)

  return (
    <Editor
      file={{
        name: 'index.json',
        value: JSON.stringify(components, null, 2),
        language: 'json',
      }}
      onChange={handleEditorChange}
      isMount={false}
    ></Editor>
  )
})
