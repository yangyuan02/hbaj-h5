<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:44:26
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-03 23:38:08
 * @Description: 
 -->
<template>
    <nav>
        <ul>
            <li v-for="(item, index) in listNav" :key="index" :class="[$route.query.name === item.title ? 'active' : '']" @click="handClick(item)">
                <div class="nav-bg" :style="{ background: item.bgColor }">
                    <i class="iconfont" :class="[item.icon ? item.icon : '']"></i>
                </div>
                <div class="nav-title">
                    <span>{{ item.title }}</span>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            // list: [
            //     {
            //         icon: "icontubiao-05",
            //         bgColor: "#0F4FA8",
            //         title: "技术解读",
            //         order: 1
            //     },
            //     {
            //         icon: "icontubiao-06",
            //         bgColor: "#FF6600",
            //         title: "专业英语",
            //         order: 2
            //     },
            //     {
            //         icon: "icontubiao-07",
            //         bgColor: "#FF9E3A",
            //         title: "模拟训练",
            //         order: 3
            //     }
            // ]
            list: globalConfig.defaultInfo.APP_DEFAULT_MODULE.map(item => JSON.parse(item)).map(item => ({
                title: item.title,
                bgColor: item.bgColor,
                icon: item.icon
            }))
        };
    },
    props: {
        modulesList: {
            type: Array,
            default: []
        },
        path: {
            type: String,
            default: ""
        }
    },
    computed: {
        listNav: function() {
            return (this.modulesList || [])
                .map(item => ({
                    ...item,
                    ...this.list.find(k => k.title === item.name)
                }))
                .sort((a, b) => {
                    return a.order - b.order;
                });
        }
    },
    methods: {
        handClick(data) {
            const { title, children } = data;
            const query = {
                name: title
            };
            if (children && children.length > 0) {
                query.moduleId = children[1].id;
                query.blockId = children[1].blockId;
                if (children[0].classList && children[0].classList.length > 0) {
                    query.classListId = children[0].classList[0].id;
                }
            }
            this.$router.push({
                path: this.path,
                query
            });
        }
    }
};
</script>

<style lang="less">
nav {
    width: 100%;
    height: 2rem;
    background: rgba(255, 255, 255, 1);
    ul {
        display: flex;
        justify-content: space-around;
        height: 100%;
        padding-top: 0.35rem;
        padding-bottom: 0.25rem;
        li {
            .nav-bg {
                width: 0.81rem;
                height: 0.81rem;
                background: rgba(254, 213, 26, 1);
                border-radius: 0.1rem;
                margin: 0 auto;
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    font-size: 0.46rem;
                    color: #fff;
                }
            }
            .nav-title {
                margin-top: 0.24rem;
                span {
                    color: rgba(102, 102, 102, 1);
                    font-size: 0.26rem;
                    line-height: 0.35rem;
                }
            }
            &.active {
                .nav-title {
                    span {
                        color: rgba(255, 158, 58, 1);
                    }
                }
            }
        }
    }
}
</style>
