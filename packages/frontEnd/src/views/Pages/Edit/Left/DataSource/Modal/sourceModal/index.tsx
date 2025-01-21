import { memo, useState } from 'react'

import { SourceModalStyled } from './style'
import { Button, Form, Steps } from 'antd'
import ContainerVh from '@/components/ContainerVh'
import { debounce } from 'lodash-es'
import UrlInfo from '../StepsContent/urlInfo'
import PreviewData from '../StepsContent/previewData'
import { getDataPreview } from '@/service/request/page_json'
import ReturnRes from '../StepsContent/returnRes'

type paramsType = {
  key: string
  value: any
}

interface initValueType {
  name: string
  method: string
  url: string
  params: paramsType[]
  body: paramsType[]
  isCors: boolean
  'Content-Type': string
}

const initKeyValue = [{ key: '', value: '' }]

const initValue: initValueType = {
  name: '',
  method: 'GET',
  url: '',
  params: initKeyValue,
  body: initKeyValue,
  isCors: true,
  'Content-Type': 'application/json',
}

const steps = ['接口设置', '返回结构', '数据预览']

export default memo(() => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current === 0) {
      form.validateFields(['name', 'url']).then(() => {
        // 对parsma key/value 进行处理，value可以为空，key不能为空
        const data: initValueType = form.getFieldsValue()
        const { params, body } = data

        const paramsFilter = params.filter(item => item.key !== '')
        const bodyFilter = body.filter(item => item.key !== '')

        const newParams =
          paramsFilter.length === 0 ? initKeyValue : paramsFilter
        const newBody = bodyFilter.length === 0 ? initKeyValue : bodyFilter

        form.setFieldValue('params', newParams)
        form.setFieldValue('body', newBody)

        setCurrent(current + 1)

        getDataPreview({
          ...data,
          params: newParams,
          body: newBody,
        })
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
          {current === 1 && <ReturnRes />}
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
