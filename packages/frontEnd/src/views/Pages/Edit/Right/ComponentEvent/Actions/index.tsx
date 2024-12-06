import JumpLink from './Components/JumpLink'
import ReloadPage from './Components/ReloadPage'

interface itemsType {
  label: string
  key: string
  children: itemsChildType[]
}

export interface itemsChildType {
  label: string
  key: string
  describe?: string
  render: () => JSX.Element
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
          '跳转到指定页面。1. 系统内跳转会通过自身路由实现；2. 跨服务跳转主要是基于microApp的父子应用通信方式，主应用需要监听数据，并添加跳转代码；3. 超链接跳转通过window.open或location方式实现；',
        render: () => {
          return <JumpLink />
        },
      },
      {
        label: '刷新页面',
        key: 'reloadPage',
        describe: '刷新当前页面。',
        render: () => {
          return <ReloadPage />
        },
      },
    ],
  },
  {
    label: '表单',
    key: 'form',
    children: [
      {
        label: '表单重置',
        key: 'formReset',
        render: () => {
          return <div>表单重置</div>
        },
      },
      {
        label: '表单提交',
        key: 'formSubmit',
        render: () => {
          return <div>表单提交</div>
        },
      },
      {
        label: '表单验证',
        key: 'formValidate',
        render: () => {
          return <div>表单验证</div>
        },
      },
      {
        label: '表单赋值',
        key: 'formSetValues',
        render: () => {
          return <div>表单赋值</div>
        },
      },
      {
        label: '获取表单值',
        key: 'formGetValues',
        render: () => {
          return <div>获取表单值</div>
        },
      },
    ],
  },
  {
    label: '弹框',
    key: 'modal',
    children: [
      {
        label: '打开弹框',
        key: 'openModal',
        render: () => {
          return <div>打开弹框</div>
        },
      },
      {
        label: '关闭弹框',
        key: 'closeModal',
        render: () => {
          return <div>关闭弹框</div>
        },
      },
      {
        label: '打开抽屉',
        key: 'openDrawer',
        render: () => {
          return <div>打开抽屉</div>
        },
      },
      {
        label: '关闭抽屉',
        key: 'closeDrawer',
        render: () => {
          return <div>关闭抽屉</div>
        },
      },
      {
        label: '确认框',
        key: 'confirm',
        render: () => {
          return <div>确认框</div>
        },
      },
      {
        label: '全局提示',
        key: 'globalTip',
        render: () => {
          return <div>全局提示</div>
        },
      },
      {
        label: '消息通知',
        key: 'messageNotify',
        render: () => {
          return <div>消息通知</div>
        },
      },
    ],
  },
  {
    label: '请求',
    key: 'request',
    children: [
      {
        label: '发送请求',
        key: 'sendRequest',
        render: () => {
          return <div>发送请求</div>
        },
      },
      {
        label: '文件下载',
        key: 'downloadFile',
        render: () => {
          return <div>文件下载</div>
        },
      },
    ],
  },
  {
    label: '组件',
    key: 'component',
    children: [
      {
        label: '组件显隐',
        key: 'componentVisible',
        render: () => {
          return <div>组件显隐</div>
        },
      },
      {
        label: '组件禁用',
        key: 'componentDisabled',
        render: () => {
          return <div>组件禁用</div>
        },
      },
      {
        label: '组件方法',
        key: 'componentMethod',
        render: () => {
          return <div>组件方法</div>
        },
      },
      {
        label: '变量赋值',
        key: 'variableSet',
        render: () => {
          return <div>变量赋值</div>
        },
      },
    ],
  },
  {
    label: '其他',
    key: 'other',
    children: [
      {
        label: '复制内容',
        key: 'copyContent',
        render: () => {
          return <div>复制内容</div>
        },
      },
      {
        label: '定时器',
        key: 'timer',
        render: () => {
          return <div>定时器</div>
        },
      },
      {
        label: '脚本运行',
        key: 'scriptRun',
        render: () => {
          return <div>脚本运行</div>
        },
      },
    ],
  },
]
