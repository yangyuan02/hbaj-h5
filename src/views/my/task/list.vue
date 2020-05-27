<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:11:00
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-28 00:11:28
 * @Description: 
 -->
 <template>
  <div class="task-list" :class="[isPaddingTop ? '' : 'pd20']">
    <taskItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></taskItem>
  </div>
</template>

 <script>
import taskItem from "./item";
export default {
    data() {
        return {};
    },
    props: {
        isPaddingTop: {
            default: false,
            type: Boolean
        }
    },
    components: {
        taskItem
    }
};
</script>

<style lang="less">
.task-list {
    &.pd20 {
        padding-top: 0.2rem;
    }
}
</style>