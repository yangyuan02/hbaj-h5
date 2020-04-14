<template>
  <div class="ui-pageLoading-mask">
    <div class="ui-mask-cont">
      <i class="pageLoading-icon">
      </i>
      <p>努力加载中...</p>
    </div>
  </div>
</template>

<style lang="less">
.ui-pageLoading-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: transparent;
  z-index: 999;
  .ui-mask-cont {
    padding: 0.24rem;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0.05rem;
    position: absolute;
    display: flex;
    align-items: center;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 0.28rem;
    .pageLoading-icon {
      background: url('../images/pageLoading.png') no-repeat;
      background-size: 0.45rem auto;
      width: 0.45rem;
      height: 0.45rem;
      margin-right: 0.15rem;
      animation: loading 1s steps(12, end) infinite;
    }
  }
}
</style>

