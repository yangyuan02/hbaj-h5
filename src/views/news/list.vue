<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-08 20:15:44
 * @Description: 
 -->
<template>
  <div class="course-list">
    <NewsItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></NewsItem>
  </div>
</template>

<script>
import NewsItem from "@/components/news";
import { news } from "@/model/api";
export default {
    data() {
        return {};
    },
    components: {
        NewsItem
    },
    methods: {
        getNewsList() {
            this.$showLoading();
            news({
                type: "GET",
                data: {
                    page: 1,
                    size: 10
                }
            }).then(res => {
                if (res.suceeded) {
                    console.log(res);
                    this.$hideLoading();
                }
            });
        }
    },
    mounted() {
        this.getNewsList();
    }
};
</script>
<style lang="less">
.course-list {
    background-color: #fff;
    padding: 0 0.2rem;
}
</style>
