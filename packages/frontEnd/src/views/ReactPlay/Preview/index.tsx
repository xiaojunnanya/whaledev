import { IMPORT_MAP_FILE_NAME, useReactPlay } from '@/stores/reactplay'
import { memo, useEffect, useState } from 'react'
import { compile } from './compiler'
import iframeRaw from '../Template/iframe.html?raw'
import MessageContainer from '@/components/MessageContainer'

interface MessageData {
  data: {
    type: string
    message: string
  }
}

export default memo(() => {
  const { files } = useReactPlay()
  const [compiledCode, setCompiledCode] = useState('')
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl())

  useEffect(() => {
    setIframeUrl(getIframeUrl())
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode])

  // 遗留的问题：监听变化有问题(可以记为难点)
  useEffect(() => {
    const res = compile(files)
    setCompiledCode(res)
  }, [JSON.stringify(files)])

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

  const [error, setError] = useState('')

  // 遗留的问题：没有问题的内容设为空
  const handleMessage = (msg: MessageData) => {
    const { type, message } = msg.data
    if (type === 'ERROR') {
      setError(message)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

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
      <MessageContainer type="error" content={error} />
    </div>
  )
})
