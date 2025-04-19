# 难点解决

## nest 静态文件的打包

## 线上环境流式报错：Request with the provided ID has already finished loading（nginx 配置支持流式）

## monaco CDN 引入问题

`@monaco-editor/react` `monaco-editor`

```
chunk-DJUWZC54.js?v=ee6b16b5:9832 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'toUrl')
    at _FileAccessImpl.toUri (chunk-DJUWZC54.js?v=ee6b16b5:9832:40)
    at _FileAccessImpl.asBrowserUri (chunk-DJUWZC54.js?v=ee6b16b5:9788:26)
    at chunk-DJUWZC54.js?v=ee6b16b5:45899:32
    at new Promise (<anonymous>)
    at EditorSimpleWorker.$loadForeignModule (chunk-DJUWZC54.js?v=ee6b16b5:45891:12)
    at chunk-DJUWZC54.js?v=ee6b16b5:83747:22
    at async tsMode-Y6RT7EH5.js?v=ee6b16b5:81:16
    at async WorkerManager.getLanguageServiceWorker (tsMode-Y6RT7EH5.js?v=ee6b16b5:87:20)
    at async DiagnosticsAdapter._doValidate (tsMode-Y6RT7EH5.js?v=ee6b16b5:368:20)
```

```
在解决CDN的过程中遇到了这样的问题

// 需要引入
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === 'json') {
      return new jsonWorker()
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return new cssWorker()
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return new htmlWorker()
    }
    if (label === 'typescript' || label === 'javascript') {
      return new tsWorker()
    }
    return new editorWorker()
  },
}
loader.config({ monaco })
loader.init().then(() => {
  console.log('monaco init success')
})
```
