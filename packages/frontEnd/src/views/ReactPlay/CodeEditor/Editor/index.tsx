import Editor, { loader, OnMount } from '@monaco-editor/react'
import type { EditorProps } from '@monaco-editor/react'
import { memo, useEffect } from 'react'
import { editor } from 'monaco-editor'
import * as monaco from 'monaco-editor'
import { createATA } from '../Ata'

// 解决CDN问题
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  },
}
loader.config({ monaco })

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

  // 初始化 Monaco 编辑器
  useEffect(() => {
    loader.init()

    return () => {
      // 在组件卸载时清理 Monaco 编辑器
      if (typeof monaco !== 'undefined') {
        editor.getModels().forEach(model => {
          model.dispose() // 销毁编辑器模型
        })
      }
      // 如果有额外的库加载（如在 TypeScript 中添加 extraLib），你也可以在这里清除它们
      monaco.languages.typescript.typescriptDefaults.setExtraLibs([])
    }
  }, [])

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
    <Editor
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
