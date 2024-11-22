import { Files } from '@/stores/reactplay'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

export async function downloadFiles(files: Files) {
  const zip = new JSZip()

  Object.keys(files).forEach(name => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `code.zip`)
}
