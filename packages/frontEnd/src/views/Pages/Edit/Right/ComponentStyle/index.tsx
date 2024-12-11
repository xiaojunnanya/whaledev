import { memo, useEffect } from 'react'
import { ComponentStyleStyled } from './style'
import { useComponetsStore } from '@/stores/components'
// import { debounce } from 'lodash-es'
// import styleToObject from 'style-to-object'
// import Editor from '@/components/Editor'
import { Form } from 'antd'
// import { QuestionCircleOutlined } from '@ant-design/icons'
import Container from '@/components/Container'
import Base from './Items/Base'
import Layout from './Items/Layout'
import Char from './Items/Char'
import Background from './Items/Background'
import Position from './Items/Position'
import Border from './Items/Border'
import { splitValue } from '@/utils'
// import { camelToHyphen } from '@/utils'

const initStyle = {
  opacity: '1',
  'fontSize-prefix': 'px',
  'height-prefix': 'px',
  'width-prefix': 'px',
  'lineHeight-prefix': 'px',
  'margin-prefix': 'px',
  'padding-prefix': 'px',
  'borderRadius-prefix': 'px',
  'borderWidth-prefix': 'px',
}

// 遗留的问题：功能问题
export default memo(() => {
  const [form] = Form.useForm()

  const { curComponentId, curComponent, updateComponentStyles } =
    useComponetsStore()

  // const [css, setCss] = useState(`.component{\n\n}`)

  useEffect(() => {
    if (!curComponent) return
    form.resetFields()

    let style: any = {}
    if (curComponent?.styles) {
      // 对style进行处理，剥离出单位
      style = { ...curComponent?.styles, ...initStyle }
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
    } else {
      style = { ...initStyle }
    }

    form.setFieldsValue(style)

    // setCss(toCSSStr(curComponent?.styles!))
  }, [curComponent, curComponentId])

  if (!curComponentId || !curComponent) return null

  // function toCSSStr(css: Record<string, any>) {
  //   let str = `.component {\n`
  //   for (let key in css) {
  //     let value = css[key]
  //     if (!value) {
  //       continue
  //     }

  //     str += `\t${camelToHyphen(key)}: ${value};\n`
  //   }
  //   str += `}`
  //   return str
  // }

  // const handleEditorChange = debounce(value => {
  //   setCss(value)

  //   let css: Record<string, any> = {}

  //   try {
  //     const cssStr = value
  //       .replace(/\/\*.*\*\//, '') // 去掉注释 /** */
  //       .replace(/(\.?[^{]+{)/, '') // 去掉 .comp {
  //       .replace('}', '') // 去掉 }

  //     // 将连字符转为驼峰
  //     styleToObject(cssStr, (name, value) => {
  //       css[name.replace(/-\w/, item => item.toUpperCase().replace('-', ''))] =
  //         value
  //     })

  //     updateComponentStyles(curComponentId, { ...css }, true)
  //   } catch (e) {}
  // }, 500)

  const fromChange = () => {
    const data = form.getFieldsValue()

    let newData = { ...data }

    Object.entries(data).forEach(([key, value]) => {
      if (value === null) {
        newData[key] = undefined
      }

      if (key.includes('-prefix') && value) {
        const [name, _] = key.split('-')
        // 添加单位
        if (newData[name]) newData[name] += value
        newData[key] = undefined
      }
    })

    updateComponentStyles(curComponentId, newData)
  }

  return (
    <Container height={132}>
      <ComponentStyleStyled>
        {/* <div className="whale-style">
          <div className="whale-right-title">
            <span>自定义样式</span>
            <Popover
              placement="right"
              content={
                <>
                  <div>
                    1. 自定义样式的优先级最低，设置其他样式会覆盖自定义样式
                  </div>
                </>
              }
            >
              <QuestionCircleOutlined />
            </Popover>
          </div>
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
        </div> */}
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
    </Container>
  )
})
