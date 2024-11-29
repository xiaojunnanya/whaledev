import { memo, useEffect } from 'react'
import { ComponentAttrStyled } from './style'
import { useComponetsStore } from '@/stores/components'
import { Form, Input } from 'antd'
import { ComponentConfig } from '@/materials/interface'
import { useComponentMapStore } from '@/stores/componentMap'
import RenderFormEle from '@/components/renderFormEle'
export default memo(() => {
  const [form] = Form.useForm()

  const { curComponentId, curComponent, updateComponentProps } =
    useComponetsStore()
  const { componentMap } = useComponentMapStore()

  useEffect(() => {
    const data = form.getFieldsValue()
    form.setFieldsValue({ ...data, ...curComponent?.props })
  }, [curComponent])

  if (!curComponentId || !curComponent) return null

  const valueChange = (changeValues: ComponentConfig) => {
    if (curComponentId) {
      updateComponentProps(curComponentId, changeValues)
    }
  }

  return (
    <ComponentAttrStyled>
      <Form
        form={form}
        onValuesChange={valueChange}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 16 }}
      >
        <div className="whale-attr">
          <div className="whale-attr-title">基础</div>
          <Form.Item label="组件ID">
            <Input value={curComponent.id} disabled />
          </Form.Item>
          <Form.Item label="组件名称">
            <Input value={curComponent.name} disabled />
          </Form.Item>
          <Form.Item label="组件描述">
            <Input value={curComponent.desc} disabled />
          </Form.Item>
        </div>

        {componentMap[curComponent.name]?.setter?.map((item, index) => {
          return (
            <div className="whale-attr" key={index}>
              <div className="whale-attr-title">{item.title}</div>
              {item.propsList.map(setter => {
                return <RenderFormEle setting={setter} />
              })}
            </div>
          )
        })}
      </Form>
    </ComponentAttrStyled>
  )
})
