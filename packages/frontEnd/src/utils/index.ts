import { Files } from '@/stores/reactplay'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { v4 as uuidv4 } from 'uuid'

export const fileName2Language = (name: string) => {
  const suffix = name.split('.').pop() || ''
  if (['js', 'jsx'].includes(suffix)) return 'javascript'
  if (['ts', 'tsx'].includes(suffix)) return 'typescript'
  if (['json'].includes(suffix)) return 'json'
  if (['css'].includes(suffix)) return 'css'
  return 'javascript'
}

/**
 * 替换最后一个括号及其内容
 * @param str
 * @returns
 */
export function removeLastParenthesisContent(str: string) {
  const regex = /(.*)\((.*)\)$/ // 捕获括号内的内容和最后的括号部分
  const match = str.match(regex)

  return {
    withoutLastParenthesis: match ? match[1] : str, // 去掉最后括号及内容后的字符串
    lastParenthesisContent: match ? match[2] : str, // 最后括号及内容部分
  }
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
 * 获取指定长度的ID
 * @param length
 * @returns
 */
export function generateId(length: number = 8) {
  return uuidv4().split('-').join('').slice(0, length)
}

/**
 * 将驼峰转为连字符
 * @param key
 * @returns
 */
export function camelToHyphen(key: any) {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 将带单位的字符串转为数字+单位
 * @param value
 * @returns
 */
export function splitValue(value: string) {
  const match = value?.match(/^(\d+(?:\.\d+)?)([a-z%]*)$/i)
  if (match) {
    return {
      number: Number(match[1]), // 提取数字部分并转换为浮点数
      unit: match[2], // 提取单位部分
    }
  }
  return null // 无法匹配时返回 null
}

// 查找并替换节点
export function replaceNodeById(data: any[], nodeId: string, newObj: any) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === nodeId) {
      data[i] = { ...newObj } // 替换找到的节点
      return data // 找到并替换后退出
    }
    // 如果节点有子节点，递归查找
    if (data[i].children && data[i].children.length > 0) {
      replaceNodeById(data[i].children, nodeId, newObj)
    }
  }

  return data
}
