import { FormInstance } from 'antd'
import JumpLink from './Components/JumpLink'
import ReloadPage from './Components/ReloadPage'
import ScriptRun from './Components/ScriptRun'

interface itemsType {
  label: string
  key: string
  children: itemsChildType[]
}

export interface itemsChildType {
  label: string
  key: string
  describe?: string
  render: (form: FormInstance) => JSX.Element
}

export const itemsActions: itemsType[] = [
  {
    label: '页面',
    key: 'page-nav',
    children: [
      {
        label: '跳转链接',
        key: 'jumpLink',
        describe:
          '跳转到指定页面。1. 系统内跳转会通过自身路由实现；2. 超链接跳转通过window.open实现；',
        render: form => {
          return <JumpLink form={form} />
        },
      },
      {
        label: '刷新页面',
        key: 'reloadPage',
        describe: '刷新当前页面。使用window.location.reload()实现',
        render: () => {
          return <ReloadPage />
        },
      },
    ],
  },
  // {
  //   label: '表单',
  //   key: 'form',
  //   children: [
  //     {
  //       label: '表单功能',
  //       key: 'formUse',
  //       render: () => {
  //         return <div>表单重置/提交/验证/赋值/获取表单值</div>
  //       },
  //     },
  //   ],
  // },
  // {
  //   label: '弹框',
  //   key: 'modal',
  //   children: [
  //     {
  //       label: '弹框功能',
  //       key: 'modalUse',
  //       render: () => {
  //         return <div>打开弹框/关闭弹框</div>
  //       },
  //     },
  //     {
  //       label: '抽屉功能',
  //       key: 'drawerUse',
  //       render: () => {
  //         return <div>打开抽屉/关闭抽屉</div>
  //       },
  //     },
  //     {
  //       label: '确认框',
  //       key: 'confirm',
  //       render: () => {
  //         return <div>确认框</div>
  //       },
  //     },
  //     {
  //       label: '全局提示',
  //       key: 'globalTip',
  //       render: () => {
  //         return <div>全局提示</div>
  //       },
  //     },
  //     {
  //       label: '消息通知',
  //       key: 'messageNotify',
  //       render: () => {
  //         return <div>消息通知</div>
  //       },
  //     },
  //   ],
  // },
  // {
  //   label: '请求',
  //   key: 'request',
  //   children: [
  //     {
  //       label: '发送请求',
  //       key: 'sendRequest',
  //       render: () => {
  //         return <div>发送请求</div>
  //       },
  //     },
  //     {
  //       label: '文件下载',
  //       key: 'downloadFile',
  //       render: () => {
  //         return <div>文件下载</div>
  //       },
  //     },
  //   ],
  // },
  // {
  //   label: '组件',
  //   key: 'component',
  //   children: [
  //     {
  //       label: '组件显隐',
  //       key: 'componentVisible',
  //       render: () => {
  //         return <div>组件显隐</div>
  //       },
  //     },
  //     {
  //       label: '组件禁用',
  //       key: 'componentDisabled',
  //       render: () => {
  //         return <div>组件禁用</div>
  //       },
  //     },
  //     {
  //       label: '组件方法',
  //       key: 'componentMethod',
  //       render: () => {
  //         return <div>组件方法</div>
  //       },
  //     },
  //     {
  //       label: '变量赋值',
  //       key: 'variableSet',
  //       render: () => {
  //         return <div>变量赋值</div>
  //       },
  //     },
  //     {
  //       label: '刷新组件',
  //       key: 'refreshComponent',
  //       render: () => {
  //         return <div>刷新组件</div>
  //       },
  //     },
  //   ],
  // },
  {
    label: '其他',
    key: 'other',
    children: [
      // {
      //   label: '复制内容',
      //   key: 'copyContent',
      //   render: () => {
      //     return <div>复制内容</div>
      //   },
      // },
      // {
      //   label: '定时器',
      //   key: 'timer',
      //   render: () => {
      //     return <div>定时器</div>
      //   },
      // },
      {
        label: '脚本运行',
        key: 'scriptRun',
        render: form => {
          return <ScriptRun form={form} />
        },
      },
    ],
  },
]

export const allActions = itemsActions.reduce<itemsChildType[]>(
  (prev, next) => {
    // 如果当前项有 children，则展开并合并到 prev 中
    if (next.children) {
      // 只有 children 中的项符合 itemsChildType 类型，因此直接添加到 prev 中
      return [...prev, ...next.children]
    }
    // 如果没有 children，则跳过该项
    return prev
  },
  [],
)
