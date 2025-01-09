import { CommonComponentProps } from '@/materials/interface'
import { createElement, memo } from 'react'
import styleLess from './index.module.less'
import { Input } from 'antd'
import { WhaleIcons } from '@/utils/global'

const iconsList: { [key: string]: any } = WhaleIcons

export default memo((props: CommonComponentProps) => {
  const {
    id,
    styles,
    children,
    addonBefore,
    addonAfter,
    prefix,
    suffix,
    ...otherProps
  } = props

  return (
    <div data-component-id={id}>
      <Input
        {...otherProps}
        className={styleLess['whale-input']}
        style={styles}
        addonBefore={addonBefore && createElement(iconsList[addonBefore])}
        addonAfter={addonAfter && createElement(iconsList[addonAfter])}
        prefix={prefix && createElement(iconsList[prefix])}
        suffix={suffix && createElement(iconsList[suffix])}
      />
    </div>
  )
})
