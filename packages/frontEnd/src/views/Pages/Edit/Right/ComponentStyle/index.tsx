import { memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'
import Editor from '@/components/Editor'
import { Form } from 'antd'
import ContainerVh from '@/components/ContainerVh'
import Base from './Items/Base'
import Layout from './Items/Layout'
import Char from './Items/Char'
import Background from './Items/Background'
import Position from './Items/Position'
import Border from './Items/Border'
import { splitValue } from '@/utils'
import { camelToHyphen } from '@/utils'

const initStyle = {
  'fontSize-prefix': 'px',
  'height-prefix': 'px',
  'width-prefix': 'px',
  'lineHeight-prefix': 'px',
  'margin-prefix': 'px',
  'padding-prefix': 'px',
  'borderRadius-prefix': 'px',
  'borderWidth-prefix': 'px',
}

export default memo(() => {
  const [form] = Form.useForm()

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore()

  const [css, setCss] = useState(`.component{\n\n}`)

  useEffect(() => {
    if (!curComponent) return
    form.resetFields()

    let style: any = {}
    if (curComponent?.styles) {
      // 对style进行处理，剥离出单位
      style = { ...curComponent?.styles, ...initStyle }
      style = splitStyle(style)
    } else {
      style = { ...initStyle }
    }

    form.setFieldsValue(style)

    setCss(toCSSStr(curComponent?.styles!))
  }, [curComponent])

  if (!curComponentId || !curComponent) return null

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

      form.setFieldsValue(splitStyle({ ...css, ...initStyle }))
      updateComponentStyles(curComponentId, { ...css }, true)
    } catch (e) {}
  }, 500)

  const fromChange = debounce(() => {
    const data = form.getFieldsValue()

    let newData = { ...data }

    // 对所有输入的数据进行一层处理
    Object.entries(data).forEach(([key, value]: [string, any]) => {
      if (value === null) {
        newData[key] = undefined
      }

      // 将单位与数据结合
      if (key.includes('-prefix') && value) {
        const [name, _] = key.split('-')
        // 单位数据结合
        if (newData[name]) newData[name] += value
        // 单位置空，在后续清楚
        newData[key] = undefined
      }

      // 处理color
      if (key.toLowerCase().includes('color') && value) {
        const metaColor = value?.metaColor
        if (!metaColor) return
        const { r, g, b, a } = metaColor

        newData[key] = `rgba(${r},${g},${b},${a})`
      }

      // 删除不存在的数据
      if (newData[key] === undefined) {
        delete newData[key]
      }
    })

    handleEditorChange(toCSSStr(newData))
    updateComponentStyles(curComponentId, newData)
  }, 500)

  return (
    <ContainerVh height={135}>
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
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onValuesChange={fromChange}
          key={curComponentId}
        >
          {/* 基础 */}
          <Base />
          {/* 布局 */}
          <Layout form={form} />
          {/* 文字 */}
          <Char />
          {/* 背景 */}
          <Background />
          {/* 位置 */}
          <Position />
          {/* 边框 */}
          <Border />
        </Form>
      </ComponentStyleStyled>
    </ContainerVh>
  )
})

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

// 对style进行处理，剥离出单位
function splitStyle(obj: any) {
  const style = { ...obj }
  Object.entries(style).forEach(([key, _]) => {
    if (key.includes('-prefix')) {
      const [n, _] = key.split('-')
      const value = splitValue(style[n])
      if (!value) return
      const { number, unit } = value
      style[n] = number
      style[key] = unit
    }
  })

  return style
}
