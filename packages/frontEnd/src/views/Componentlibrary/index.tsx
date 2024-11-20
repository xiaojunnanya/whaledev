import { Button } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export default memo(() => {
  const navigate = useNavigate()
  return (
    <Button
      onClick={() => {
        navigate('/reactplay')
      }}
    >
      组件市场
    </Button>
  )
})
