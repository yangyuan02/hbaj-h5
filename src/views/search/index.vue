<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 20:34:22
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:13:56
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="scroll-view-wrapper search">
            <div class="search-content">
                <div class="search-input">
                    <i class="iconfont icontubiao-12"></i>
                    <input type="text" placeholder="请输入搜索条件" />
                </div>
            </div>
            <div class="course-content">
                <List></List>
            </div>
        </div>
    </div>
</template>

<script>
import List from "./list.vue";
export default {
    data() {
        return {};
    },
    components: {
        List
    }
};
</script>

<style lang="less">
.search {
    & > .search-content {
        width: 100%;
        height: 1.14rem;
        background: rgba(15, 79, 168, 1);
        padding: 0.2rem 0.3rem;
        .search-input {
            width: 100%;
            height: 0.7rem;
            display: flex;
            line-height: 0.7rem;
            background: rgba(248, 248, 248, 1);
            border-radius: 0.35rem;
            padding-left: 0.26rem;
            color: rgba(153, 153, 153, 1);
            i {
                font-size: 0.28rem;
            }
            input {
                margin-left: 0.1rem;
                height: 100%;
                flex: 1;
            }
        }
    }
    .course-content {
        width: 100%;
        background: #fff;
        min-height: 100%;
        height: calc(100% - 1.14rem);
    }
}
</style>
