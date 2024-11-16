import { Button, Result } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  status?: 'success' | 'error' | 'info' | 'warning' | 404 | 403 | 500
  subTitle?: string
  btnName?: string
  url?: string
  title?: string
}

export default memo((props: IProps) => {
  const {
    status = '404',
    subTitle = '抱歉，您访问的页面不存在',
    btnName = '返回首页',
    url = '/',
    title = '404',
  } = props
  const naviage = useNavigate()

  return (
    <Result
      status={status}
      title={title}
      subTitle={subTitle}
      extra={
        <Button type="primary" onClick={() => naviage(url)}>
          {btnName}
        </Button>
      }
    />
  )
})
