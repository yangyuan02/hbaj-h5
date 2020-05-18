<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-18 22:07:24
 * @Description: 
 -->
<template>
  <header>
    <span>{{ title }}</span>
    <i class="iconfont icontubiao-23 calendar-icon" @click="click" v-if="isCb" :class="[isShowCalendar ? 'active':'']"></i>
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
        },
        isCb: {
            type: Boolean,
            default: false
        },
        onClick: {
            type: Function,
            default: () => {}
        },
        isShowCalendar: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        click() {
            console.log(this.isShowCalendar);
            if (this.onClick && typeof this.onClick === "function") {
                this.onClick();
            }
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
    position: relative;
    span {
        font-size: 0.32rem;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 1);
        line-height: 0.42rem;
    }
    .calendar-icon {
        position: absolute;
        right: 0.18rem;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 0.34rem;
        &.active {
            color: rgba(255, 213, 26, 1);
        }
    }
}
</style>
