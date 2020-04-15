<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:30:31
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 23:11:38
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <Header></Header>
            <div class="home-banner">
                <Banner :bannerList="bannerList"></Banner>
            </div>
            <Nav></Nav>
            <div class="news">
                <Title title="新闻咨询"></Title>
                <div class="new-content">
                    <p>突发！扬州籍内河船入海运砂时沉</p>
                    <p>张家港海事局启动内河船舶配员专项整治行</p>
                </div>
            </div>
            <div class="course-content">
                <Title title="公众课件"></Title>
                <div class="course-list">
                    <CourseItem
                        v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
                        :key="index"
                    ></CourseItem>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Banner from "./banner.vue";
import Nav from "@/components/nav";
import Title from "@/components/title";
import CourseItem from "@/components/course";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
export default {
    data() {
        return {
            bannerList: [
                {
                    poster:
                        "https://via.placeholder.com/750x358.jpg?text=banner01"
                },
                {
                    poster:
                        "https://via.placeholder.com/750x358.jpg?text=banner02"
                }
            ]
        };
    },
    components: {
        Banner,
        Nav,
        Footer,
        Header,
        Title,
        CourseItem
    }
};
</script>
<style lang="less">
.scroll-view-wrapper {
    .news {
        margin: 0.18rem 0rem;
        .new-content {
            width: 100%;
            background: #fff;
            padding: 0.22rem 0.24rem;
            p {
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 0.31rem;
                letter-spacing: 0.01rem;
                -webkit-background-clip: text;
                margin-bottom: 0.14rem;
                &:last-child {
                    margin-bottom: 0rem;
                }
            }
        }
    }
    .course-content {
        width: 100%;
        background: #fff;
        .course-list {
            padding: 0 0.2rem;
        }
    }
}
</style>
