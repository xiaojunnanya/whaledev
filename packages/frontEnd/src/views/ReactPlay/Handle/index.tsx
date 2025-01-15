import { memo } from 'react'
import { HandleStyled } from './style'
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { downloadFiles } from '@/utils'
import { useReactPlay } from '@/stores/reactplay'
import { useNavigate } from 'react-router-dom'
import { SELFWEBURL } from '@/assets/defaultData'

export default memo(() => {
  const { files } = useReactPlay()
  const navigate = useNavigate()

  return (
    <HandleStyled>
      <div className="left">
        <LeftOutlined
          onClick={() => {
            navigate('/engineering/componentlibrary')
          }}
        />
      </div>
      <div className="right">
        <Button type="primary">保存</Button>
        <Button>发布</Button>
        <Button
          type="dashed"
          onClick={async () => {
            await downloadFiles(files)
          }}
        >
          下载
        </Button>
        <QuestionCircleOutlined
          onClick={() => {
            window.open(SELFWEBURL.whaleDocs + 'docs/reactplay.html')
          }}
        />
      </div>
    </HandleStyled>
  )
})
