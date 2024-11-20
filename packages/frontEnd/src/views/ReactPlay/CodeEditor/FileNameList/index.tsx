import { useReactPlay } from '@/stores/reactplay'
import { memo, useEffect, useState } from 'react'
import { FileNameListStyled } from './style'

export default memo(() => {
  const { files, selectedFileName, setSelectedFileName } = useReactPlay()

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <FileNameListStyled>
      {tabs.map((item, index) => (
        <div
          key={index}
          onClick={() => setSelectedFileName(item)}
          className={`tab-item ${selectedFileName === item ? 'actived' : ''}`}
        >
          {item}
        </div>
      ))}
    </FileNameListStyled>
  )
})
