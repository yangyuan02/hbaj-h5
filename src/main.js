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

Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

Vue.use(showModal);
Vue.use(loading);
Vue.use(pageLoading);
Vue.use(Toast);

Vue.prototype.globalConfig = window.globalConfig;
const metaEl = document.querySelector('meta[name="viewport"]');
const oldattr = metaEl.getAttribute("content");
router.beforeEach((to, from, next) => {
    if (to.name == "panoEditor") {
        metaEl.setAttribute("content", "width=device-width,user-scalable=no,initial-scale=" + 1 + ",maximum-scale=" + 1 + ",minimum-scale=" + 1);
    } else {
        metaEl.setAttribute("content", oldattr);
    }

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
            next({ path: "/login", query: { from: location.href } });
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
