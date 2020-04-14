<template>
  <div class="ui-showLoading" id="showLoading">
    <div class="ui-showLoading-gif"></div>
  </div>
</template>
<style lang="less">
.ui-showLoading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  .ui-showLoading-gif {
    width: 0.48rem;
    height: 0.48rem;
    background: url('../images/loading.png');
    background-size: 0.48rem auto;
    animation: loading 1s steps(12, end) infinite;
  }
  @keyframes loading {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
      -webkit-transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
      -webkit-transform: rotate3d(0, 0, 1, 360deg);
    }
  }
}
</style>

