import Header from '@/components/Header'
import { Allotment } from 'allotment'
import { memo } from 'react'
import 'allotment/dist/style.css'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import Handle from './Handle'

export default memo(() => {
  return (
    <>
      <Header></Header>
      <Handle></Handle>
      <div style={{ height: 'calc(100vh - 48px - 48px)' }}>
        <Allotment defaultSizes={[100, 100]}>
          <Allotment.Pane minSize={400}>
            <CodeEditor />
          </Allotment.Pane>
          <Allotment.Pane minSize={400}>
            <Preview />
          </Allotment.Pane>
        </Allotment>
      </div>
    </>
  )
})
