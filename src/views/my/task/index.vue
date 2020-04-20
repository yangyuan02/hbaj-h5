<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 20:14:55
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-20 22:59:52
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <Header title="我的任务"></Header>
      <div class="task-content">
        <List></List>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import List from "./list";
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
.task-content {
    background: linear-gradient(
        180deg,
        rgba(15, 79, 168, 1) 0%,
        rgba(15, 79, 168, 0.98) 100%
    );
    padding-bottom: 0.18rem;
}
</style>