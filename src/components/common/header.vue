<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:26:49
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-27 22:40:14
 * @Description: 
 -->
<template>
    <header>
        <div class="back" v-if="isBack">
            <i class="iconfont icontubiao-13" @click="$router.back(-1)"></i>
        </div>

        <div class="logo" v-else>
            <img src="../images/logo.png" alt="" />
        </div>
        <span>{{ title }}</span>
        <i class="iconfont icontubiao-23 calendar-icon" @click="click" v-if="isCb" :class="[isShowCalendar ? 'active' : '']"></i>
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
        },
        isBack: {
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
    background: linear-gradient(180deg, rgba(15, 79, 168, 1) 0%, rgba(0, 126, 255, 1) 100%);
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
    .logo {
        position: absolute;
        top: 50%;
        left: 0.2rem;
        transform: translateY(-50%);
        img {
            width: 0.58rem;
            max-width: 100%;
        }
    }
    .back {
        position: absolute;
        top: 50%;
        left: 0.2rem;
        transform: translateY(-50%);
        i {
            color: #fff;
            font-size: 0.26rem;
        }
    }
}
</style>
