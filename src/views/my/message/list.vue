<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:59:05
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-19 19:14:37
 * @Description: 
 -->
<template>
  <div class="message-list">
    <messageItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></messageItem>
  </div>
</template>

<script>
import messageItem from "./item";

export default {
    data() {
        return {};
    },
    components: {
        messageItem
    }
};
</script>

<style lang="less">
.message-list {
}
</style>