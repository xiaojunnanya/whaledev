import { memo, useState } from 'react'
import { Upload } from 'antd'
import type { UploadFile, UploadProps } from 'antd'
import ImgCrop from 'antd-img-crop'
import { ImageUploadStyled } from './style'
import { SELFWEBURL } from '@/assets/defaultData'

export default memo(() => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: SELFWEBURL.profile,
    },
  ])

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  return (
    <ImageUploadStyled className="resetUploadStyle">
      <ImgCrop rotationSlider>
        <Upload
          action=""
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
