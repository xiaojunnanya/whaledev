import { memo } from 'react'
import { MiddleStyled } from './style'

export default memo(() => {
  return (
    <MiddleStyled className="edit-middle">
      {/* 遗留的问题：使用iframe隔绝样式干扰 */}
      <div className="edit-middle-container">middle</div>
    </MiddleStyled>
  )
})
