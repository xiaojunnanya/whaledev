import { memo } from 'react'
import { HandleStyled } from './style'
import { LeftOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { downloadFiles } from '@/utils'
import { useReactPlay } from '@/stores/reactplay'
import { useNavigate } from 'react-router-dom'
import { SELFWEBURL } from '@/assets/defaultData'
import { useGlobal } from '@/stores/global'

export default memo(() => {
  const { files } = useReactPlay()
  const navigate = useNavigate()
  const { setMessage } = useGlobal()

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
        <Button
          type="primary"
          onClick={() => {
            setMessage({
              type: 'info',
              text: '还在开发中，仅支持体验，暂不支持保存',
            })
          }}
        >
          保存
        </Button>
        {/* <Button>发布</Button> */}
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
            window.open(SELFWEBURL.whaleDocs + 'docs/platform/reactplay.html')
          }}
        />
      </div>
    </HandleStyled>
  )
})
