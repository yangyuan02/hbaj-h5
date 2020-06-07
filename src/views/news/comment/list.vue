<template>
    <div class="comment-list">
        <CommentItem v-for="(item, index) in list" :key="index"></CommentItem>
    </div>
</template>

<script>
import CommentItem from "./item";
import { comment } from "@/model/api";
export default {
    data() {
        return {};
    },
    components: {
        CommentItem
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    }
};
</script>

<style lang="less">
.comment-list {
    padding: 0 0.25rem;
}
</style>
