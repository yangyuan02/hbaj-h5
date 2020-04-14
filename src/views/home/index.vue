<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:30:31
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 00:03:58
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <div class="home-banner">
                <Banner :bannerList="bannerList"></Banner>
            </div>
            <Nav></Nav>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
import Banner from "./banner.vue";
import Nav from "@/components/nav";
import Footer from "@/components/common/footer";
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
        Footer
    }
};
</script>
<style lang="less"></style>
