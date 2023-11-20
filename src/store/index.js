import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import getters from "./getters";
import upload from "./modules/upload";

Vue.use(Vuex);

const state = {
    user: {
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
    },
    req: {},
    oldReq: {},
    clipboard: {
        key: "",
        items: []
    },
    jwt: "",
    progress: 0,
    loading: false,
    reload: false,
    selected: [],
    multiple: false,
    prompts: [],
    showShell: false
};

export default new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    modules: { upload }
});
