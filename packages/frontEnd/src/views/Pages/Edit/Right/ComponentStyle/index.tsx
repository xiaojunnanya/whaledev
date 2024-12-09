import { memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'
import Editor from '@/components/Editor'
import { ColorPicker, Form, InputNumber, Popover, Select, Slider } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Container from '@/components/Container'

const addonAfter = (
  <Select
    defaultValue="px"
    options={[
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ]}
  ></Select>
)

// 遗留的问题：功能问题
export default memo(() => {
  const [form] = Form.useForm()
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
    <Container height={132}>
      <ComponentStyleStyled>
        <div className="whale-style">
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
        </div>
        <Form labelCol={{ span: 7 }} wrapperCol={{ span: 16 }} form={form}>
          <div className="whale-style">
            <div className="whale-right-title">基础</div>
            <Form.Item label="宽度" name="width">
              <InputNumber placeholder="width" addonAfter={addonAfter} />
            </Form.Item>
            <Form.Item label="高度" name="height">
              <InputNumber placeholder="height" addonAfter={addonAfter} />
            </Form.Item>
            <Form.Item label="边距" name="margin">
              <InputNumber placeholder="margin" addonAfter="px" />
            </Form.Item>
            <Form.Item label="内边距" name="padding">
              <InputNumber placeholder="padding" addonAfter="px" />
            </Form.Item>
            <Form.Item label="透明度" name="opacity">
              <Slider min={0} max={1} step={0.1} defaultValue={1} />
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">布局</div>
            <Form.Item label="布局模式" name="display">
              {/* 遗留的问题：根据不同布局展示不同的东西 */}
              <Select
                placeholder="display"
                allowClear
                options={[
                  {
                    value: 'block',
                    label: '块级布局 block',
                  },
                  {
                    value: 'inline',
                    label: '内联布局 inline',
                  },
                  {
                    value: 'inline-block',
                    label: '内联快布局 inline-block',
                  },
                  {
                    value: 'flex',
                    label: '弹性布局 flex',
                  },
                  {
                    value: 'grid',
                    label: '网格布局 grid',
                  },
                  {
                    value: 'none',
                    label: '隐藏 none',
                  },
                ]}
              ></Select>
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">文字</div>
            <Form.Item label="字体大小" name="fontSize">
              <InputNumber placeholder="fontSize" addonAfter={addonAfter} />
            </Form.Item>
            <Form.Item label="行高" name="lineHeight">
              <InputNumber placeholder="lineHeight" addonAfter={addonAfter} />
            </Form.Item>
            <Form.Item label="字体粗细" name="fontWeight">
              <Select
                placeholder="fontWeight"
                allowClear
                options={[
                  {
                    value: 100,
                    label: '100 Thin',
                  },
                  {
                    value: 200,
                    label: '200 Extra Light',
                  },
                  {
                    value: 300,
                    label: '300 Light',
                  },

                  {
                    value: 400,
                    label: '400 Normal',
                  },
                  {
                    value: 500,
                    label: '500 Medium',
                  },
                  {
                    value: 600,
                    label: '600 Semi Bold',
                  },
                  {
                    value: 700,
                    label: '700 Bold',
                  },
                  {
                    value: 800,
                    label: '800 Extra Bold',
                  },
                  {
                    value: 900,
                    label: '900 Black Bold',
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item name="color" label="颜色">
              {/* 遗留的问题：预设颜色 */}
              <ColorPicker showText allowClear arrow={false} />
            </Form.Item>
            <Form.Item label="对齐" name="textAlign">
              <Select
                placeholder="textAlign"
                allowClear
                options={[
                  {
                    value: 'left',
                    label: '左对齐 left',
                  },
                  {
                    value: 'center',
                    label: '居中对齐 center',
                  },
                  {
                    value: 'right',
                    label: '右对齐 right',
                  },
                ]}
              ></Select>
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">背景</div>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">定位</div>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">边框</div>
          </div>
        </Form>
      </ComponentStyleStyled>
    </Container>
  )
})
