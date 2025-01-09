## 通用

- `prompt`: 配置 prompt 可展示提示词

- ```
  // 当inputMode 的值等于 XXX 的时候不显示
  ignoreConfig: [
      'inputMode === Input.TextArea',
      'inputMode === Input.OTP',
  ],
  ```

- 



## 文本输入框

![image-20250104140644629](components-config.assets/image-20250104140644629.png)

```
{
    name: 'defaultValue',
    label: '文本',
    type: 'input',
    placeholder: '请输入文本',
},
```

## 数字文本输入框

![image-20250109105135327](components-config.assets/image-20250109105135327.png)

```
{
    name: 'maxLength',
    label: '最大长度',
    type: 'inputNumber',
    max: 100,
    min: 0,
    placeholder: '请输入最大长度',
},
```

## 下拉选择器

![image-20250104140939518](components-config.assets/image-20250104140939518.png)

```
{
    name: 'type',
    label: '按钮类型',
    type: 'select',
    options: [
        { label: '主按钮 primary', value: 'primary' },
        { label: '次按钮 default', value: 'default' },
        { label: '虚线按钮 dashed', value: 'dashed' },
        { label: '文本按钮 text', value: 'text' },
        { label: '链接按钮 link', value: 'link' },
    ],
},
```

## switch 选择

![image-20250104141025878](components-config.assets/image-20250104141025878.png)

```
{
    name: 'autoInsertSpace',
    label: '添加空格',
    type: 'switch',
},
```

## 分段控制器

![image-20250104141122715](components-config.assets/image-20250104141122715.png)

```
{
    name: 'iconPosition',
    label: '图标位置',
    type: 'segmented',
    options: [
        {
            label: '左',
            value: 'start',
        },
        {
            label: '右',
            value: 'end',
        },
    ],
},
```

## Icon 上传

![image-20250104141157909](components-config.assets/image-20250104141157909.png)

```
{
    name: 'icon',
    label: '图标',
    type: 'selectIcon',
},
```
