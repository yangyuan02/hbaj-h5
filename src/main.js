/*
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-17 23:23:05
 * @Description:
 */
import Vue from "vue";
import Application from "./App.vue";
import router from "./router";
import Toast from "@/components/toast";
import loading from "@/components/loading";
import pageLoading from "@/components/pageLoading";
import showModal from "@/components/showModal";
import filters from "./filters";
import "@/widget/skeleton";
import store from "@/widget/store";
import vconsole from "vconsole";

// let vConsole = new vconsole();

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.use(showModal);
Vue.use(loading);
Vue.use(pageLoading);
Vue.use(Toast);

Vue.prototype.globalConfig = window.globalConfig;
if (window.__wxjs_environment === "miniprogram") {
    // 微信小程序环境
    const searchParasm = new URLSearchParams(location.search);
    const authorization = searchParasm.get("authorization");
    const userId = searchParasm.get("userId");
    if (authorization && userId) {
        store.set("authorization", authorization, "local");
        store.set("userId", userId, "local");
    }
}
router.beforeEach((to, from, next) => {
    if (to.name == "login" && window.localStorage.getItem("authorization")) {
        //解决登陆后 用户输入登录地址重定向到首页
        next({ path: "/home" });
    }

    if (to.meta.requireLogin) {
        // 是需要登录的页面
        if (window.localStorage.getItem("authorization")) {
            // token存在 且token没有过期
            next();
        } else {
            next({ path: "/login", query: { from: to.fullPath } });
        }
    } else {
        // 不需要登录的直接next()
        next();
    }
});

router.afterEach(to => {
    document.title = to.meta.title;
});
new Vue({
    el: "#app",
    router,
    render: h => h(Application)
});
