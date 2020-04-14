<template>
  <div class="dialog">
    <div class="mask"></div>
    <div class="dialog_content">
      <div class="content_box">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "vDialog",
  props: {
    title: String
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("listenDialog", false);
    }
  }
};
</script>

<style lang="less" scoped>
.dialog {
  color: #000000;
  .mask {
    position: fixed;
    z-index: 900;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  header {
    font-size: 20px;
    font-family: MicrosoftYaHei;
    font-weight: 200;
    color: rgba(51, 51, 51, 1);
  }
  .dialog_content {
    position: fixed;
    display: table;
    z-index: 1000;
    width: 88%;
    max-width: 320px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: #fff;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;

    .content_box {
      overflow: hidden;
      margin-bottom: 20px;
    }
  }

  .dialog-ul{
    padding: 10px 15px;
    li{
      height: 35px;
      line-height: 35px;
      span:first-child {
        float: left;
        color:rgba(102,102,102,1);
      }
      span:last-child {
        float: right;
        color:rgba(51,51,51,1);
      }
    }
  }
}
</style>
