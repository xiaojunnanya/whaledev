import { transform } from '@babel/standalone'
import { PluginObj } from '@babel/core'
import { ENTRY_FILE_NAME, Files, File } from '@/stores/reactplay'

export const beforeTransformCode = (filename: string, code: string) => {
  let _code = code
  const regexReact = /import\s+React/g

  // 如果文件名以 .jsx 或 .tsx 结尾，并且代码中没有包含 import React，则导入
  if (
    (filename.endsWith('.jsx') || filename.endsWith('.tsx')) &&
    !regexReact.test(code)
  ) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

// 遗留的问题：可以作为难点纪录 web worker 优化
// https://vitejs.cn/vite3-cn/guide/features.html#web-workers
export const babelTransform = (
  filename: string,
  code: string,
  files: Files,
) => {
  let _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    // 使用 Babel 转换代码
    result = transform(_code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true, // 保留源代码的行号
    }).code!
  } catch (e) {
    console.error('编译出错', e)
  }
  return result
}

const getModuleFile = (files: Files, modulePath: string) => {
  let moduleName = modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files)
      .filter(key => {
        return (
          key.endsWith('.ts') ||
          key.endsWith('.tsx') ||
          key.endsWith('.js') ||
          key.endsWith('.jsx')
        )
      })
      .find(key => {
        return key.split('.').includes(moduleName)
      })
    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  return files[moduleName]
}

const json2Js = (file: File) => {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

const css2Js = (file: File) => {
  const randomId = new Date().getTime()
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
    `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

// 用于解析文件依赖，特别是处理 CSS 和 JSON 文件，返回动态生成的 Blob URL
// 会处理所有的 import 语句，特别是对于 .css 和 .json 文件，将它们转换为动态加载的 JavaScript 模块
function customResolver(files: Files): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if (!file) return

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          } else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          } else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript',
              }),
            )
          }
        }
      },
    },
  }
}

export const compile = (files: Files) => {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}

self.addEventListener('message', async ({ data }) => {
  try {
    self.postMessage({
      type: 'COMPILED_CODE',
      data: compile(data),
    })
  } catch (e) {
    self.postMessage({ type: 'ERROR', error: e })
  }
})
