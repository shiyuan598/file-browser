import store from "@/store";
import router from "@/router";
import { Base64 } from "js-base64";
import { baseURL } from "@/utils/constants";

export function autoLogin() {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJ6aC1jbiIsInZpZXdNb2RlIjoibW9zYWljIiwic2luZ2xlQ2xpY2siOmZhbHNlLCJwZXJtIjp7ImFkbWluIjpmYWxzZSwiZXhlY3V0ZSI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJyZW5hbWUiOnRydWUsIm1vZGlmeSI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzaGFyZSI6dHJ1ZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6dHJ1ZSwiaGlkZURvdGZpbGVzIjpmYWxzZSwiZGF0ZUZvcm1hdCI6ZmFsc2V9LCJpc3MiOiJGaWxlIEJyb3dzZXIiLCJleHAiOjE3MDAxOTA5NDUsImlhdCI6MTcwMDE4Mzc0NX0.hSUiz_taLGQv5zhw4WtU7WL37JuCfblB3Yf_IKBLDSo";
    const userData = {
        id: 1,
        locale: "zh-cn",
        viewMode: "list",
        singleClick: false,
        perm: {
            admin: false,
            execute: true,
            create: true,
            rename: true,
            modify: true,
            delete: true,
            share: true,
            download: true
        },
        commands: [],
        lockPassword: true,
        hideDotfiles: false,
        dateFormat: false
    };
    document.cookie = `auth=${token}; path=/`;

    localStorage.setItem("jwt", token);
    store.commit("setJWT", token);
    store.commit("setUser", userData);
}

export function parseToken(token) {
    const parts = token.split(".");

    console.info(`token: ${token}`, parts.length);
    if (parts.length !== 3) {
        throw new Error("token malformed");
    }

    const data = JSON.parse(Base64.decode(parts[1]));
    console.info(1232);
    console.info(`data:${data}`);
    const userData = {
        id: 1,
        locale: "zh-cn",
        viewMode: "list",
        singleClick: false,
        perm: {
            admin: false,
            execute: true,
            create: true,
            rename: true,
            modify: true,
            delete: true,
            share: true,
            download: true
        },
        commands: [],
        lockPassword: true,
        hideDotfiles: false,
        dateFormat: false
    };
    console.info(`token:${token}, data: ${JSON.stringify(data)}`);

    document.cookie = `auth=${token}; path=/`;

    localStorage.setItem("jwt", token);
    store.commit("setJWT", token);
    store.commit("setUser", userData);
}

export async function validateLogin() {
    try {
        if (localStorage.getItem("jwt")) {
            await renew(localStorage.getItem("jwt"));
        }
    } catch (_) {
        console.warn("Invalid JWT token in storage"); // eslint-disable-line
    }
}

export async function login(username, password, recaptcha) {
    const data = { username, password, recaptcha };

    const res = await fetch(`${baseURL}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // const body = await res.text();
    const body =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJsb2NhbGUiOiJ6aC1jbiIsInZpZXdNb2RlIjoibW9zYWljIiwic2luZ2xlQ2xpY2siOmZhbHNlLCJwZXJtIjp7ImFkbWluIjpmYWxzZSwiZXhlY3V0ZSI6dHJ1ZSwiY3JlYXRlIjp0cnVlLCJyZW5hbWUiOnRydWUsIm1vZGlmeSI6dHJ1ZSwiZGVsZXRlIjp0cnVlLCJzaGFyZSI6dHJ1ZSwiZG93bmxvYWQiOnRydWV9LCJjb21tYW5kcyI6W10sImxvY2tQYXNzd29yZCI6dHJ1ZSwiaGlkZURvdGZpbGVzIjpmYWxzZSwiZGF0ZUZvcm1hdCI6ZmFsc2V9LCJpc3MiOiJGaWxlIEJyb3dzZXIiLCJleHAiOjE3MDAxOTA5NDUsImlhdCI6MTcwMDE4Mzc0NX0.hSUiz_taLGQv5zhw4WtU7WL37JuCfblB3Yf_IKBLDSo";

    if (res.status > 200 && res.status < 301) {
        parseToken(body);
    } else {
        throw new Error(body);
    }
}

export async function renew(jwt) {
    const res = await fetch(`${baseURL}/api/renew`, {
        method: "POST",
        headers: {
            "X-Auth": jwt
        }
    });

    const body = await res.text();

    if (res.status === 200) {
        parseToken(body);
    } else {
        throw new Error(body);
    }
}

export async function signup(username, password) {
    const data = { username, password };

    const res = await fetch(`${baseURL}/api/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (res.status !== 200) {
        throw new Error(res.status);
    }
}

export function logout() {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";

    store.commit("setJWT", "");
    store.commit("setUser", null);
    localStorage.setItem("jwt", null);
    router.push({ path: "/login" });
}
