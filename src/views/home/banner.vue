<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 23:06:45
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 23:39:16
 * @Description: 
 -->
<template>
    <Swiper :style="{ height: itemHeight }" :list="list" :index="index" :itemWidth="wrapperWidth" @toggleIndex="toggleIndex">
        <template #banner>
            <ul class="slideshow-item" :style="{ height: itemHeight }">
                <li v-for="(item, index) in list" :style="{ width: itemWidth + 'px' }" @click="pageAction(item)" :key="index">
                    <img :src="globalConfig.imagePath + item.url" :style="{ width: itemWidth + 'px', height: itemHeight }" />
                </li>
            </ul>
        </template>
        <template #dot>
            <ul class="slideshow-dots">
                <li v-for="(item, $index) in bannerList" :class="{ active: $index == index - 1 }" :key="$index"></li>
            </ul>
        </template>
    </Swiper>
</template>

<script>
import Swiper from "@/components/swiper";
export default {
    data() {
        return {
            index: 1,
            wrapperWidth: document.documentElement.clientWidth,
            itemWidth: document.documentElement.clientWidth,
            itemHeight: "3.58rem"
        };
    },
    props: {
        bannerList: {
            type: Array,
            default: []
        }
    },
    components: {
        Swiper
    },
    computed: {
        list() {
            const list = Object.assign([], this.bannerList);
            if (list && list.length) {
                const len = list.length;
                const firstIndex = list[len - 1];
                const lastIndex = list[0];
                list.unshift(lastIndex);
                list.push(firstIndex);
            }
            return list;
        }
    },
    methods: {
        pageAction({ type, aim_id }) {
            if (type === "PROJECT") {
                this.$router.push({
                    name: "panoEditor",
                    params: {
                        taskId: "0",
                        projectId: aim_id,
                        from: "2"
                    }
                });
            } else {
                this.$router.push({
                    name: "newsDetail",
                    params: {
                        id: aim_id
                    }
                });
            }
        },
        toggleIndex(val) {
            this.index = val;
        }
    }
};
</script>
