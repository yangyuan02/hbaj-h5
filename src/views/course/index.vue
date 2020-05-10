<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:46:41
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 17:48:51
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
        <List :recommendProjectList="recommendProjectList"></List>
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
import { home } from "@/model/api";
export default {
    data() {
        return {
            recommendProjectList: []
        };
    },
    components: {
        Nav,
        Header,
        Footer,
        Search,
        List,
        SubMenu
    },
    methods: {
        getCourseList() {
            this.$showLoading();
            home({ type: "GET" }, "pageInfo").then(res => {
                this.$hideLoading();
                if (res.suceeded) {
                    const { recommendProject } = res.data;
                    this.recommendProjectList = recommendProject;
                }
            });
        }
    },
    mounted() {
        this.getCourseList();
    }
};
</script>
