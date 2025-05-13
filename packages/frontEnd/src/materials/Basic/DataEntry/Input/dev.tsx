import { CommonComponentProps } from '@/materials/interface'
import { createElement, memo } from 'react'
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
    inputMode,
    ...otherProps
  } = props

  // TODO: 根据inputMode渲染不同的组件
  const showInput = () => {
    switch (inputMode) {
      case 'Input':
        return (
          <Input
            {...otherProps}
            style={styles}
            addonBefore={addonBefore && createElement(iconsList[addonBefore])}
            addonAfter={addonAfter && createElement(iconsList[addonAfter])}
            prefix={prefix && createElement(iconsList[prefix])}
            suffix={suffix && createElement(iconsList[suffix])}
          />
        )
      case 'Input.TextArea':
        return (
          <Input.TextArea
            {...otherProps}
            style={styles}
            // addonBefore={addonBefore && createElement(iconsList[addonBefore])}
            // addonAfter={addonAfter && createElement(iconsList[addonAfter])}
            prefix={prefix && createElement(iconsList[prefix])}
            // suffix={suffix && createElement(iconsList[suffix])}
          />
        )
      case 'Input.Search':
        return (
          <Input.Search
            {...otherProps}
            style={styles}
            addonBefore={addonBefore && createElement(iconsList[addonBefore])}
            addonAfter={addonAfter && createElement(iconsList[addonAfter])}
            prefix={prefix && createElement(iconsList[prefix])}
            suffix={suffix && createElement(iconsList[suffix])}
          />
        )
      case 'Input.Password':
        return (
          <Input.Password
            {...otherProps}
            style={styles}
            addonBefore={addonBefore && createElement(iconsList[addonBefore])}
            addonAfter={addonAfter && createElement(iconsList[addonAfter])}
            prefix={prefix && createElement(iconsList[prefix])}
            suffix={suffix && createElement(iconsList[suffix])}
          />
        )
      case 'Input.OTP':
        return (
          <Input.OTP
            {...otherProps}
            style={styles}
            // addonBefore={addonBefore && createElement(iconsList[addonBefore])}
            // addonAfter={addonAfter && createElement(iconsList[addonAfter])}
            prefix={prefix && createElement(iconsList[prefix])}
            // suffix={suffix && createElement(iconsList[suffix])}
          />
        )
    }
  }

  return (
    <div data-component-id={id} style={styles}>
      {showInput()}
    </div>
  )
})
