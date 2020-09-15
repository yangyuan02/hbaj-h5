<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:38:27
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:07:01
 * @Description: 
 -->
<template>
    <div class="page-view myIndex">
        <div class="scroll-view-wrapper">
            <div class="my-content">
                <my-header :info="user" :isBack="false"></my-header>
                <div class="my-list-content">
                    <ul>
                        <li v-for="(item, index) in list" :key="index" @click="goTo(item.path)">
                            <div class="info">
                                <i class="iconfont" :class="[item.icon ? item.icon : '']" :style="{ color: item.color }"></i>
                                <span>{{ item.text }}</span>
                                <span v-if="item.text === '我的通知' && count !== 0" class="unreadCount">{{ count }}</span>
                            </div>
                            <div class="arrows">
                                <i class="iconfont icontubiao-13"></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import MyHeader from "@/components/my-header";
import Footer from "@/components/common/footer";
import { user, messageDetail } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            list: [
                {
                    icon: "icontubiao-14",
                    text: "我的信息",
                    color: "rgba(224, 32, 32, 1)",
                    path: "/my/person"
                },
                {
                    icon: "icontubiao-15",
                    text: "我的课件",
                    color: "rgba(60, 206, 181, 1)",
                    path: "/my/course"
                },
                {
                    icon: "icontubiao-17",
                    text: "我的任务",
                    color: "rgba(255, 157, 59, 1)",
                    path: "/my/task"
                },
                {
                    icon: "icontubiao-16",
                    text: "我的通知",
                    color: "rgba(238, 27, 27, 1)",
                    path: "/my/message"
                }
            ],
            user: {},
            count: 0,
            modulesList: store.get("modulesList", "local")
        };
    },
    components: {
        MyHeader,
        Footer
    },
    methods: {
        goTo(path) {
            if (path === "/my/course") {
                const { name, children } = this.modulesList[0];
                const query = {
                    name
                };
                if (children && children.length > 0) {
                    query.moduleId = children[0].id;
                    query.blockId = children[0].blockId;
                    if (children[0].classList && children[0].classList.length > 0) {
                        query.classListId = children[0].classList[0].id;
                    }
                }
                this.$router.push({
                    path: "/my/course",
                    query
                });
            } else {
                this.$router.push({ path });
            }
        },
        getUserDetail() {
            const userId = store.get("userId", "local");
            this.$showPageLoading();
            user(
                {
                    type: "get"
                },
                userId
            ).then(
                res => {
                    this.$hidePageLoading();
                    if (res.suceeded) {
                        this.user = res.data;
                    }
                },
                err => {
                    this.$hidePageLoading();
                }
            );
        },
        getMessageDetail() {
            messageDetail(
                {
                    type: "get"
                },
                "unreadCount"
            ).then(res => {
                if (res.suceeded) {
                    const { count } = res.data;
                    this.count = count;
                }
                console.log(res);
            });
        }
    },
    mounted() {
        this.getUserDetail();
        this.getMessageDetail();
    }
};
</script>

<style lang="less">
.myIndex {
    .my-content {
        background: rgba(245, 245, 245, 1);
        height: 100%;
        .my-list-content {
            width: 7rem;
            height: calc(100% - 3.9rem);
            background: #fff;
            margin: 0 auto;
            border-radius: 0.21rem 0.21rem 0 0;
            transform: translateY(-0.5rem);
            ul {
                padding-left: 0.38rem;
                padding-right: 0.4rem;
                li {
                    padding-top: 0.26rem;
                    padding-bottom: 0.26rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 0.02rem solid rgba(238, 238, 238, 1);
                    .info {
                        i {
                            font-size: 0.32rem;
                        }
                        span {
                            font-size: 0.28rem;
                            font-family: MicrosoftYaHei;
                            color: rgba(51, 51, 51, 1);
                            line-height: 0.37rem;
                            -webkit-background-clip: text;
                            margin-left: 0.3rem;
                        }
                        .unreadCount {
                            width: 0.44rem;
                            height: 0.44rem;
                            background: rgba(238, 27, 27, 1);
                            text-align: center;
                            line-height: 0.44rem;
                            border-radius: 50%;
                            color: #fff;
                            display: inline-block;
                        }
                    }
                    .arrows {
                        i {
                            transform: rotate(180deg);
                            font-size: 0.24rem;
                            color: rgba(153, 153, 153, 1);
                        }
                    }
                }
            }
        }
    }
}
</style>
