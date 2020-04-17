<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 23:57:13
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-17 21:29:08
 * @Description: 
 -->
<template>
  <div class="search-content">
    <div class="search-input" @click="toSeatch">
      <i class="iconfont icontubiao-12"></i>
      <span>搜索</span>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        toSeatch() {
            this.$router.push({ path: "/search" });
        }
    }
};
</script>

<style lang="less">
.search-content {
    width: 100%;
    height: 1.14rem;
    background: rgba(15, 79, 168, 1);
    padding: 0.2rem 0.3rem;
    .search-input {
        width: 100%;
        height: 0.7rem;
        line-height: 0.7rem;
        background: rgba(248, 248, 248, 1);
        border-radius: 0.35rem;
        padding-left: 0.26rem;
        color: rgba(153, 153, 153, 1);
        i {
            font-size: 0.28rem;
        }
        span {
            margin-left: 0.1rem;
        }
    }
}
</style>
