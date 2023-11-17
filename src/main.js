import "whatwg-fetch";
import cssVars from "css-vars-ponyfill";
import { sync } from "vuex-router-sync";
import store from "@/store";
import router from "@/router";
import i18n from "@/i18n";
import Vue from "@/utils/vue";
import { recaptcha, loginPage } from "@/utils/constants";
import { autoLogin, login, validateLogin } from "@/utils/auth";
import App from "@/App.vue";

cssVars();

sync(store, router);

async function start() {
    autoLogin();
    // new Vue({
    //     el: "#app",
    //     store,
    //     router,
    //     i18n,
    //     template: "<App/>",
    //     components: { App }
    // });

    new Vue({
        store,
        router,
        i18n,
        render: (h) => h(App),
      }).$mount("#app");
}

start();
