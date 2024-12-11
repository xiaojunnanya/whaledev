import { Select } from 'antd'
import { memo } from 'react'

interface IProps {
  placeholder: string
  options: {
    label: string
    value: string | number
  }[]
}

export default memo((props: IProps) => {
  return <Select {...props} allowClear></Select>
})
