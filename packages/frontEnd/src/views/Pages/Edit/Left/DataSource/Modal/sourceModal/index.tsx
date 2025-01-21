import { memo, useState } from 'react'

import { SourceModalStyled } from './style'
import { Button, Form, Steps } from 'antd'
import ContainerVh from '@/components/ContainerVh'
import { debounce } from 'lodash-es'
import UrlInfo from '../StepsContent/urlInfo'
import PreviewData from '../StepsContent/previewData'
import { getDataPreview } from '@/service/request/page_json'

const initValue = {
  name: '',
  method: 'GET',
  url: '',
  params: [{ key: '', value: '' }],
  body: [{ key: '', value: '' }],
  isCors: true,
  'Content-Type': 'application/json',
}

const steps = ['接口设置', '字段映射', '数据预览']

export default memo(() => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current === 0) {
      form.validateFields(['name', 'url']).then(() => {
        console.log(form.getFieldsValue(), '1')
        getDataPreview(form.getFieldsValue())
        setCurrent(current + 1)
      })
    } else {
      setCurrent(current + 1)
    }
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const handleValuesChange = (changedValues: { [key: string]: any }) => {
    if (changedValues.url) {
      // url 发生变化，解析，放到 params 中
      try {
        const url = new URL(changedValues.url)

        const { search, origin, pathname } = url
        const params = Array.from(new URLSearchParams(search).entries()).map(
          ([key, value]) => ({
            key,
            value,
          }),
        )

        if (params.length === 0) {
          form.setFieldValue('params', initValue.params)
        } else {
          form.setFieldValue('params', params)
        }

        form.setFieldValue('url', `${origin}${pathname}`)
      } catch (error) {
        form.setFields([
          {
            name: 'url',
            errors: ['URL输入格式错误，请确保URL正确'],
          },
        ])
      }
    }
  }

  const items = steps.map(item => ({ key: item, title: item }))

  return (
    <SourceModalStyled>
      <Steps current={current} items={items} style={{ marginBottom: 20 }} />
      <ContainerVh height={275}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          initialValues={initValue}
          form={form}
          onValuesChange={debounce(handleValuesChange, 900)}
        >
          {current === 0 && <UrlInfo />}
          {current === 1 && <>loading...</>}
          {current === 2 && <PreviewData />}
        </Form>
      </ContainerVh>
      <div className="operateBtn">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && <Button type="primary">完成</Button>}
      </div>
    </SourceModalStyled>
  )
})
