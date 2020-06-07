<template>
    <div class="comment-list">
        <CommentItem v-for="(item, index) in [1, 2, 3, 4, 5]" :key="index"></CommentItem>
    </div>
</template>

<script>
import CommentItem from "./item";
export default {
    data() {
        return {};
    },
    components: {
        CommentItem
    }
};
</script>

<style lang="less">
.comment-list {
    padding: 0 0.25rem;
}
</style>
