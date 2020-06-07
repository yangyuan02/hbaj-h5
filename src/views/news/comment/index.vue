<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <Header title="全部评论" :isBack="true"></Header>
            <div class="comment">
                <List :list="list"></List>
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
export default {
    data() {
        return {
            content: "",
            list: []
        };
    },
    components: {
        List,
        Header
    },
    methods: {
        setInputFocus() {
            this.$refs.input.focus();
        },
        getComment() {
            this.$showPageLoading();
            const { id } = this.$route.params;
            comment(
                {
                    type: "GET",
                    data: {
                        page: 1,
                        size: 10,
                        type: "NEWS"
                    }
                },
                "all"
            ).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    this.list = res.data;
                }
            });
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
        this.setInputFocus();
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
