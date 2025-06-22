import { Button, Empty, Input } from 'antd'
import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ComponentlibraryStyled } from './style'

export default memo(() => {
  const navigate = useNavigate()
  return (
    <ComponentlibraryStyled>
      <div className="search">
        <Input
          placeholder="请输入自定义组件名称"
          style={{
            width: 200,
          }}
        ></Input>
        <Button
          onClick={() => {
            navigate('/reactplay')
          }}
          type="primary"
        >
          自定义组件开发
        </Button>
      </div>

      <Empty></Empty>
    </ComponentlibraryStyled>
  )
})
