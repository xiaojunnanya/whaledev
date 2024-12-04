import { memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'
import Editor from '@/components/Editor'

// 遗留的问题：功能问题
export default memo(() => {
  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore()

  const [css, setCss] = useState(`.component{\n\n}`)

  useEffect(() => {
    if (!curComponent) return
    setCss(toCSSStr(curComponent?.styles!))
  }, [curComponent])

  if (!curComponentId || !curComponent) return null

  function toCSSStr(css: Record<string, any>) {
    let str = `.component {\n`
    for (let key in css) {
      let value = css[key]
      if (!value) {
        continue
      }

      str += `\t${camelToHyphen(key)}: ${value};\n`
    }
    str += `}`
    return str
  }

  const handleEditorChange = debounce(value => {
    setCss(value)

    let css: Record<string, any> = {}

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', '') // 去掉 }

      // 将连字符转为驼峰
      styleToObject(cssStr, (name, value) => {
        css[name.replace(/-\w/, item => item.toUpperCase().replace('-', ''))] =
          value
      })

      updateComponentStyles(curComponentId, { ...css }, true)
    } catch (e) {}
  }, 500)

  // 将驼峰转为连字符
  const camelToHyphen = (key: any) => {
    return key.replace(/([A-Z])/g, '-$1').toLowerCase()
  }

  return (
    <ComponentStyleStyled>
      <div className="whale-style">
        <div className="whale-right-title">自定义样式</div>
        <div className="whale-style-csseditor">
          <Editor
            file={{
              name: 'style.css',
              value: css,
              language: 'css',
            }}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </ComponentStyleStyled>
  )
})
