<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:11:00
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:24:36
 * @Description: 
 -->
<template>
    <div class="task-list" :class="[isPaddingTop ? '' : 'pd20']">
        <template v-if="list.length > 0">
            <taskItem v-for="(item, index) in list" :key="index" :item="item"></taskItem>
        </template>
        <Empty v-else />
        <div class="" v-show="showLoading">
            <LoadMore :showLoading="showLoading"></LoadMore>
        </div>
    </div>
</template>

<script>
import taskItem from "./item";
import { task } from "@/model/api";
import utils from "@/widget/utils";
import LoadMore from "@/components/loadMore";
import Empty from "@/components/empty";

export default {
    data() {
        return {
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0
        };
    },
    props: {
        isPaddingTop: {
            default: false,
            type: Boolean
        }
    },
    components: {
        taskItem,
        LoadMore,
        Empty
    },
    methods: {
        getTaskList() {
            this.$showPageLoading();
            const { pageIndex } = this;
            task({
                type: "GET",
                data: {
                    page: pageIndex,
                    size: 10000
                }
            }).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    const { content, total } = res.data;
                    this.list = content;
                    // if (pageIndex > 1) {
                    //     setTimeout(() => {
                    //         this.showLoading = false;
                    //         this.isScrollLoad = true;
                    //         this.list = this.list.concat(content || []);
                    //     }, 500);
                    // } else {
                    //     this.list = content || [];
                    // }
                    // this.pageTotal = total;
                    // if (pageIndex == Math.ceil(total / 10) || !content.length) {
                    //     this.showLoading = false;
                    // }
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
                    this.getTaskList();
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
        this.getTaskList();
        // window.addEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    },
    beforeDestroy() {
        // cancelAnimationFrame(this.timer);
        // window.removeEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    }
};
</script>

<style lang="less">
.task-list {
    height: 100%;
    &.pd20 {
        padding-top: 0.2rem;
    }
}
</style>
