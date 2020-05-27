<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-27 23:40:49
 * @Description: 
 -->
<template>
  <div class="course-list">
    <div class="list" v-if="list.length>0">
      <CourseItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></CourseItem>
    </div>
    <div class="no-list" v-else>
      暂无课件
    </div>
  </div>
</template>

<script>
import CourseItem from "@/components/course";
export default {
    data() {
        return {
            list: []
        };
    },
    components: {
        CourseItem
    }
};
</script>
<style lang="less">
.course-list {
    padding: 0 0.2rem;
    height: 100%;
    min-height: 100%;
    .no-list {
        height: 100%;
        min-height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
