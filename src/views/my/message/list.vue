<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:59:05
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-17 23:52:34
 * @Description: 
 -->
<template>
    <div class="message-list">
        <template v-if="list.length > 0">
            <messageItem v-for="item in list" :key="item.id" :item="item"></messageItem>
        </template>
        <Empty v-else />
        <div class="" v-show="showLoading">
            <LoadMore :showLoading="showLoading"></LoadMore>
        </div>
    </div>
</template>

<script>
import messageItem from "./item";
import { messageDetail } from "@/model/api";
import store from "@/widget/store";
import utils from "@/widget/utils";
import LoadMore from "@/components/loadMore";
import Empty from "@/components/empty";

export default {
    data() {
        return {
            userId: store.get("userId", "local"),
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false
        };
    },
    components: {
        messageItem,
        LoadMore,
        Empty
    },
    methods: {
        getMessageList() {
            this.$showPageLoading();
            const { pageIndex } = this;
            messageDetail(
                {
                    type: "get",
                    data: {
                        page: pageIndex,
                        size: "10000",
                        receiver: this.userId
                    }
                },
                "private"
            ).then(res => {
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
                    this.getMessageList();
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
        this.getMessageList();
        // window.addEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.timer);
        // window.removeEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    }
};
</script>

<style lang="less">
.message-list {
    padding: 0.18rem 0;
    background: #fff;
}
</style>
