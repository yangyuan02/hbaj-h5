<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 15:25:12
 * @Description: 
 -->
<template>
  <div class="course-list">
    <NewsItem v-for="(item, index) in list" :key="item.id" :item="item"></NewsItem>
  </div>
</template>

<script>
import NewsItem from "@/components/news";
import { news } from "@/model/api";
export default {
    data() {
        return {
            list: []
        };
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
                this.$hideLoading();
                if (res.suceeded) {
                    const { content } = res.data;
                    this.list = content;
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
