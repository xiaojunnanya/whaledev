import { PlusOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, List, Modal, Segmented } from 'antd'
import { memo, useState } from 'react'
import { DataSourceStyled } from './style'
import ContainerVh from '@/components/ContainerVh'
import SourceModal from './Modal/sourceModal'

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
]

export default memo(() => {
  const [isSourceModalOpen, setSourceModalOpen] = useState(false)

  return (
    <DataSourceStyled>
      <div className="selectData">
        <Segmented<string>
          defaultValue="out-data"
          options={[
            {
              label: '外部数据',
              value: 'out-data',
            },
            {
              label: '内部数据',
              value: 'in-data',
            },
          ]}
          block
        />
      </div>

      <div className="btnGroup">
        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={() => setSourceModalOpen(true)}
        >
          新增
        </Button>
        <Button type="link" icon={<SettingOutlined />}>
          全局拦截器
        </Button>
      </div>

      <div className="dataList">
        <ContainerVh height={204}>
          <List
            bordered
            style={{ border: 'none' }}
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => {
              return (
                <List.Item actions={[<a>修改</a>, <a>删除</a>]}>
                  <List.Item.Meta title={item} description={item} />
                </List.Item>
              )
            }}
          />
        </ContainerVh>
      </div>

      <>
        <Modal
          title="接口配置"
          open={isSourceModalOpen}
          onOk={() => setSourceModalOpen(false)}
          onCancel={() => setSourceModalOpen(false)}
          width={800}
          footer={null}
        >
          <SourceModal />
        </Modal>
      </>
    </DataSourceStyled>
  )
})
