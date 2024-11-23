import { memo, useEffect, useState } from 'react'
import { MessageContainerStyled } from './style'
import { CloseOutlined } from '@ant-design/icons'

export interface IProps {
  type: 'error' | 'warn'
  content: string
}

export default memo((props: IProps) => {
  const { type, content } = props
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(!!content)
  }, [content])

  return (
    <MessageContainerStyled>
      {visible ? (
        <div className={`msg ${type}`}>
          <pre dangerouslySetInnerHTML={{ __html: content }}></pre>
          <CloseOutlined
            className="closeOutlined"
            onClick={() => setVisible(false)}
          />
        </div>
      ) : null}
    </MessageContainerStyled>
  )
})
