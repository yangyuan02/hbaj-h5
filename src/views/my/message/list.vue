<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:59:05
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 21:15:26
 * @Description: 
 -->
<template>
    <div class="message-list">
        <messageItem v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index"></messageItem>
    </div>
</template>

<script>
import messageItem from "./item";
import { message } from "@/model/api";
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
            message({
                type: "get",
                data: {
                    page: "1",
                    size: "10",
                    receiver: this.userId
                }
            }).then(res => {
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
