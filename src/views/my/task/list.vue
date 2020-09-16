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
            <taskItem v-for="item in list" :key="item.id" :item="item"></taskItem>
        </template>
        <Empty v-else />
    </div>
</template>

<script>
import taskItem from "./item";
import { task } from "@/model/api";
import utils from "@/widget/utils";
import Empty from "@/components/empty";
import store from "@/widget/store";

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
        Empty
    },
    methods: {
        getTaskList() {
            const userId = store.get("userId", "local");
            this.$showPageLoading();
            const { pageIndex } = this;
            task({
                type: "GET",
                data: {
                    page: pageIndex,
                    userId,
                    size: 10000
                }
            }).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    const { content, total } = res.data;
                    this.list = content;
                }
            });
        }
    },
    mounted() {
        this.getTaskList();
    }
};
</script>

<style lang="less">
.task-list {
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    &.pd20 {
        padding-top: 0.2rem;
    }
}
</style>
