<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:59:05
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-17 23:52:34
 * @Description: 
 -->
<template>
  <div class="message-list">
    <messageItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></messageItem>
  </div>
</template>

<script>
import messageItem from "./item";
import { messageDetail } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            userId: store.get("userId", "local")
        };
    },
    components: {
        messageItem
    },
    methods: {
        getMessageList() {
            this.$showPageLoading();
            messageDetail(
                {
                    type: "get",
                    data: {
                        page: "1",
                        size: "10",
                        receiver: this.userId
                    }
                },
                "private"
            ).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    console.log(res);
                }
            });
        }
    },
    mounted() {
        this.getMessageList();
    }
};
</script>

<style lang="less">
.message-list {
}
</style>
