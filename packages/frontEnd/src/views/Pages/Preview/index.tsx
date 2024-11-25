import { memo } from 'react'
import { useParams } from 'react-router-dom'

export default memo(() => {
  const params = useParams()
  const { project_id = '', page_id = '' } = params

  return (
    <div>
      preview-{project_id}-{page_id}
    </div>
  )
})
