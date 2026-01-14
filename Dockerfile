FROM node:18-alpine

WORKDIR /app

# 复制package.json
COPY package.json ./

# 安装依赖
RUN npm install --production

# 复制所有文件
COPY . .

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "server.js"]