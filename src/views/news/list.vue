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
    data() {
        return {
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false
        };
    },
    components: {
        NewsItem,
        LoadMore
    },
    methods: {
        getNewsList() {
            this.$showPageLoading();
            const { pageIndex } = this;
            news({
                type: "GET",
                data: {
                    page: pageIndex,
                    size: 10000
                }
            }).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    const { content, total } = res.data;
                    if (pageIndex > 1) {
                        setTimeout(() => {
                            this.showLoading = false;
                            this.isScrollLoad = true;
                            this.list = this.list.concat(content || []);
                        }, 500);
                    } else {
                        this.list = content || [];
                    }
                    this.pageTotal = total;
                    if (pageIndex == Math.ceil(total / 10) || !content.length) {
                        this.showLoading = false;
                    }
                }
            });
        },
        scrollLoadList() {
            const winHeight = window.innerHeight;
            const scrollTop = document.scrollingElement.scrollTop;
            const scrollViewHeight = document.querySelector(".scroll-view-wrapper").offsetHeight - 50;
            const realFunc = () => {
                if (winHeight + scrollTop >= scrollViewHeight && this.list.length < this.pageTotal) {
                    this.showLoading = true;
                    this.pageIndex += 1;
                    this.getNewsList();
                } else {
                    this.isScrollLoad = true;
                }
            };
            if (this.isScrollLoad) {
                this.isScrollLoad = false;
                this.timer = window.requestAnimationFrame(realFunc);
            }
        }
    },
    mounted() {
        this.getNewsList();
        // window.addEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.timer);
        // window.removeEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    }
};
</script>
<style lang="less">
.course-list {
    background-color: #fff;
    padding: 0 0.2rem;
}
</style>
