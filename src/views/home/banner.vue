<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 23:06:45
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-17 23:25:03
 * @Description: 
 -->
<template>
  <Swiper :style="{ height: itemHeight }" :list="list" :index="index" :itemWidth="wrapperWidth" @toggleIndex="toggleIndex">
    <template #banner>
      <ul class="slideshow-item" :style="{ height: itemHeight }">
        <li v-for="(item, index) in list" :style="{ width: itemWidth + 'px' }" @click="pageAction(item.url)" :key="index">
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
            wrapperWidth: 750,
            itemWidth: 750,
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
    created() {
        // const itemWidth = document.documentElement.clientWidth * 0.92;
        // this.wrapperWidth = itemWidth;
        // this.itemWidth = itemWidth;
    },
    methods: {
        pageAction(url) {
            if (url) {
                location.href = url;
            }
        },
        toggleIndex(val) {
            this.index = val;
        }
    }
};
</script>
