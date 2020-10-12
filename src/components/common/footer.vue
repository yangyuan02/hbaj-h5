<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 22:15:29
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-03 23:38:28
 * @Description: 
 -->
<template>
    <footer>
        <ul>
            <li v-for="(item, index) in list" :key="index" :class="{ active: $route.path.startsWith(item.path) || item.name === $route.name }" @click="goTo(item.path)">
                <div class="menu-bg">
                    <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
                </div>
                <div class="menu-title">
                    <span>{{ item.title }}</span>
                </div>
            </li>
        </ul>
    </footer>
</template>
<script>
import utils from "@/widget/utils";
import store from "@/widget/store";
export default {
    data() {
        return {
            isWeixinIphoneX: utils.isWeixinIphoneX(),
            list: [
                {
                    icon: "icontubiao-02",
                    bgColor: "rgba(254, 213, 26, 1)",
                    title: "首页",
                    path: "/home",
                    name: "Index"
                },
                {
                    icon: "icontubiao-01",
                    bgColor: "rgba(255, 158, 58, 1)",
                    title: "公共课件",
                    path: "/course"
                },
                {
                    icon: "icontubiao-04",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "新闻资讯",
                    path: "/news"
                },
                {
                    icon: "icontubiao-03",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "我的",
                    path: "/my"
                }
            ],
            modulesList: store.get("modulesList", "local")
        };
    },
    methods: {
        goTo(path) {
            if (path === "/course") {
                const { name, children } = this.modulesList[0];
                const query = {
                    name
                };
                if (children && children.length > 0) {
                    query.moduleId = children[1].id;
                    query.blockId = children[1].blockId;
                    if (children[0].classList && children[0].classList.length > 0) {
                        query.classListId = children[0].classList[0].id;
                    }
                }
                this.$router.push({
                    path: "/course",
                    query
                });
            } else {
                this.$router.push({ path });
            }
        },
        safaireBotton() {
            /* 原可视区域 */
            var innerHeight = window.innerHeight;
            console.log(innerHeight);
            window.οnresize = function() {
                console.log(window.innerHeight);
                /* safari浏览器的操作栏隐藏时可视区域会变大 */
                if (window.innerHeight > innerHeight) {
                    /* 
                #tabBar 是底部导航栏的选择器
                通过 修改style值 或 改变class值 请自行决定
             */
                    document.querySelector("footer").style.paddingBottom = "0.34rem";
                } else {
                    document.querySelector("footer").style.paddingBottom = "0rem";
                }
            };
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.safaireBotton();
        });
    }
};
</script>

<style lang="less">
footer {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(221, 221, 221, 1);
    ul {
        display: flex;
        justify-content: space-around;
        height: 100%;
        padding-top: 0.17rem;
        padding-bottom: 0.12rem;
        li {
            flex: 1;
            .menu-bg {
                text-align: center;
                i {
                    font-size: 0.34rem;
                    color: rgba(219, 219, 219, 1);
                }
            }
            .menu-title {
                margin-top: 0.11rem;
                text-align: center;
                span {
                    color: rgba(102, 102, 102, 1);
                    font-size: 0.2rem;
                    line-height: 0.26rem;
                }
            }
            &.active {
                i {
                    color: rgba(15, 79, 168, 1);
                }
            }
        }
    }
}
</style>
