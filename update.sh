#!/bin/sh

echo "===== 开始更新依赖 ====="
if npm install; then
  echo "✅ 依赖安装完成！"
else
  echo "❌ 依赖安装失败，请检查错误信息！"
  exit 1
fi

echo "===== 更新数据库 ====="
read -p "是否更新数据库？（y/n）： " choice

if [ "$choice" = "y" ] || [ "$choice" = "Y" ]; then
  if npm run mysql:init; then
    echo "✅ 更新数据库完成！"
  else
    echo "❌ 更新数据库失败，请检查错误信息！"
    exit 1
  fi
else
  echo "更新数据库操作已取消，请手动执行命令更新。"
fi


echo "===== 更新完成！ ====="