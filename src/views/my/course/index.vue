<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:46:41
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:11:37
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper" :class="{'menu-pBottom' :menupB}">
      <Header title="我的课件"></Header>
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
import List from "./list.vue";
import { home } from "@/model/api";
export default {
    data() {
        return {
            recommendProjectList: [],
            menupB: true
        };
    },
    components: {
        List,
        Header,
        Footer
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
