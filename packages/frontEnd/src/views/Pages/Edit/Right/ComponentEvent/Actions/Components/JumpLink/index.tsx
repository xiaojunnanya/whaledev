import { getProjectAndPages } from '@/service/request/project'
import { Form, FormInstance, Input, Radio, TreeSelect } from 'antd'
import { memo, useEffect, useState } from 'react'

interface IProps {
  form: FormInstance
}

const linkTypeOptions = [
  { label: '系统内跳转', value: 'system' },
  { label: '超链接跳转', value: 'alink' },
]

const linkOptions = [
  {
    title: '系统路由',
    children: [
      {
        title: '首页',
        value: '/',
      },
      {
        title: '登录页',
        value: '/login',
      },
      {
        title: '项目列表',
        value: '/engineering/project',
      },
      {
        title: '个人中心',
        value: '/userinfo',
      },
    ],
  },
  {
    title: '项目路由',
    children: [],
  },
]
export default memo((props: IProps) => {
  const { form } = props

  const [type, setType] = useState(form.getFieldValue('jumpLink-type') || '')

  useEffect(() => {
    getList()
  }, [])

  const getList = async () => {
    const { data } = await getProjectAndPages()
    console.log(data)
  }

  const handleChange = (value: string) => {
    setType(value)
    form.setFieldsValue({
      'jumpLink-link': null,
    })
  }

  return (
    <>
      <Form.Item
        label="跳转方式"
        name="jumpLink-type"
        rules={[{ required: true, message: '请选择跳转方式' }]}
      >
        <Radio.Group
          block
          options={linkTypeOptions}
          optionType="button"
          buttonStyle="solid"
          onChange={e => handleChange(e.target.value)}
        />
      </Form.Item>

      {type === 'system' && (
        <Form.Item
          label="跳转地址"
          name="jumpLink-link"
          rules={[{ required: true, message: '请选择跳转地址' }]}
        >
          <TreeSelect
            treeData={linkOptions}
            placeholder="请选择跳转地址"
            treeDefaultExpandAll
          />
        </Form.Item>
      )}

      {type === 'alink' && (
        <Form.Item
          label="跳转链接"
          name="jumpLink-link"
          rules={[{ required: true, message: '请输入跳转链接' }]}
        >
          <Input type="text" placeholder="请输入跳转链接" />
        </Form.Item>
      )}
    </>
  )
})
