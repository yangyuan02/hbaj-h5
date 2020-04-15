<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 20:15:15
 * @Description: 
 -->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import utils from "@/widget/utils";
import store from "@/widget/store";
import * as Model from "@/model/static";
export default {
    name: "app",
    methods: {
        getLizardCode() {
            const cacheTimes = 30 * 24 * 60 * 60 * 1000;
            Model.getLizardCode({
                type: "GET",
                dataType: "text",
                cache: true,
                expires: cacheTimes
            }).then(res => {
                if (res && typeof res == "string") {
                    if (utils.isLocalStorageSupported()) {
                        if (
                            (!store.get(
                                "/activity/activity-static/lizard/index.js"
                            ),
                            "local")
                        ) {
                            let result = {
                                times: new Date().getTime() + cacheTimes,
                                results: res
                            };
                            store.set(
                                "/activity/activity-static/lizard/index.js",
                                result,
                                "local"
                            );
                        }
                    }
                }
            });
        }
    },
    mounted() {
        this.getLizardCode();
    }
};
</script>

<style lang="less">
@import "./style/reset.less";
@import "./style/main.less";
@import "./style/icon-font/iconfont.css";
@import "./style/utils.css";
@import "./style/ui-method.less";
</style>
