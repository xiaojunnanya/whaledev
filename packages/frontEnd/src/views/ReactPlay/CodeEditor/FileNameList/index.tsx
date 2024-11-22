import {
  APP_COMPONENT_FILE_NAME,
  ENTRY_FILE_NAME,
  IMPORT_MAP_FILE_NAME,
  useReactPlay,
} from '@/stores/reactplay'
import { memo, useEffect, useState } from 'react'
import { FileNameListStyled } from './style'
import FileNameItem from './FileNameItem'

export default memo(() => {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
    updateFileName,
    addFile,
    removeFile,
  } = useReactPlay()
  const [creating, setCreating] = useState(false)
  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  const handleEditComplete = (name: string, prevName: string) => {
    updateFileName(prevName, name)
    setSelectedFileName(name)
    setCreating(false)
  }

  const addTab = () => {
    addFile('Com' + Math.random().toString().slice(2, 6) + '.tsx')
    setCreating(true)
  }

  const handleRemove = (name: string) => {
    removeFile(name)
    setSelectedFileName(ENTRY_FILE_NAME)
  }
  const readonlyFileNames = [
    ENTRY_FILE_NAME,
    IMPORT_MAP_FILE_NAME,
    APP_COMPONENT_FILE_NAME,
  ]
  return (
    <FileNameListStyled>
      {tabs.map((item, index) => (
        <FileNameItem
          key={index + item}
          value={item}
          actived={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name: string) => handleEditComplete(name, item)}
          creating={creating && index === tabs.length - 1}
          onRemove={() => {
            handleRemove(item)
          }}
          readonly={readonlyFileNames.includes(item)}
        />
      ))}{' '}
      <div className="add" onClick={addTab}>
        +
      </div>
    </FileNameListStyled>
  )
})
