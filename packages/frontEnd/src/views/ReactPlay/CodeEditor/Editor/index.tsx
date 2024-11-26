import MonacoEditor, {
  EditorProps,
  loader,
  OnMount,
} from '@monaco-editor/react'
import { memo } from 'react'
import { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { createATA } from '../Ata'

export interface EditorFile {
  name: string
  value: string
  language: string
}

interface IProps {
  file: EditorFile
  onChange?: EditorProps['onChange']
  options?: editor.IStandaloneEditorConstructionOptions
}

export default memo((props: IProps) => {
  const { file, onChange, options } = props

  // 解决CDN问题
  loader.config({ monaco })

  const handleEditorMount: OnMount = (editor, monaco) => {
    // 添加了一个快捷键命令，触发时自动格式化文档
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
      editor.getAction('editor.action.formatDocument')?.run()
    })

    // 设置 TypeScript 编译选项
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      esModuleInterop: true,
    })

    // 下载依赖
    const ata = createATA((code, path) => {
      monaco.languages.typescript.typescriptDefaults.addExtraLib(
        code,
        `file://${path}`,
      )
    })

    // 监听编辑器内容变更
    editor.onDidChangeModelContent(() => {
      ata(editor.getValue())
    })

    // 初始化 ata
    ata(editor.getValue())
  }

  return (
    <MonacoEditor
      height={'100%'}
      path={file.name}
      language={file.language}
      onMount={handleEditorMount}
      onChange={onChange}
      value={file.value}
      loading={'依赖构建中...'}
      options={{
        fontSize: 14,
        scrollBeyondLastLine: false,
        minimap: {
          enabled: false,
        },
        // scrollbar: {
        //   verticalScrollbarSize: 6,
        //   horizontalScrollbarSize: 6,
        // },
        ...options,
      }}
    />
  )
})
