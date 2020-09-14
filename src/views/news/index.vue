<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:00:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:24:43
 * @Description: 
 -->
<template>
    <div class="page-view">
        <Header title="海宝安检资讯" v-if="isMiniprogram"></Header>
        <div class="scroll-view-wrapper">
            <div class="box" style="background:#fff;height:100%">
                <List :list="list" v-if="list.length > 0"></List>
                <Empty v-else />
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Empty from "@/components/empty";
import List from "./list.vue";
import utils from "@/widget/utils";
import { news } from "@/model/api";
export default {
    data() {
        return {
            menupB: true,
            isMiniprogram: utils.isMiniprogram(),
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            pageTotal: 0,
            showLoading: false
        };
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
        }
    },
    components: {
        Header,
        Footer,
        List,
        Empty
    },
    mounted() {
        this.getNewsList();
    }
};
</script>

<style lang="less"></style>
