/*
 * @Author: yangyuan
 * @Date: 2020-04-13 16:26:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:04:37
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
            path: "/",
            name: "Index",
            component: () => import("@/views/home"),
            meta: {
                title: "海宝安检首页"
            }
        },
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
        },
        {
            path: "/search",
            name: "search",
            component: () => import("@/views/search"),
            meta: {
                title: "公共课件搜索"
            }
        },
        {
            path: "/news",
            name: "news",
            component: () => import("@/views/news"),
            meta: {
                title: "海宝安检资讯"
            }
        },
        {
            path: "/news/detail/:id",
            name: "newsDetail",
            component: () => import("@/views/news/detail"),
            meta: {
                title: "资讯详情"
            }
        },
        {
            path: "/my",
            name: "my",
            component: () => import("@/views/my"),
            meta: {
                title: "个人中心",
                requireLogin: true
            }
        },
        {
            path: "/my/message",
            name: "myMessage",
            component: () => import("@/views/my/message"),
            meta: {
                title: "我的消息",
                requireLogin: true
            }
        },
        {
            path: "/my/person",
            name: "myPerson",
            component: () => import("@/views/my/person"),
            meta: {
                title: "我的信息",
                requireLogin: true
            }
        },
        {
            path: "/my/course",
            name: "myCourse",
            component: () => import("@/views/my/course"),
            meta: {
                title: "我的课件",
                requireLogin: true
            }
        },
        {
            path: "/my/task",
            name: "myTask",
            component: () => import("@/views/my/task"),
            meta: {
                title: "我的任务",
                requireLogin: true
            }
        },
        {
            path: "/my/setting",
            name: "mySetting",
            component: () => import("@/views/my/setting"),
            meta: {
                title: "编辑信息",
                requireLogin: true
            }
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/login"),
            meta: {
                title: "登录"
            }
        },
        {
            path: "/comment",
            name: "comment",
            component: () => import("@/views/news/comment"),
            meta: {
                title: "评论",
                requireLogin: true
            }
        }
    ]
});
