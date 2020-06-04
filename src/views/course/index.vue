<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:46:41
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:18:32
 * @Description: 
 -->
<template>
    <div class="page-view course">
        <div class="scroll-view-wrapper" :class="{ 'menu-pBottom': menupB }">
            <Header title="公共课件资源"></Header>
            <Search></Search>
            <Nav :modulesList="modulesList"></Nav>
            <SubMenu :modulesList="modulesList"></SubMenu>
            <div class="course-content">
                <List :recommendProjectList="recommendProjectList"></List>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<style lang="less">
.course {
    nav {
        margin-top: -0.3rem;
    }
    .course-content {
        width: 100%;
        background: #fff;
    }
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
import store from "@/widget/store";
export default {
    data() {
        return {
            recommendProjectList: [],
            menupB: true,
            modulesList: store.get("modulesList", "local")
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
            let { moduleId, blockId, classListId } = this.$route.query;
            classListId = classListId.toString() === "-1" ? "" : classListId;
            home(
                {
                    type: "GET",
                    data: {
                        page: 1,
                        size: 10,
                        moduleId,
                        classId: classListId,
                        blockId
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
    watch: {
        $route: function() {
            this.getCourseList();
        }
    },
    mounted() {
        this.getCourseList();
    }
};
</script>
