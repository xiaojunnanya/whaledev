import { Files } from '@/stores/reactplay'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'

import { Component } from '@/stores/components'

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

/**
 * 下载文件
 * @param files
 */
export async function downloadFiles(files: Files) {
  const zip = new JSZip()

  Object.keys(files).forEach(name => {
    zip.file(name, files[name].value)
  })

  const blob = await zip.generateAsync({ type: 'blob' })
  saveAs(blob, `code.zip`)
}

/**
 * 根据 id 递归查找组件
 *
 * @param id 组件 id
 * @param components 组件数组
 * @returns 匹配的组件或 null
 */
export function getComponentById(
  id: string | null,
  components: Component[],
): Component | null {
  if (!id) return null

  for (const component of components) {
    if (component.id == id) return component
    if (component.children && component.children.length > 0) {
      const result = getComponentById(id, component.children)
      if (result !== null) return result
    }
  }
  return null
}
