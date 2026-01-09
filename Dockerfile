FROM node:18-alpine

WORKDIR /app

# 复制package.json
COPY package.json ./

# 安装依赖
RUN npm install --production

# 复制应用代码
COPY ai-proxy-server.js ./

# 暴露端口
EXPOSE 3001

# 启动命令
CMD ["node", "ai-proxy-server.js"]