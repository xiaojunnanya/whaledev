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
import { getPageJsonByPageId, savePageJson } from '@/service/request/page_json'
import { initComponents, useComponetsStore } from '@/stores/components'

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
  const { components, updeteComponent, setCurComponentId } = useComponetsStore()

  useEffect(() => {
    Promise.allSettled([getPageInfo(), getPageJson()])

    return () => {
      updeteComponent(initComponents)
    }
  }, [])

  const getPageInfo = async () => {
    const { data } = await getPageDetail(page_id)

    if (data) {
      setPageInfo(data)
    } else {
      setMessage({
        type: 'error',
        text: '查询页面信息失败，请稍后重试',
      })
    }
  }

  const getPageJson = async () => {
    const { data } = await getPageJsonByPageId(page_id)
    updeteComponent(
      JSON.parse(data?.page_json || JSON.stringify(initComponents)),
    )
  }

  const preview = () => {
    window.open(`/project/${project_id}/page/${page_id}/preview`)
  }

  const save = async () => {
    const { data, message, msgType } = await savePageJson({
      page_id,
      page_json: JSON.stringify(components),
    })

    if (!data) {
      setMessage({
        type: msgType,
        text: message,
      })
    } else {
      setMessage({
        type: 'error',
        text: '查询页面详情失败，请稍后重试',
      })
    }
  }

  const reset = () => {
    // 重置页面
    setCurComponentId('')
    updeteComponent(initComponents)
    setShowResetModal(false)
  }

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
            {/* 遗留的问题：出现滚动后画布的宽度 */}
            <InputNumber addonAfter="px" value={viewWidth} />
          </div>
          <div className="edit-top-right">
            <Button onClick={() => setShowResetModal(true)}>重置</Button>
            <Button type="primary" onClick={save}>
              保存
            </Button>
            <Button onClick={preview}>预览</Button>
            <Button>发布至模版（个人/市场/地址）</Button>
          </div>
        </div>

        <Edit />
      </EditStyled>
    </>
  )
})
