import { FormInstance, Input, Modal, Pagination, Tabs, TabsProps } from 'antd'
import { createElement, memo, useEffect, useState } from 'react'
import { WhaleIcons } from '@/utils/global'
import { ModalStyled, SelectIconStyled } from './style'
// 获取所有的antd图标，动态渲染到下拉框中
const allIcons = Object.keys(WhaleIcons).filter(
  item =>
    !item.includes('Filled') &&
    !item.includes('TwoTone') &&
    ![
      'default',
      'createFromIconfontCN',
      'getTwoToneColor',
      'setTwoToneColor',
      'IconProvider',
    ].includes(item),
)

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '内置图标',
  },
  {
    key: '2',
    label: '自定义图标',
  },
]

const defaultPageSize = 20

const iconsList: { [key: string]: any } = WhaleIcons

interface IProps {
  form: FormInstance
  name: string
  valueChange: any
}

export default memo((props: IProps) => {
  const { form, name, valueChange } = props
  const nowIcon = form.getFieldValue(name)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [tabsValue, setTabsValue] = useState('1')
  const [seletctedIcon, setSelectedIcon] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [allIconsList, setAllIconsList] = useState(allIcons)

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setSelectedIcon(nowIcon)
  }, [nowIcon])

  useEffect(() => {
    if (!searchValue) {
      setAllIconsList(allIcons)
    } else {
      const arr = allIcons.filter(item => item.includes(searchValue))
      setAllIconsList(arr)
    }
  }, [searchValue])

  const handleOk = () => {
    setIsModalOpen(false)
    form.setFieldValue(name, seletctedIcon)
    const data = form.getFieldsValue()
    valueChange(data)
  }

  const handleChange = (page: number) => {
    setCurrent(page)
  }

  const createIcon = (key: string, fontSize?: number) => {
    if (!key) return
    return createElement(iconsList[key], {
      style: {
        fontSize: fontSize !== -1 && `${fontSize || 36}px`,
      },
      className: 'whale-icon',
    })
  }

  const closeIcon = () => {
    form.setFieldValue(name, '')
    setSelectedIcon('')
    const data = form.getFieldsValue()
    valueChange(data)
  }

  return (
    <SelectIconStyled>
      {nowIcon ? (
        <>
          {createIcon(nowIcon, -1)}
          <WhaleIcons.CloseCircleOutlined
            className="closeCircleOutlined"
            onClick={closeIcon}
          />
        </>
      ) : (
        <WhaleIcons.PlusOutlined
          className="plusOutlined"
          onClick={() => setIsModalOpen(true)}
        />
      )}

      <Modal
        title="选择图标"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tabs
          defaultValue={tabsValue}
          items={items}
          onChange={value => setTabsValue(value)}
        />

        {tabsValue === '1' && (
          <ModalStyled>
            <Input
              placeholder="在此搜索图标"
              className="searchInput"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
            />
            {allIconsList
              .slice((current - 1) * defaultPageSize, current * defaultPageSize)
              .map(key => {
                return (
                  <span
                    key={key}
                    className={`iconSpan ${
                      key === seletctedIcon ? 'iconSpanActive' : ''
                    }`}
                    onClick={() => setSelectedIcon(key)}
                  >
                    {createIcon(key)}
                  </span>
                )
              })}
            <Pagination
              current={current}
              total={allIconsList.length}
              pageSize={defaultPageSize}
              size="small"
              responsive={true}
              showSizeChanger={false}
              onChange={handleChange}
            />
          </ModalStyled>
        )}
      </Modal>
    </SelectIconStyled>
  )
})
