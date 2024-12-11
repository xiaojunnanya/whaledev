import { Form, FormInstance, Radio } from 'antd'
import { memo } from 'react'
import Select from '../Comp/Select'

interface IProps {
  form: FormInstance
}

export default memo((props: IProps) => {
  const { form } = props

  return (
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
      {['inline-flex', 'flex'].includes(form?.getFieldValue('display')) && (
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
  )
})
