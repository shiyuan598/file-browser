# 阶段1: 使用 Node.js 镜像构建前端应用
FROM node:17.6 AS build-stage
WORKDIR /app
COPY . /app/
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install
RUN npm run build

# 阶段2: 使用 Nginx 镜像将前端应用部署
FROM nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html/fbrowser
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
