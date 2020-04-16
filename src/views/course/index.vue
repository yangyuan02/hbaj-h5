<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:46:41
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-16 23:32:54
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <Header title="公共课件资源"></Header>
      <Search></Search>
      <Nav></Nav>
      <SubMenu></SubMenu>
      <div class="course-content">
        <List></List>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style lang="less">
.course-content {
    width: 100%;
    background: #fff;
}
</style>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Search from "@/components/search";
import Nav from "@/components/nav";
import List from "./list.vue";
import SubMenu from "./submenu.vue";
export default {
    data() {
        return {};
    },
    components: {
        Nav,
        Header,
        Footer,
        Search,
        List,
        SubMenu
    }
};
</script>
