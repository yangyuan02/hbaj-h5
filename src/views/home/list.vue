<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 15:35:35
 * @Description: 
 -->
<template>
  <div class="course-list">
    <CourseItem v-for="(item, index) in recommendProjectList" :key="index" :item="item"></CourseItem>
  </div>
</template>

<script>
import CourseItem from "@/components/course";
export default {
    data() {
        return {};
    },
    props: {
        recommendProjectList: {
            type: Array,
            default: []
        }
    },
    components: {
        CourseItem
    }
};
</script>
<style lang="less">
.course-list {
    padding: 0 0.2rem;
}
</style>
