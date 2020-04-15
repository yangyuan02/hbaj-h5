<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 21:34:07
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 21:51:40
 * @Description: 
 -->
<template>
    <div class="title-content">
        <span>{{ title }}</span>
        <i class="iconfont icontubiao-13"></i>
    </div>
</template>

<style lang="less">
.title-content {
    width: 100%;
    padding: 0.2rem 0.24rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-bottom: 0.02rem solid rgba(245, 245, 245, 1);
    span {
        font-size: 0.3rem;
        font-family: MicrosoftYaHei;
        color: rgba(0, 0, 0, 1);
        line-height: 0.4rem;
        -webkit-background-clip: text;
    }
    i {
        font-size: 0.28rem;
        color: rgba(153, 153, 153, 1);
        transform: rotate(180deg);
    }
}
</style>

<script>
export default {
    data() {
        return {};
    },
    props: {
        title: {
            type: String,
            default: ""
        }
    }
};
</script>
