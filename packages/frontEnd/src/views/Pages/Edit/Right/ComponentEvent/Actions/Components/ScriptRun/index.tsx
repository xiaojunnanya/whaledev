import Editor from '@/components/Editor'
import { memo } from 'react'
import { ScriptRunStyled } from './style'

// interface IProps {}

export default memo(() => {
  return (
    <ScriptRunStyled>
      <Editor
        file={{
          name: 'script.js',
          value: `function run(){}`,
          language: 'javascript',
        }}
        isMount={false}
      ></Editor>
    </ScriptRunStyled>
  )
})
