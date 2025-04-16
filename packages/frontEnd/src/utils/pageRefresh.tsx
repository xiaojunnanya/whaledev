import { Button, notification } from 'antd'

let lastSrcs: string[] = []

// 匹配 <script src="..."> 的正则
const scriptTagRegex = /<script[^>]+src=["']([^"']+)["']/gi

/**
 * 获取当前页面的所有 <script> 标签中的 src 列表
 */
async function getScriptSrcList(): Promise<string[]> {
  try {
    const html = await fetch(`/?_=${Date.now()}`).then(res => res.text())

    const srcList: string[] = []
    let match: RegExpExecArray | null

    // 使用正则提取所有的 script 标签 src 值
    while ((match = scriptTagRegex.exec(html))) {
      srcList.push(match[1])
    }

    return srcList
  } catch (error) {
    console.error('获取页面 HTML 失败:', error)
    return []
  }
}

/**
 * 判断两个 src 列表是否有变化
 */
function hasChanged(oldList: string[], newList: string[]): boolean {
  if (oldList.length !== newList.length) return true

  for (let i = 0; i < oldList.length; i++) {
    if (oldList[i] !== newList[i]) {
      return true
    }
  }

  return false
}

/**
 * 启动轮询检测页面是否需要刷新
 * @param interval - 检测的时间间隔（毫秒）
 */

let hasShownNotification = false
export default function checkPageRefresh(interval: number = 20): void {
  const check = async () => {
    const newSrcs = await getScriptSrcList()

    if (lastSrcs.length === 0) {
      lastSrcs = newSrcs
      return
    }

    if (hasChanged(lastSrcs, newSrcs) && !hasShownNotification) {
      hasShownNotification = true
      notification.info({
        message: '页面已更新，是否刷新？',
        description: (
          <div
            style={{
              marginTop: 8,
            }}
          >
            <Button
              onClick={() => {
                window.location.reload()
              }}
              type="primary"
              style={{
                marginRight: 8,
              }}
            >
              立即刷新
            </Button>
            <Button
              onClick={() => {
                lastSrcs = newSrcs
                notification.destroy('refresh')
              }}
            >
              稍后刷新
            </Button>
          </div>
        ),
        duration: null,
        closeIcon: false,
        key: 'refresh',
      })
    }
  }

  check()
  setInterval(check, interval * 1000)
}
