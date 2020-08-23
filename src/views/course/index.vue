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
            <Nav :modulesList="modulesList" path="course"></Nav>
            <SubMenu :modulesList="modulesList" path="course"></SubMenu>
            <div class="course-content">
                <List :recommendProjectList="recommendProjectList"></List>
                <div class="" v-show="showLoading">
                    <LoadMore :showLoading="showLoading"></LoadMore>
                </div>
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
import utils from "@/widget/utils";
import LoadMore from "@/components/loadMore";
export default {
    data() {
        return {
            recommendProjectList: [],
            menupB: true,
            modulesList: store.get("modulesList", "local"),
            pageIndex: 1,
            isScrollLoad: true,
            showLoading: false,
            pageTotal: 0
        };
    },
    components: {
        Nav,
        Header,
        Footer,
        Search,
        List,
        SubMenu,
        LoadMore
    },
    methods: {
        getCourseList() {
            this.$showPageLoading();
            const { pageIndex } = this;
            let { moduleId, blockId, classListId } = this.$route.query;
            classListId = classListId.toString() === "-1" ? "" : classListId;
            home(
                {
                    type: "GET",
                    data: {
                        page: pageIndex,
                        size: 100000,
                        moduleId,
                        classId: classListId,
                        blockId
                    }
                },
                "project"
            ).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    const { content, total } = res.data;
                    if (pageIndex > 1) {
                        setTimeout(() => {
                            this.showLoading = false;
                            this.isScrollLoad = true;
                            this.recommendProjectList = this.recommendProjectList.concat(content || []);
                        }, 500);
                    } else {
                        this.recommendProjectList = content || [];
                    }
                    this.pageTotal = total;
                    if (pageIndex == Math.ceil(total / 10) || !content.length) {
                        this.showLoading = false;
                    }
                }
            });
        },
        scrollLoadList() {
            const winHeight = window.innerHeight;
            const scrollTop = document.scrollingElement.scrollTop;
            const scrollViewHeight = document.querySelector(".scroll-view-wrapper").offsetHeight - 50;
            const realFunc = () => {
                if (winHeight + scrollTop >= scrollViewHeight && this.recommendProjectList.length < this.pageTotal) {
                    this.showLoading = true;
                    this.pageIndex += 1;
                    this.getCourseList();
                } else {
                    this.isScrollLoad = true;
                }
            };
            if (this.isScrollLoad) {
                this.isScrollLoad = false;
                this.timer = window.requestAnimationFrame(realFunc);
            }
        }
    },
    watch: {
        $route: function() {
            this.pageIndex = 1;
            this.getCourseList();
        }
    },
    mounted() {
        this.getCourseList();
        // window.addEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    },
    beforeDestroy() {
        cancelAnimationFrame(this.timer);
        // window.removeEventListener("scroll", this.scrollLoadList, utils.isPassive() ? { passive: true, capture: true } : true);
    }
};
</script>
