<template>
    <view class="menu">
        <view v-for="item in menu" :key="item.id" class="menu-item" :class="{active: item.active}" @click="handlerClick(item)">
            <view class="menu-item-icon">
                <text class="iconfont icon-bianji1"></text>
            </view>
            <view class="menu-item-name">{{ item.name }}</view>
        </view>
    </view>
</template>
<script setup>
import useMenuStore from '@/store/menu'
import { useRouter } from '@/router'
const router = useRouter()

const menuStore = useMenuStore()
const { menu, setActive } = menuStore;

const handlerClick = (item) => {
    setActive(item.id)
    router.push({name: item.id})
}

</script>

<style scoped lang="less">
.menu {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.76);
    box-shadow: 0px -0.3px 2px rgba(81, 133, 218, 0.2);
    padding: 20rpx 0;
    padding-bottom: env(safe-area-inset-bottom);

    .menu-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: rgba(184, 187, 190, 1);
        font-size: 24rpx;

        &-icon {
            text {
                font-size: 40rpx;
            }

            margin-bottom: 10rpx;
        }

        &.active {
            color: rgba(84, 160, 255, 1)
        }
    }
}
</style>
