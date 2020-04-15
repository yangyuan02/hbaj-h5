<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 22:15:29
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 20:49:26
 * @Description: 
 -->
<template>
    <footer>
        <ul>
            <li
                v-for="(item, index) in list"
                :key="index"
                :class="{ active: item.active }"
            >
                <div class="menu-bg">
                    <i
                        class="iconfont"
                        :class="[item.icon ? item.icon : '']"
                    ></i>
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
                    icon: "icontubiao-02",
                    bgColor: "rgba(254, 213, 26, 1)",
                    title: "首页",
                    active: true
                },
                {
                    icon: "icontubiao-01",
                    bgColor: "rgba(255, 158, 58, 1)",
                    title: "公共课件"
                },
                {
                    icon: "icontubiao-04",
                    bgColor: "rgba(148, 203, 243, 1)",
                    title: "新闻咨询"
                },
                {
                    icon: "icontubiao-03",
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
