#!/bin/sh

echo "===== 检查 是否存在 .env 文件 ====="
if [ -f "./packages/backEnd/.env" ]; then
  set -a
  source ./packages/backEnd/.env
  set +a
  echo ".env 文件已加载"
else
  echo ".env 文件不存在，请检查路径"
fi

echo "===== 检查 Node.js ====="
NODE_VERSION=$(node -v 2>/dev/null | sed 's/^v//')

if [ -z "$NODE_VERSION" ]; then
  echo "❌ Node.js 未安装或未配置在 PATH 中。"
  exit 1
fi

NODE_MAJOR_VERSION=$(echo "$NODE_VERSION" | cut -d. -f1)

if [ "$NODE_MAJOR_VERSION" -lt 18 ]; then
  echo "❌ 当前 Node.js 版本为 $NODE_VERSION，小于要求的 18。请升级 Node.js。"
  exit 1
else
  echo "✅ Node.js 版本符合要求：$NODE_VERSION"
fi

echo "===== 检查 MySQL ====="
if command -v mysql >/dev/null 2>&1; then
  MYSQL_VERSION=$(mysql --version | awk '{ for(i=1;i<=NF;i++) if ($i ~ /^[0-9]+\./) print $i; }')
  echo "✅ MySQL 已安装，版本：$MYSQL_VERSION"
else
  echo "❌ 未检测到 MySQL，请确认是否已安装并加入 PATH。"
  exit 1
fi

echo "===== 检查 Redis ====="
if command -v redis-server >/dev/null 2>&1; then
  REDIS_VERSION=$(redis-server --version | awk '{print $3}' | cut -d'=' -f2)
  echo "✅ Redis 已安装，版本：$REDIS_VERSION"
else
  echo "❌ 未检测到 Redis，请确认是否已安装并加入 PATH。"
  exit 1
fi

echo "===== 开始安装依赖 ====="
if npm install; then
  echo "✅ 依赖安装完成！"
else
  echo "❌ 依赖安装失败，请检查错误信息！"
  exit 1
fi

echo "===== 检测 MySQL 连接 ====="
mysql -u "$MYSQL_USER" -p"$MYSQL_PASS" -h "$MYSQL_HOST" -P "$MYSQL_PORT" -e "exit" 2>/dev/null
if [ $? -eq 0 ]; then
  echo "✅ MySQL 连接成功！"
else
  echo "❌ MySQL 连接失败，请检查 MySQL 服务状态或连接配置。"
  exit 1
fi

echo "===== 检测 Redis 连接 ====="
if redis-cli -h "$REDIS_HOST" -p "$REDIS_PORT" ping | grep -q PONG; then
  echo "✅ Redis 连接成功！"
else
  echo "❌ Redis 连接失败，请检查 Redis 服务状态或连接配置。"
  exit 1
fi

echo "===== 初始化数据库 ====="
read -p "是否初始化数据库？（y/n）： " choice

if [ "$choice" = "y" ] || [ "$choice" = "Y" ]; then
  if npm run mysql:init; then
    echo "✅ 初始化数据库完成！"
  else
    echo "❌ 初始化数据库失败，请检查错误信息！"
    exit 1
  fi
else
  echo "初始化数据库操作已取消，请手动执行命令创建表。"
fi


echo "===== 初始化完成！ ====="