<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <Header title="全部评论" :isBack="true"></Header>
            <div class="comment">
                <List></List>
                <div class="comment-input">
                    <input type="text" placeholder="写下你的评论" ref="input" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./list";
import Header from "@/components/common/header";
export default {
    data() {
        return {};
    },
    components: {
        List,
        Header
    },
    methods: {
        setInputFocus() {
            this.$refs.input.focus();
        }
    },
    mounted() {
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
