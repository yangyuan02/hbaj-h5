<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <Header title="全部评论" :isBack="true"></Header>
            <div class="comment">
                <List :list="list"></List>
                <div class="" v-show="showLoading">
                    <LoadMore :showLoading="showLoading"></LoadMore>
                </div>
                <div class="comment-input">
                    <input type="text" placeholder="写下你的评论" ref="input" v-model="content" @change="addComment()" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./list";
import Header from "@/components/common/header";
import { comment, addComment } from "@/model/api";
import store from "@/widget/store";
import LoadMore from "@/components/loadMore";
import utils from "@/widget/utils";
export default {
    data() {
        return {
            content: "",
            list: [],
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0
        };
    },
    components: {
        List,
        Header,
        LoadMore
    },
    methods: {
        setInputFocus() {
            this.$refs.input.focus();
        },
        getComment() {
            this.$showPageLoading();
            const { pageIndex } = this;
            const { id } = this.$route.params;
            comment(
                {
                    type: "GET",
                    data: {
                        page: pageIndex,
                        size: 10,
                        relatedId: id,
                        type: "NEWS"
                    }
                },
                "list"
            ).then(res => {
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
                }
            });
        },
        scrollLoadList() {
            const winHeight = window.innerHeight;
            const scrollTop = document.scrollingElement.scrollTop;
            const scrollViewHeight = document.querySelector(".scroll-view-wrapper").offsetHeight - 50;
            const realFunc = () => {
                if (winHeight + scrollTop >= scrollViewHeight && this.recommendProjectList.length < this.pageTotal) {
                    this.showLoading = true;
                    this.pageIndex += 1;
                    this.getComment();
                } else {
                    this.isScrollLoad = true;
                }
            };
            if (this.isScrollLoad) {
                this.isScrollLoad = false;
                this.timer = window.requestAnimationFrame(realFunc);
            }
        },
        addComment() {
            const { id } = this.$route.params;
            const { content } = this;
            this.$showLoading();
            addComment({
                type: "POST",
                data: {
                    content,
                    relatedId: id,
                    type: "NEWS",
                    userId: store.get("userId", "local")
                }
            }).then(res => {
                this.$hideLoading();
                console.log(1);
            });
        }
    },
    mounted() {
        this.getComment();
        window.addEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);

        this.setInputFocus();
    },
    beforeDestroy() {
        cancelAnimationFrame(this.timer);
        window.removeEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    }
};
</script>

<style lang="less">
.comment {
    height: 100%;
    background: #fff;
    .comment-input {
        background: #fff;
        padding: 0.18rem 0.25rem;
        position: fixed;
        bottom: 0;
        left: 0;
        input {
            width: 6.94rem;
            height: 0.61rem;
            background: rgba(238, 240, 243, 1);
            border-radius: 0.31rem;
            padding-left: 0.28rem;
        }
    }
}
</style>
