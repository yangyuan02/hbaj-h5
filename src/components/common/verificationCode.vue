<template>
  <div class="ui-code-box">
    <BaseButton :text="buttonText" className="ui-code-btn" :disabled="disabled" :onClick="send"></BaseButton>
  </div>
</template>

<script>
import BaseButton from '@/components/common/BaseButton';
import validate from '@/widget/validate';
import * as Model from '@/model/api';
export default {
  props: {
    time: {
      type: Number,
      default: 60
    },
    buttonText: {
      type: String,
      default: '发送验证码'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    iphone: {
      type: String,
      default: ''
    },
    onClick: {}
  },
  data() {
    return {
      isClickCode: true
    };
  },
  components: {
    BaseButton
  },
  methods: {
    send() {
      if (this.disabled) {
        return false;
      }
      if (!this.isClickCode) {
        return false;
      }
      if (!this.iphone) {
        this.$toast('请输入手机号码');
        return;
      }

      if (!validate.isMobile(this.iphone)) {
        this.$toast('请输入正确的手机号码');
        return;
      }
      const sendCode = () => {
        this.isClickCode = false;
        let times = this.time;
        this.buttonTextClone = this.buttonText;
        this.buttonText = times + 's';
        const countTimeTimer = setInterval(() => {
          times--;
          this.buttonText = times + 's';

          if (times == 0) {
            this.isClickCode = true;
            this.buttonText = this.buttonTextClone;
            clearInterval(countTimeTimer);
          }
        }, 1000);
        this.countTimeTimer = countTimeTimer;
      };
      this.$showLoading();
      Model.code({
        type: 'post',
        data: {
          mobile: this.iphone,
          activityType: '0'
        }
      }).then(res => {
        if (res.resultCode === '0000') {
          this.$hideLoading();
          sendCode();
          this.$toast('发送成功');
        } else {
          this.$hideLoading();
          res.resultDesc && this.$toast(res.resultDesc);
        }
      });
    }
  },
  beforeDestroy() {
    this.countTimeTimer && clearInterval(this.countTimeTimer);
  }
};
</script>

<style lang="less">
.ui-code-box {
  width: 1.94rem;
  height: 100%;
  display: flex;
  align-items: center;
  .ui-code-btn {
    width: 100%;
    height: 0.69rem;
    background: #fff;
    border: 0.01rem solid #4496c8;
    border-radius: 0.04rem;
    span {
      color: #4496c8;
    }
  }
}
</style>

