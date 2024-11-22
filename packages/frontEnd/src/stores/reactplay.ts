import { fileName2Language } from '@/utils'
import { create } from 'zustand'

export interface File {
  name: string
  value: string
  language: string
}

export interface Files {
  [key: string]: File
}

export interface PlaygroundContext {
  files: Files
  selectedFileName: string
  setSelectedFileName: (fileName: string) => void
  setFiles: (files: Files) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

interface ISate {
  files: Files
  selectedFileName: string
}

interface IAction {
  setSelectedFileName: (fileName: string) => void
  setFiles: (files: Files) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

import importMap from '../views/ReactPlay/Template/import-map.json?raw'
import AppCss from '../views/ReactPlay/Template/App.css?raw'
import App from '../views/ReactPlay/Template/App.tsx?raw'
import main from '../views/ReactPlay/Template/main.tsx?raw'

// app 文件名
export const APP_COMPONENT_FILE_NAME = 'App.tsx'
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'
// css 入口文件
export const APP_CSS_FILE_NAME = 'App.css'

export const initFiles: Files = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  [APP_CSS_FILE_NAME]: {
    name: APP_CSS_FILE_NAME,
    language: fileName2Language(APP_CSS_FILE_NAME),
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
}

export const useReactPlay = create<ISate & IAction>(set => ({
  files: initFiles,
  selectedFileName: 'main.tsx',
  addFile: (name: string) =>
    set(state => {
      return {
        files: {
          ...state.files,
          [name]: {
            name,
            language: fileName2Language(name),
            value: '',
          },
        },
      }
    }),
  removeFile: (name: string) =>
    set(state => {
      const { [name]: _, ...remainingFiles } = state.files
      return { ...state, files: remainingFiles }
    }),
  setSelectedFileName: (selectedFileName: string) => set({ selectedFileName }),
  setFiles: (files: Files) => set({ files }),
  updateFileName: (oldFieldName: string, newFieldName: string) =>
    set(state => {
      if (
        !state.files[oldFieldName] ||
        newFieldName === undefined ||
        newFieldName === null
      )
        return state

      const { [oldFieldName]: value, ...rest } = state.files
      const newFile = {
        [newFieldName]: {
          ...value,
          language: fileName2Language(newFieldName),
          name: newFieldName,
        },
      }

      return {
        files: {
          ...rest,
          ...newFile,
        },
      }
    }),
}))
