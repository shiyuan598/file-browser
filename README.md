# file-browser

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### mock data api

json-server

npm install -g json-server

json-server 目录中添加 config.json,routes.json,db.json

package.json 中添加启动命令：
json-server -c json-server/config.json json-server/db.json

[参考](https://www.qinglite.cn/doc/1489647678d31cbf6)

### 参考

[filebrowser demo](https://demo.filebrowser.org/files/a/)

#### 修改记录

-   src/router/index.js 去掉路由中登录检查
-   store中添加user初始数据，跳过用户检查
-   去掉eslint,添加dockerfile、nginx配置
