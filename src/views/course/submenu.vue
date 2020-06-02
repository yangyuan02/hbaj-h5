<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 00:21:12
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-03 01:10:11
 * @Description: 
 -->
<template>
    <div class="sub-menu">
        <div class="parent-menu">
            <ul>
                <li v-for="(item, index) in shipList" :key="index" :class="[$route.query.blockId.toString() === item.blockId.toString() ? 'active' : '']">
                    <div class="sub-menu-bg">
                        <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
                    </div>
                    <div class="sub-menu-title">
                        <span>{{ item.title }}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="child-meun">
            <ul>
                <li v-for="(item, index) in classList" :key="index" :class="[$route.query.classListId.toString() === item.id.toString() ? 'active' : '']">
                    <span>{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less">
.sub-menu {
    width: 100%;
    padding-top: 0.22rem;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
    padding: 0.2rem 0.2rem;
    margin: 0.2rem 0rem;
    .parent-menu {
        ul {
            display: flex;
            // justify-content: space-around;
            height: 100%;
            touch-action: pan-x;
            overflow-x: auto;
            padding-bottom: 0.2rem;
            li {
                width: 25%;
                flex-shrink: 0;
                padding-bottom: 0.1rem;
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
                    border-bottom: 0.02rem solid rgba(15, 79, 168, 1);
                    .sub-menu-title {
                        span {
                            color: rgba(15, 79, 168, 1);
                        }
                    }
                }
            }
        }
    }
    .child-meun {
        ul {
            display: flex;
            // justify-content: space-around;
            height: 100%;
            touch-action: pan-x;
            overflow-x: auto;
            padding: 0.1rem 0;
            li {
                flex-shrink: 0;
                padding: 0.02rem 0.2rem;
                span {
                    font-size: 0.26rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 0.35rem;
                    -webkit-background-clip: text;
                    color: rgba(102, 102, 102, 1);
                }
                &.active {
                    background: rgba(255, 158, 58, 1);
                    border-radius: 0.04rem;
                    span {
                        color: #fff;
                    }
                }
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
                    title: "豪华邮轮"
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
            ],
            classList: [],
            shipList: []
        };
    },
    props: {
        modulesList: {
            type: Array,
            default: []
        }
    },
    watch: {
        $route: {
            handler() {
                this.getShipList();
                this.getClassList();
            },
            immediate: true
        }
    },
    methods: {
        getShipList() {
            const { name } = this.$route.query;
            this.shipList = [];
            const shipList = this.modulesList.filter(item => item.name === name);
            const list = (shipList[0]["children"] || []).map(item => ({
                ...item,
                ...this.list.find(k => k.title === item.blockName)
            }));
            this.shipList = list;
        },
        getClassList() {
            const { blockId } = this.$route.query;
            this.classList = [];
            this.classList = (this.shipList || []).find(item => item.blockId.toString() === blockId.toString())["classList"];
        }
    }
};
</script>
