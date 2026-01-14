FROM node:18-alpine

WORKDIR /app

# 复制所有文件
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 启动应用
CMD ["node", "server.js"]