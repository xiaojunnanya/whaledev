// 自动获取和管理类型定义文件（.d.ts）
// 动态加载类型定义文件，以便在项目中正确地获取类型信息
import { setupTypeAcquisition } from '@typescript/ata'
import typescriprt from 'typescript'

const downloadedFilesCache: Set<string> = new Set()

// 处理ts类型定义问题
export function createATA(
  onDownloadFile: (code: string, path: string) => void,
) {
  const ata = setupTypeAcquisition({
    projectName: 'whaledev-ata',
    typescript: typescriprt,
    logger: console,
    delegate: {
      receivedFile: (code, path) => {
        try {
          if (!code || !path) {
            console.error(`Invalid file content or path: ${path}`)
            return
          }

          // 文档纪录：难点纪录
          // 缓存检查：如果文件已经下载过，则跳过
          if (downloadedFilesCache.has(path)) {
            console.log(`File already downloaded: ${path}`)
            return
          }

          // 将文件路径添加到缓存中
          downloadedFilesCache.add(path)

          // 如果下载的文件没有有效的内容，抛出错误
          onDownloadFile(code, path)
        } catch (error) {
          console.error(error) // 捕获错误并调用外部传入的错误处理函数
        }
      },
      errorMessage: (userFacingMessage, error) => {
        console.error(`Error: ${userFacingMessage} - ${error.message}`)
      },
    },
  })

  return ata
}
