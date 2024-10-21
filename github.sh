#!/bin/bash

echo "请选择提交类型:"
echo "1) feat: 新功能"
echo "2) fix: 修复 bug"
echo "3) docs: 文档变更"
echo "4) style: 代码风格变动"
echo "5) refactor: 代码重构"
echo "6) perf: 性能优化"
echo "7) test: 添加或修改测试"
echo "8) chore: 杂项"
echo "9) build: 构建变更"
echo "10) ci: 持续集成变更"
echo "11) revert: 回滚"

read -p "选择类型 (1-11): " type_choice

case $type_choice in
  1) type="feat";;
  2) type="fix";;
  3) type="docs";;
  4) type="style";;
  5) type="refactor";;
  6) type="perf";;
  7) type="test";;
  8) type="chore";;
  9) type="build";;
  10) type="ci";;
  11) type="revert";;
  *) echo "无效选择"; exit 1;;
esac

read -p "请输入提交信息: " commit_message

git add .

git commit -m "$type: $commit_message"

git push