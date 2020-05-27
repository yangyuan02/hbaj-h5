<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:40:15
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-28 00:04:45
 * @Description: 
 -->
<template>
  <div class="course-list">
    <div class="list" v-if="list.length>0">
      <CourseItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></CourseItem>
    </div>
    <div class="no-list" v-else>
      <div class="tips-box">
        <div class="no-icon">
          <i class="iconfont iconkongxiangzi"></i>
        </div>
        <div class="tips">
          <span>
            暂无内容
          </span>
        </div>
      </div>

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
        .tips-box {
            .no-icon {
                text-align: center;
                i {
                    color: rgba(40, 104, 240, 1);
                    font-size: 1rem;
                }
            }
            .tips {
                span {
                    font-size: 0.24rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(102, 102, 102, 1);
                    line-height: 0.31rem;
                    -webkit-background-clip: text;
                }
            }
        }
    }
}
</style>
