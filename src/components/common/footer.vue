<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 22:15:29
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-08 23:43:35
 * @Description: 
 -->
<template>
  <footer style="padding-bottom:.34rem">
    <ul>
      <li v-for="(item, index) in list" :key="index" :class="{ active:$route.path.startsWith(item.path) }" @click="goTo(item.path)">
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
export default {
    data() {
        return {
            isWeixinIphoneX: utils.isWeixinIphoneX(),
            list: [
                {
                    icon: "icontubiao-02",
                    bgColor: "rgba(254, 213, 26, 1)",
                    title: "首页",
                    path: "/home"
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
                    title: "新闻咨询",
                    path: "/news"
                },
                {
                    icon: "icontubiao-03",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "我的",
                    path: "/my"
                }
            ]
        };
    },
    methods: {
        goTo(path) {
            this.$router.push({ path });
        }
    }
};
</script>

<style lang="less">
footer {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border: 0.01rem solid rgba(221, 221, 221, 1);
    position: fixed;
    left: 0;
    bottom: 0;
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
