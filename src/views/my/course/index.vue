<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:46:41
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:27:12
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="scroll-view-wrapper" :class="{ 'menu-pBottom': menupB }">
            <Header title="我的课件" :isBack="true"></Header>
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
            home(
                {
                    type: "GET",
                    data: {
                        page: 1,
                        size: 10000
                    }
                },
                "project"
            ).then(res => {
                this.$hideLoading();
                if (res.suceeded) {
                    const { content } = res.data;
                    this.recommendProjectList = content;
                }
            });
        }
    },
    mounted() {
        this.getCourseList();
    }
};
</script>
