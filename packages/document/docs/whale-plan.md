## 项目规划

1. 项目（项目有类型，后台、单页面）+页面
2. 项目页面支持复制
3. 项目与页面均支持分享给其他用户，可选择只读、可编辑，通过邮箱分享，分享需要有有效期，有效期过后，项目和页面有发布纪录，纪录是谁发布的，可以查看改变的内容（协同编辑）
4. 多文件协同编辑
5. 前端错误监控
6. 用户行为监控
7. 支持其他页面 iframe 嵌套
8. 支持微服务微前端
9. 用户角色：超级管理员、普通用户(权限管理：登录权限、用户权限)
10. 首页参考：https://www.marscode.cn/home https://www.designevo.com/cn/ https://github.com/xun082/online-edit-web
11. 结合 AI
12. 后端接口命名规范：baseurl + /whaledev/v1/ + controller + action,命名风格使用下划线+小写
13. 双 token 无感刷新
14. 支持三方登录：Github 等
15. 短链路
16. 支持多语言（国际化）
17. 所有的删除都是软删除
18. 数据库的调用需要封装，使用三方的方法需要封装
19. 前端全局通知
20. 登录：邮箱+密码 忘记密码：邮箱+邮箱验证码+新密码+确认密码 注册：邮箱+邮箱验证码+密码+确认密码
21. 1.页面主题色
22. 组件 ai 开发，版本管理,组件不是预览，而是直接展示
23. 组件库、模版分为个人与市场(组件库的开发，可以使用小册：React Playground 项目实战)
24. 不用注册就能体验一下基础有限的功能
25. 做一个媒介查询来给移动端展示几个字
26. nest 测试
27. 组件设计的字段中，需要添加版本 version
28. 有一个组件，用来设置滚动条的
29. 前端组件模块使用类似于 js 沙箱来隔绝 css 样式影响
30. 模版是不能创建的，生成模版可以在界面上，有一个发布为模版的按钮
31. 低代码与 AI 的结合
32. 页面与微前端



## 组件规划

### 基础组件

- 通用
  - [x] Button 按钮
  - [ ] floatbotton 悬浮按钮
  - [ ] Icon 图标
  - [ ] Typography 排版
- 布局
  - [x] Divider分割线
  - [ ] Flex 弹性布局
  - [ ] Grid 栅格
  - [ ] Layout 布局
  - [ ] Space 间距
  - [ ] Splitter 分割面板
- 导航
  - [ ] Anchor锚点
  - [ ] Breadcrumb面包屑
  - [ ] Dropdown 下拉菜单
  - [ ] Menu 导航栏
  - [ ] Pagination 分页
  - [ ] Steps 步骤条
- 数据录入
  - [ ] AutoComplete 自动完成
  - [ ] Cascader 级联选择
  - [ ] Checkbox 多选框
  - [ ] ColorPicker 颜色选择
  - [ ] DatePicker 日期选择
  - [ ] Form 表单
  - [ ] Input 输入框
  - [ ] InputNumber 数字输入框
  - [ ] Mentions 提及
  - [ ] Radio 单选框
  - [ ] Rate 评分
  - [ ] Select 选择器
  - [ ] Slider 滑动输入条
  - [ ] Switch 开关
  - [ ] TimePicker 时间选择框
  - [ ] Transfer 穿梭框
  - [ ] TreeSelect 树选择
  - [ ] Upload 上传
- 数据展示
  - [ ] Avatar 头像
  - [ ] Badge 徽标数
  - [ ] Calendar 日历
  - [ ] Card 卡片
  - [ ] Carousel 走马灯
  - [ ] Collapse 折叠面板
  - [ ] Descriptions 描述列表
  - [ ] Empty 空状态
  - [ ] Image 图片
  - [ ] List 列表
  - [ ] Popover 气泡卡片
  - [ ] QRCode 二维码
  - [ ] Segmented 分段控制器
  - [ ] Statistic 统计数值
  - [ ] Table 表格
  - [ ] Tabs 标签页
  - [ ] Tag 标签
  - [ ] Timeline 时间轴
  - [ ] Tooltip 文字提示
  - [ ] Tour 漫游式引导
  - [ ] Tree 树形控件
- 反馈
  - [ ] Alert 告警提示
  - [ ] Drawer 抽屉
  - [ ] Message 全局提示
  - [ ] Modal 对话框
  - [ ] Notification 通知提醒框
  - [ ] Popconfirm 气泡确认框
  - [ ] Progress 进度条
  - [ ] Result 结果
  - [ ] Skeleton 骨架屏
  - [ ] Spin 加载中
  - [ ] Watermark 水印
- 其他
  - [ ] Page
  - [ ] Affix 固钉
  - [ ] App 包裹组件
  - [ ] ConfigProvider 全局化配置



### 图表组件
