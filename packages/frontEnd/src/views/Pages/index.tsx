import Header from '@/components/Header'
import {
  DesktopOutlined,
  LeftOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons'
import { Button, InputNumber, Modal } from 'antd'
import { memo, useEffect, useState } from 'react'

import { useGlobal } from '@/stores/global'
import { EditStyled } from './style'
import { useParams, useNavigate } from 'react-router-dom'
import Edit from './Edit'
import { getPageDetail } from '@/service/request/pages'

interface pageType {
  id: number
  page_id: string
  page_name: string
  page_type: string
}

export default memo(() => {
  const params = useParams()
  const navigate = useNavigate()
  const { project_id = '', page_id = '' } = params
  const [showResetModal, setShowResetModal] = useState(false)
  const [pageInfo, setPageInfo] = useState<pageType>({} as pageType)
  const { width: viewWidth, setMessage } = useGlobal()

  useEffect(() => {
    getPageInfo()
  }, [])

  const getPageInfo = async () => {
    const { data } = await getPageDetail(page_id)

    if (data) {
      setPageInfo(data)
    } else {
      setMessage({
        type: 'error',
        text: '查询页面详情失败，请稍后重试',
      })
    }
  }

  const preview = () => {
    window.open(`/project/${project_id}/page/${page_id}/preview`)
  }

  const save = async () => {}

  const reset = () => {}

  return (
    <>
      <Header></Header>

      <EditStyled>
        <Modal
          title="提示"
          open={showResetModal}
          onOk={reset}
          onCancel={() => setShowResetModal(false)}
        >
          你确定要重置该页面吗
        </Modal>

        <div className="edit-top">
          <div
            className="edit-top-left"
            onClick={() => {
              navigate(`/project/${project_id}/rapid/page/${page_id}`)
            }}
          >
            <LeftOutlined />
            <span className="page-name">{pageInfo?.page_name}</span>
          </div>
          <div className="edit-top-middle">
            <DesktopOutlined />
            <TabletOutlined rotate={90} />
            <MobileOutlined />
            <InputNumber addonAfter="px" value={viewWidth} />
          </div>
          <div className="edit-top-right">
            <Button size="small" onClick={() => setShowResetModal(true)}>
              重置
            </Button>
            <Button type="primary" size="small" onClick={save}>
              保存
            </Button>
            <Button size="small" onClick={preview}>
              预览
            </Button>
          </div>
        </div>

        <Edit />
      </EditStyled>
    </>
  )
})
