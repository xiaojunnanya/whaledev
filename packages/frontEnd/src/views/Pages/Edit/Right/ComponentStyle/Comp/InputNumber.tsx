import { InputNumber, Select } from 'antd'
import { memo } from 'react'

const addonAfter = (
  <Select
    defaultValue="px"
    options={[
      { label: 'px', value: 'px' },
      { label: '%', value: '%' },
    ]}
  ></Select>
)

interface IProps {
  placeholder: string
  afterIsObj?: boolean
}

export default memo((props: IProps) => {
  const { afterIsObj = true } = props

  return (
    <InputNumber
      {...props}
      style={{ width: '100%' }}
      addonAfter={afterIsObj ? addonAfter : 'px'}
    />
  )
})
