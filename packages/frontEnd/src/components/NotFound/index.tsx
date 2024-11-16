import { Button, Result } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export default memo(() => {

    const naviage = useNavigate()

  return (
    <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在"
        extra={<Button type="primary" onClick={() => naviage('/')}>返回首页</Button>}
    />
  )
})