<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:00:21
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:24:43
 * @Description: 
 -->
<template>
    <div class="page-view">
        <Header title="海宝安检资讯"></Header>
        <div class="scroll-view-wrapper" :class="{ 'menu-pBottom': menupB }">
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
        return {
            menupB: true
        };
    },
    components: {
        Header,
        Footer,
        List
    }
};
</script>

<style lang="less"></style>
