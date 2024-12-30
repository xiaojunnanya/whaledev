import { memo, useState } from 'react'
import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { ImageUploadStyled } from './style'

export default memo(() => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'http://www.xiaojunnan.cn/img/logo.webp',
    },
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  return (
    <ImageUploadStyled className="resetUploadStyle">
      <ImgCrop rotationSlider>
        <Upload
          action="https://www.marsview.com.cn/api/upload/files"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          maxCount={1}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </ImageUploadStyled>
  )
})
