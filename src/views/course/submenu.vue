<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 00:21:12
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-16 00:36:31
 * @Description: 
 -->
<template>
    <div class="sub-menu">
        <ul>
            <li v-for="(item, index) in list" :key="index">
                <div class="sub-menu-bg">
                    <i
                        class="iconfont"
                        :class="[item.icon ? item.icon : '']"
                    ></i>
                </div>
                <div class="sub-menu-title">
                    <span>{{ item.title }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="less">
.sub-menu {
    width: 100%;
    padding-top: 0.22rem;
    background: rgba(255, 255, 255, 1);
    ul {
        display: flex;
        justify-content: space-around;
        height: 100%;
        li {
            width: 25%;
            .sub-menu-bg {
                text-align: center;
                i {
                    font-size: 0.55rem;
                    color: rgba(15, 79, 168, 1);
                }
            }
            .sub-menu-title {
                margin-top: 0.2rem;
                text-align: center;
                span {
                    font-size: 0.26rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(102, 102, 102, 1);
                    line-height: 0.35rem;
                    -webkit-background-clip: text;
                }
            }
            &.active {
                //当前需要加下划线未写完
            }
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            list: [
                {
                    icon: "icontubiao-08",
                    title: "豪华游览"
                },
                {
                    icon: "icontubiao-09",
                    title: "散货船"
                },
                {
                    icon: "icontubiao-10",
                    title: "普通干货船"
                },
                {
                    icon: "icontubiao-11",
                    title: "集装箱船"
                }
            ]
        };
    }
};
</script>
