<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 23:39:18
 * @Description: 
 -->
<template>
    <header>
        <span>{{ title }}</span>
    </header>
</template>

<script type="text/javascript">
// import utils from '@/widget/utils';

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

<style lang="less">
header {
    width: 100%;
    height: 0.88rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 79, 168, 1);
    text-align: center;
    span {
        font-size: 0.32rem;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 0.42rem;
    }
}
</style>
