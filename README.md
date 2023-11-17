# filebrowser-frontend

### Getting Started

Install dependencies

```
$ npm install
```

Start the dev server

```
$ npm run dev
```

### mock data api

json-server

npm install -g json-server

json-server目录中添加config.json,routes.json,db.json

package.json中添加启动命令：
json-server -c json-server/config.json json-server/db.json

[参考](https://www.qinglite.cn/doc/1489647678d31cbf6)

### 参考

[filebrowser demo](https://demo.filebrowser.org/files/a/)

### TODO:

-   修改为vue cli 避免微前端时的不可预知错误
