import Editor from '@/components/Editor'
import { Segmented } from 'antd'
import { memo, useState } from 'react'

interface IProps {
  data: any
}

export default memo((props: IProps) => {
  const { data } = props
  const [segmentData, setSegmentData] = useState('json')

  return (
    <div data-a="123">
      <Segmented<string>
        value={segmentData}
        options={[
          {
            label: 'JSON数据',
            value: 'json',
          },
          {
            label: '表格数据',
            value: 'table',
          },
        ]}
        block
        onChange={value => setSegmentData(value)}
      />

      <div style={{ height: '50vh', marginTop: '10px' }}>
        <Editor
          file={{
            name: 'index.json',
            value: JSON.stringify(data, null, 2),
            language: 'json',
          }}
          isMount={false}
        ></Editor>
      </div>
    </div>
  )
})
