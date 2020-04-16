<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:00:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-16 23:30:57
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <Header title="海宝安检资讯"></Header>
      <List></List>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import List from "./list.vue";
export default {
    data() {
        return {};
    },
    components: {
        Header,
        Footer,
        List
    }
};
</script>

<style lang="less">
</style>