<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 15:25:12
 * @Description: 
 -->
<template>
    <div class="course-list">
        <NewsItem v-for="item in list" :key="item.id" :item="item"></NewsItem>
        <div class="" v-show="showLoading">
            <LoadMore :showLoading="showLoading"></LoadMore>
        </div>
    </div>
</template>

<script>
import NewsItem from "@/components/news";
import { news } from "@/model/api";
import utils from "@/widget/utils";
import LoadMore from "@/components/loadMore";
export default {
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {};
    },
    components: {
        NewsItem,
        LoadMore
    }
};
</script>
<style lang="less">
.course-list {
    background-color: #fff;
    padding: 0 0.2rem;
    position: relative;
    // height: 100%;
}
</style>
