// 自动获取和管理类型定义文件（.d.ts）
import { setupTypeAcquisition } from '@typescript/ata'
import typescriprt from 'typescript'

export function createATA(
  onDownloadFile: (code: string, path: string) => void,
) {
  const ata = setupTypeAcquisition({
    projectName: 'my-ata',
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        onDownloadFile(code, path)
      },
    },
  })

  return ata
}
