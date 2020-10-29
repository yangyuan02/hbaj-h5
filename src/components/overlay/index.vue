<template>
    <div class="ui-overlay">
        <slot></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    }
};
</script>

<style lang="less">
.ui-overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100;
}
</style>
