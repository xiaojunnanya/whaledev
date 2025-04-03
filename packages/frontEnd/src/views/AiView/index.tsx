import AiContent from '@/components/Ai/AiContent'
import { Conversations, ConversationsProps } from '@ant-design/x'
import { GetProp } from 'antd'
import { memo } from 'react'
import { AiViewStyled } from './style'
import '@/assets/css/scrollbar.css'
import {
  DeleteOutlined,
  EditOutlined,
  ShareAltOutlined,
} from '@ant-design/icons'

const menuConfig: ConversationsProps['menu'] = conversation => ({
  items: [
    {
      label: '重命名',
      key: 'rename',
      icon: <EditOutlined />,
    },
    {
      label: '分享',
      key: 'share',
      icon: <ShareAltOutlined />,
    },
    {
      label: '删除',
      key: 'delete',
      icon: <DeleteOutlined />,
      danger: true,
    },
  ],
  onClick: menuInfo => {
    menuInfo.domEvent.stopPropagation()
    console.log('Click', conversation.key, menuInfo.key)
  },
})

const items: GetProp<ConversationsProps, 'items'> = [
  {
    key: '3',
    label: 'Low Version Browser Gap Compatibility',
    group: 'Group1',
  },
  {
    key: '4',
    label: 'SystemJS Bare Specifier Resolution',
    group: 'Group1',
  },
  {
    key: '5',
    label: 'TypeError in sessionStoragesetItem',
    group: 'Group1',
  },
  {
    key: '6',
    label: '中文问候',
    group: 'Group1',
  },
  {
    key: '7',
    label: 'Await Then Behavior',
    group: 'Group2',
  },
  {
    key: '8',
    label: '比亚迪汉DMI车膜推荐',
    group: 'Group2',
  },
  {
    key: '9',
    label: '汽车膜推荐杭州预算2000以内',
    group: 'Group2',
  },
  {
    key: '10',
    label: 'Array Deduplication by ID',
    group: 'Group2',
  },
  {
    key: '11',
    label: 'CSS Opacity Background Issue',
    group: 'Group2',
  },
  {
    key: '12',
    label: 'Lemon in Water Scene',
    group: 'Group2',
  },
  {
    key: '13',
    label: 'Understanding this.trigger in Reflux Store',
    group: 'Group2',
  },
  {
    key: '14',
    label: 'Filter and Clean Links',
    group: 'Group2',
  },
  {
    key: '15',
    label: 'RandomStringShuffle',
    group: 'Group2',
  },
  {
    key: '16',
    label: 'Check First Array Element is Object',
    group: 'Group2',
  },
  {
    key: '17',
    label: '新能源汽车车窗膜推荐',
    group: 'Group3',
  },
  {
    key: '18',
    label: '新能源汽车贴膜推荐',
    group: 'Group3',
  },
  {
    key: '19',
    label: 'Find ID Index in Array of Objects',
    group: 'Group3',
  },
  {
    key: '20',
    label: '检测重复名称',
    group: 'Group3',
  },
  {
    key: '21',
    label: 'Design Request for AI-Powered Low Code Platform Logo',
    group: 'Group3',
  },
  {
    key: '22',
    label: 'AI Integration Logo Design for Lingxi AI',
    group: 'Group3',
  },
  {
    key: '23',
    label: 'RGBA vs Opacity 区别',
    group: 'Group3',
  },
  {
    key: '24',
    label: 'Clarify Context Needed',
    group: 'Group3',
  },
]

export default memo(() => {
  return (
    <AiViewStyled>
      <div className="ai_view_conversations">
        <Conversations
          items={items}
          style={{
            width: 256,
            backgroundColor: 'rgb(249, 249, 249)',
          }}
          menu={menuConfig}
          groupable
        />
      </div>

      <div className="ai_view_content">
        <AiContent></AiContent>
      </div>
    </AiViewStyled>
  )
})
