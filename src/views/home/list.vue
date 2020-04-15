<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 23:42:50
 * @Description: 
 -->
<template>
    <div class="course-list">
        <CourseItem
            v-for="(item, index) in [1, 2, 3, 4, 5, 6]"
            :key="index"
        ></CourseItem>
    </div>
</template>

<script>
import CourseItem from "@/components/course";
export default {
    data() {
        return {};
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
