const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src")
            }
        }
    },
    devServer: {
        proxy: {
            "/api": {
                target: "http://127.0.0.1:5000",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "" // 如果请求地址中不需要 '/api' 前缀，可以将其重写为空
                }
            }
        }
    }
});
