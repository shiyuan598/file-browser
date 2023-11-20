import { fileURLToPath, URL } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import { compression } from "vite-plugin-compression2";
import pluginRewriteAll from "vite-plugin-rewrite-all";
import dotenv from 'dotenv';

const plugins = [
    vue2(),
    legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    }),
    // compression({ include: /\.js$/i, deleteOriginalAssets: true }),
    pluginRewriteAll() // fixes 404 error with paths containing dot in dev server
];

const resolve = {
    alias: {
        vue: "vue/dist/vue.esm.js",
        "@/": `${path.resolve(__dirname, "src")}/`
    }
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    return {
        base: "/fbrowser",
        define: {
            'import.meta.env': JSON.stringify(dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development' }).parsed)
          },
        plugins,
        resolve,
        server: {
            proxy: {
                "/api/command": {
                    target: "ws://127.0.0.1:8080",
                    ws: true
                },
                "/api": {
                    target: "http://127.0.0.1:5000",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": "" // 如果请求地址中不需要 '/api' 前缀，可以将其重写为空
                    }
                }
            }
        }
    };
    if (command === "serve") {
        return {
            plugins,
            resolve,
            server: {
                proxy: {
                    "/api/command": {
                        target: "ws://127.0.0.1:8080",
                        ws: true
                    },
                    "/api": {
                        target: "http://127.0.0.1:5000",
                        changeOrigin: true,
                        pathRewrite: {
                            "^/api": "" // 如果请求地址中不需要 '/api' 前缀，可以将其重写为空
                        }
                    }
                }
            }
        };
    } else {
        // command === 'build'
        return {
            plugins,
            resolve,
            base: "",
            build: {
                rollupOptions: {
                    input: {
                        index: fileURLToPath(new URL(`./public/index.html`, import.meta.url))
                    }
                }
            },
            experimental: {
                renderBuiltUrl(filename, { hostType }) {
                    if (hostType === "js") {
                        return { runtime: `window.__prependStaticUrl("${filename}")` };
                    } else if (hostType === "html") {
                        return `[{[ .StaticURL ]}]/${filename}`;
                    } else {
                        return { relative: true };
                    }
                }
            }
        };
    }
});
