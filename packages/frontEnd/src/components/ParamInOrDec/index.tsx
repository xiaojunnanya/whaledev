import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Col, Form, FormInstance, Input, Row } from 'antd'
import { memo } from 'react'

interface IProps {
  formData: {
    form?: FormInstance
    label: string
    name: string
  }
}

export default memo((props: IProps) => {
  const { formData } = props
  const { label, name } = formData

  return (
    <Form.Item label={label}>
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ name }, index) => (
              <Row
                gutter={[8, 0]}
                style={{
                  marginBottom: fields.length === index + 1 ? 0 : 10,
                  alignItems: 'center',
                }}
                key={`header-${index}`}
              >
                <Col span={10}>
                  <Form.Item name={[name, 'key']} noStyle>
                    <Input placeholder="请输入参数名" />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item name={[name, 'value']} noStyle>
                    <Input placeholder="请输入参数值" />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <PlusOutlined
                    onClick={() => add({ key: '', value: '' })}
                    style={{ marginRight: 10 }}
                  />
                  {index > 0 && (
                    <MinusOutlined
                      onClick={() => {
                        remove(name)
                      }}
                    />
                  )}
                </Col>
              </Row>
            ))}
          </>
        )}
      </Form.List>
    </Form.Item>
  )
})
