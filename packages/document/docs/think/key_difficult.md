# 难点解决

## nest 静态文件的打包

### 遇到的问题

在我们使用nest打包的时候，如果我们没有配置assets，nest会默认忽略我们的静态文件（如图片等），但是在配置assets的时候，也遇到了一些问题，使用assets配置路径的情况下并没有将静态文件打包

一开始我配置的是，./src/assets/images 文件夹下所有的文件：

```json
"compilerOptions": {
    "deleteOutDir": true,
    "assets": [
        {
            "include": "./src/assets/**/*",
            "watchAssets": true
        }
    ]
}
```

但是这个并没有将文件打包上去



### 解决方法一

设置直接打包所有的图片

```json
"compilerOptions": {
    "deleteOutDir": true,
    "assets": [
        {
            "include": "**/*.jpg",
            "watchAssets": true
        }
    ]
}
```

但是注意`**/*.jpg` 和 `*.jpg` 的区别

- `*.jpg`：只会匹配 **当前目录** 下的 `.jpg` 文件
- `**/*.jpg`：会递归匹配 **当前目录** 以及所有子目录中的 `.jpg` 文件



### 解决方法二

配置某个路径下的所有的资源

```json
"compilerOptions": {
    "deleteOutDir": true,
    "assets": [
        {
            "include": "**/assets/**/*",
            "watchAssets": true
        }
    ]
}
```



### 补充

这三个路径模式的区别如下：

1. **`./src/assets/\*`**：
   - 只匹配 `./src/assets/` 目录下的文件和直接的子目录。
   - **不会**递归匹配子目录中的文件。
   - 例如，如果 `./src/assets/` 里有文件 `file1.txt` 和子目录 `dir1`，那么 `./src/assets/*` 会匹配 `file1.txt` 和 `dir1`，但不会匹配 `dir1` 里的文件。
2. **`./src/assets/\**/\*`**：
   - 递归匹配 `./src/assets/` 及其所有子目录下的所有文件。
   - **会**进入任意深度的子目录，匹配所有文件。
   - 例如，如果 `./src/assets/` 下有文件 `file1.txt` 和子目录 `dir1`，而 `dir1` 下又有文件 `file2.txt`，那么 `./src/assets/**/*` 会匹配 `file1.txt`、`dir1` 和 `dir1/file2.txt`，以此类推，直到匹配所有文件和目录。
3. **`./src/assets/\**`**：
   - 这个模式匹配的是 `./src/assets/` 及其所有子目录 **的目录**（不包括文件）。
   - **只匹配目录**，并递归查找子目录。
   - 例如，如果 `./src/assets/` 中有文件 `file1.txt` 和子目录 `dir1`，那么 `./src/assets/**` 只会匹配 `./src/assets/` 和 `./src/assets/dir1`，而不会匹配 `file1.txt` 或 `dir1/file2.txt`。



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

```ts
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
