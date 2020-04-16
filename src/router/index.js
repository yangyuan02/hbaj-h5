/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 23:54:43
 * @Description:
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    // 河南太平洋保险 hd---河南 保险--insurance  requireLogin为true必须登录的页面
    mode: "history",
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: [
        {
            path: "/home",
            name: "home",
            component: () => import("@/views/home"),
            meta: {
                title: "海宝安检首页"
            }
        },
        {
            path: "/course",
            name: "course",
            component: () => import("@/views/course"),
            meta: {
                title: "公共课件资源"
            }
        }
    ]
});
