<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 22:15:29
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 00:06:37
 * @Description: 
 -->
<template>
    <footer>
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <div class="menu-bg">
                    <i></i>
                </div>
                <div class="menu-title">
                    <span>{{ item.title }}</span>
                </div>
            </li>
        </ul>
    </footer>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    icon: "",
                    bgColor: "rgba(254, 213, 26, 1)",
                    title: "首页"
                },
                {
                    icon: "",
                    bgColor: "rgba(255, 158, 58, 1)",
                    title: "公共课件"
                },
                {
                    icon: "",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "新闻咨询"
                },
                {
                    icon: "",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "我的"
                }
            ]
        };
    }
};
</script>

<style lang="less">
footer {
    width: 100%;
    height: 0.98rem;
    background: rgba(255, 255, 255, 1);
    border: 0.01px solid rgba(221, 221, 221, 1);
    position: fixed;
    bottom: 0.98rem;
    left: 0rem;
    ul {
        display: flex;
        justify-content: space-around;
        height: 100%;
        padding-top: 0.17rem;
        padding-bottom: 0.12rem;
        li {
            width: 25%;
            display: flex;
            justify-content: center;
            .menu-bg {
                // width: 0.81rem;
                // height: 0.81rem;
                // background: rgba(254, 213, 26, 1);
                // border-radius: 0.1rem;
                // margin: 0 auto;
            }
            .menu-title {
                margin-top: 0.11rem;
                span {
                    color: rgba(102, 102, 102, 1);
                    font-size: 0.2rem;
                    line-height: 0.26rem;
                }
            }
        }
    }
}
</style>
