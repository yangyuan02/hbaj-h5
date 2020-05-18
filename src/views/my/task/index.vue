<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 20:14:55
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-18 22:10:26
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper" :class="{'menu-pBottom' :menupB}">
      <Header title="我的任务" :isCb="true" :onClick="() => showCalendar(isShowCalendar)" :isShowCalendar="isShowCalendar"></Header>
      <div class="task-content">
        <Calendar v-if="isShowCalendar" class="calendar-box"></Calendar>
        <List></List>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Calendar from "@/components/calendar";
import Footer from "@/components/common/footer";
import List from "./list";
export default {
    data() {
        return {
            isShowCalendar: false,
            menupB: true
        };
    },
    components: {
        Header,
        Footer,
        List,
        Calendar
    },
    methods: {
        showCalendar(value) {
            this.isShowCalendar = !this.isShowCalendar;
        }
    }
};
</script>

<style lang="less">
.task-content {
    background: linear-gradient(180deg, rgba(15, 79, 168, 1) 0%, rgba(15, 79, 168, 0.98) 100%);
    padding-bottom: 0.18rem;
    .calendar-box {
        margin-bottom: 0.24rem;
    }
}
</style>
