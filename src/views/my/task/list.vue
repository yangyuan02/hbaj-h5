<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:11:00
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-20 23:00:03
 * @Description: 
 -->
 <template>
  <div class="task-list">
    <taskItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></taskItem>
  </div>
</template>

 <script>
import taskItem from "./item";
export default {
    data() {
        return {};
    },
    components: {
        taskItem
    }
};
</script>

<style lang="less">
.task-list {
}
</style>