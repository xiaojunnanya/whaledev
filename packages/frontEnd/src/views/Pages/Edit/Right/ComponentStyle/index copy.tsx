import { CSSProperties, memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { Form } from 'antd'
import { useComponetsStore } from '@/stores/components'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'
import { useComponentMapStore } from '@/stores/componentMap'
import Editor from '@/components/Editor'
import RenderFormEle from '@/components/renderFormEle'

// 遗留的问题：功能问题
export default memo(() => {
  const [form] = Form.useForm()

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore()
  const { componentMap } = useComponentMapStore()

  const [css, setCss] = useState(`.component{\n\n}`)

  useEffect(() => {
    if (!curComponent) return
    form.resetFields()
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...curComponent?.styles })

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
      // 这里做了样式的合并，取到高度和宽度的数值加上px
      if (
        ['width', 'height'].includes(key) &&
        !value.toString().endsWith('px')
      ) {
        value += 'px'
      }

      str += `\t${key}: ${value};\n`
    }
    str += `}`
    return str
  }

  function valueChange(changeValues: CSSProperties) {
    // 遗留的问题：宽高px的问题，这里没有处理
    if (curComponentId) {
      updateComponentStyles(curComponentId, changeValues)
    }
  }
  // 遗留的问题：处理好自定义样式与填写样式的优先级
  const handleEditorChange = debounce(value => {
    setCss(value)

    let css: Record<string, any> = {}

    try {
      const cssStr = value
        .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
        .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
        .replace('}', '') // 去掉 }

      styleToObject(cssStr, (name, value) => {
        css[name.replace(/-\w/, item => item.toUpperCase().replace('-', ''))] =
          value
      })

      updateComponentStyles(
        curComponentId,
        { ...form.getFieldsValue(), ...css },
        true,
      )
    } catch (e) {}
  }, 500)

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

      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
      >
        {componentMap[curComponent.name]?.stylesSetter?.map((item, index) => {
          return (
            <div className="whale-style" key={index}>
              <div className="whale-right-title">{item.title}</div>
              {item.styleList.map(style => {
                return <RenderFormEle setting={style} key={style.name} />
              })}
            </div>
          )
        })}
      </Form>
    </ComponentStyleStyled>
  )
})
