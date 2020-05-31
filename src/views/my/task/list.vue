<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:11:00
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:24:36
 * @Description: 
 -->
 <template>
  <div class="task-list" :class="[isPaddingTop ? '' : 'pd20']">
    <taskItem v-for="(item, index) in list" :key="index" :item="item"></taskItem>
  </div>
</template>

 <script>
import taskItem from "./item";
import { task } from "@/model/api";
export default {
    data() {
        return {
            list: []
        };
    },
    props: {
        isPaddingTop: {
            default: false,
            type: Boolean
        }
    },
    components: {
        taskItem
    },
    methods: {
        getTaskList() {
            this.$showLoading();
            task({
                type: "GET",
                data: {
                    page: 1,
                    size: 10
                }
            }).then(res => {
                this.$hideLoading();
                if (res.suceeded) {
                    const { content } = res.data;
                    this.list = content;
                }
            });
        }
    },
    mounted() {
        this.getTaskList();
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