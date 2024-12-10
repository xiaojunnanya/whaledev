import { memo, useEffect, useState } from 'react'
import { ComponentStyleStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { debounce } from 'lodash-es'
import styleToObject from 'style-to-object'
import Editor from '@/components/Editor'
import { Form, Input, Popover, Radio, Slider } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import Container from '@/components/Container'
import InputNumber from './Comp/InputNumber'
import ColorPicker from './Comp/ColorPicker'
import Select from './Comp/Select'

// 遗留的问题：功能问题
export default memo(() => {
  const [form] = Form.useForm()

  const [formData, setFormData] = useState<any>({
    opacity: '1',
  })

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

  const fromChange = () => {
    console.log(form.getFieldsValue(), 'form.getFieldsValue()')
    setFormData(form.getFieldsValue())
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
        <Form
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 16 }}
          form={form}
          onValuesChange={fromChange}
          initialValues={formData}
        >
          <div className="whale-style">
            <div className="whale-right-title">基础</div>
            <Form.Item label="宽度" name="width">
              <InputNumber placeholder="width" />
            </Form.Item>
            <Form.Item label="高度" name="height">
              <InputNumber placeholder="height" />
            </Form.Item>
            {/* 遗留的问题：自定义不同的边距 */}
            <Form.Item label="边距" name="margin">
              <InputNumber placeholder="margin" afterIsObj={false} />
            </Form.Item>
            <Form.Item label="内边距" name="padding">
              <InputNumber placeholder="padding" afterIsObj={false} />
            </Form.Item>
            <Form.Item label="透明度" name="opacity">
              <Slider min={0} max={1} step={0.1} />
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">布局</div>
            <Form.Item label="布局模式" name="display">
              <Select
                placeholder="display"
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
            {['inline-flex', 'flex'].includes(formData?.display) && (
              <>
                <Form.Item name="flexDirection" label="主轴方向">
                  <Select
                    placeholder="flexDirection"
                    options={[
                      {
                        label: '水平 row',
                        value: 'row',
                      },
                      {
                        label: '垂直 column',
                        value: 'column',
                      },
                      {
                        label: '水平反转 row-reverse',
                        value: 'row-reverse',
                      },
                      {
                        label: '垂直反转 column-reverse',
                        value: 'column-reverse',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="justifyContent" label="主轴对齐">
                  <Select
                    placeholder="justifyContent"
                    options={[
                      {
                        label: '起点对齐 flex-start',
                        value: 'flex-start',
                      },
                      {
                        label: '终点对齐 flex-end',
                        value: 'flex-end',
                      },
                      {
                        label: '居中对齐 center',
                        value: 'center',
                      },
                      {
                        label: '两端对齐 space-between',
                        value: 'space-between',
                      },
                      {
                        label: '环绕对齐 space-around',
                        value: 'space-around',
                      },
                      {
                        label: '均匀对齐 space-evenly',
                        value: 'space-evenly',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="alignItems" label="副轴对齐">
                  <Select
                    placeholder="alignItems"
                    options={[
                      {
                        label: '起点对齐 flex-start',
                        value: 'flex-start',
                      },
                      {
                        label: '终点对齐 flex-end',
                        value: 'flex-end',
                      },
                      {
                        label: '居中对齐 center',
                        value: 'center',
                      },
                      {
                        label: '文字基线对齐 baseline',
                        value: 'baseline',
                      },
                      {
                        label: '拉伸对齐 stretch',
                        value: 'stretch',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="flexWrap" label="换行方式">
                  <Radio.Group buttonStyle="solid" optionType="button">
                    <Radio value="nowrap">不换</Radio>
                    <Radio value="wrap">换行</Radio>
                    <Radio value="wrap-reverse">逆换行</Radio>
                  </Radio.Group>
                </Form.Item>
              </>
            )}
          </div>
          <div className="whale-style">
            <div className="whale-right-title">文字</div>
            <Form.Item label="字体大小" name="fontSize">
              <InputNumber placeholder="fontSize" />
            </Form.Item>
            <Form.Item label="行高" name="lineHeight">
              <InputNumber placeholder="lineHeight" />
            </Form.Item>
            <Form.Item label="字体粗细" name="fontWeight">
              <Select
                placeholder="fontWeight"
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
              <ColorPicker />
            </Form.Item>
            <Form.Item label="对齐" name="textAlign">
              <Select
                placeholder="textAlign"
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
            <Form.Item name="backgroundColor" label="颜色">
              <ColorPicker />
            </Form.Item>
            <Form.Item name="backgroundImage" label="图片">
              <Input placeholder="backgroundImage" />
            </Form.Item>
            <Form.Item name="backgroundSize" label="尺寸">
              <InputNumber placeholder="backgroundSize" />
            </Form.Item>
            <Form.Item label="平铺" name="backgroundRepeat">
              <Select
                placeholder="backgroundRepeat"
                options={[
                  {
                    label: '不平铺 no-repeat',
                    value: 'no-repeat',
                  },
                  {
                    label: '平铺 repeat',
                    value: 'repeat',
                  },
                  {
                    label: '水平平铺 repeat-x',
                    value: 'repeat-x',
                  },
                  {
                    label: '垂直平铺 repeat-y',
                    value: 'repeat-y',
                  },
                ]}
              ></Select>
            </Form.Item>
            <Form.Item name="backgroundPosition" label="位置">
              <Select
                placeholder="backgroundPosition"
                options={[
                  {
                    label: 'top',
                    value: 'top',
                  },
                  {
                    label: 'bottom',
                    value: 'bottom',
                  },
                  {
                    label: 'left',
                    value: 'left',
                  },
                  {
                    label: 'right',
                    value: 'right',
                  },
                  {
                    label: 'center',
                    value: 'center',
                  },
                ]}
              ></Select>
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">定位</div>
            <Form.Item name="position" label="定位">
              <Select
                placeholder="position"
                options={[
                  {
                    label: 'static',
                    value: 'static',
                  },
                  {
                    label: 'relative',
                    value: 'relative',
                  },
                  {
                    label: 'absolute',
                    value: 'absolute',
                  },
                  {
                    label: 'fixed',
                    value: 'fixed',
                  },
                  {
                    label: 'sticky',
                    value: 'sticky',
                  },
                ]}
              />
            </Form.Item>
            {/* 遗留的问题：四周的位置 */}
            {/* {!['', undefined, 'static'].includes(formData?.position) && (
              <Form.Item label="位置">
                <Form.Item name={['scopeStyle', 'top']} noStyle>
                  <InputNumber placeholder="T: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'right']} noStyle>
                  <InputNumber placeholder="R: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'bottom']} noStyle>
                  <InputNumber placeholder="B: 10" />
                </Form.Item>
                <Form.Item name={['scopeStyle', 'left']} noStyle>
                  <InputNumber placeholder="L: 10" />
                </Form.Item>
              </Form.Item>
            )} */}
            <Form.Item name="zIndex" label="层级">
              <InputNumber placeholder="zIndex" afterIsObj={false} />
            </Form.Item>
            <Form.Item name="overflow" label="溢出">
              <Select
                placeholder="overflow"
                options={[
                  {
                    label: '默认 auto',
                    value: 'auto',
                  },
                  {
                    label: '可见 visible',
                    value: 'visible',
                  },
                  {
                    label: '超出隐藏 hidden',
                    value: 'hidden',
                  },
                  {
                    label: '超出滚动 scroll',
                    value: 'scroll',
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="whale-style">
            <div className="whale-right-title">边框</div>
            <Form.Item name="borderRadius" label="圆角">
              <InputNumber placeholder="borderRadius" afterIsObj={false} />
            </Form.Item>
            {/* 遗留的问题：边框、阴影 */}
          </div>
        </Form>
      </ComponentStyleStyled>
    </Container>
  )
})
