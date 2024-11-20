import { IMPORT_MAP_FILE_NAME, useReactPlay } from '@/stores/reactplay'
import { memo, useEffect, useState } from 'react'
import { compile } from './compiler'
import iframeRaw from '../CodeEditor/Template/iframe.html?raw'

export default memo(() => {
  const { files, selectedFileName } = useReactPlay()
  const [compiledCode, setCompiledCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())

  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [files[selectedFileName].value])

  function getIframeUrl() {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`,
      )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  return (
    <div style={{ height: '100%' }}>
      <iframe
        src={iframeUrl}
        style={{
          width: '100%',
          height: '100%',
          padding: 0,
          border: 'none',
        }}
      />
    </div>
  )
})
