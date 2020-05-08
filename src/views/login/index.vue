<!--
 * @Author: yangyuan
 * @Date: 2020-04-21 20:23:25
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-08 20:22:50
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <div class="login-content">
        <div class="login-bg">
          <div class="login-title">
            <span>欢迎使用海宝安检</span>
          </div>
        </div>
        <div class="login-box">
          <div class="tel">
            <input type="text" maxlength="11" placeholder="请输入手机号" v-model="mobile" />
          </div>
          <div class="code">
            <input type="text" maxlength="6" placeholder="请输入短信验证码" v-model="verifyCode" />
            <span @click="send">{{buttonText}}</span>
          </div>
          <div class="login-button">
            <button @click="submit">登录</button>
          </div>
        </div>
        <div class="tips">
          <p>本应用尚未对外开放注册，如需注册成为会员请联系xxx-xxxxxxxxxxx</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { user } from "@/model/api";
import validate from "@/widget/validate";
import store from "@/widget/store";
export default {
    data() {
        return {
            mobile: "",
            verifyCode: "",
            isClickCode: true,
            buttonText: "发送验证码",
            time: 60
        };
    },
    methods: {
        send() {
            const sendCode = () => {
                this.isClickCode = false;
                let times = this.time;
                this.buttonTextClone = this.buttonText;
                this.buttonText = times + "s";
                const countTimeTimer = setInterval(() => {
                    times--;
                    this.buttonText = times + "s";

                    if (times == 0) {
                        this.isClickCode = true;
                        this.buttonText = this.buttonTextClone;
                        clearInterval(countTimeTimer);
                    }
                }, 1000);
                this.countTimeTimer = countTimeTimer;
            };

            const { mobile } = this;
            if (!validate.isMobile(mobile)) {
                return this.$toast("请输入正确的手机号");
            }
            this.$showLoading();
            user({ type: "GET", data: { mobile } }, "verifyCode").then(res => {
                if (res.suceeded) {
                    this.$hideLoading();
                    sendCode();
                }
            });
        },
        submit() {
            // const { mobile, verifyCode } = this;
            // if (!validate.isMobile(mobile)) {
            //     return this.$toast("请输入正确的手机号");
            // }
            // if (!verifyCode) {
            //     return this.$toast("请输入验证码");
            // }
            this.$showLoading();
            user({ type: "POST", data: { mobile: "15927407635", password: "123456" } }, "login").then(res => {
                const {
                    suceeded,
                    data: { authorization }
                } = res;
                const { from } = this.$route.query;
                if (res.suceeded) {
                    this.$hideLoading();
                    store.set("authorization", authorization, "local");
                    if (from) {
                        window.location.href = from;
                    } else {
                        this.$router.push({ path: "/home" });
                    }
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
.login-content {
    background: #fff;
    min-height: 100%;
    .login-bg {
        width: 100%;
        height: 5.58rem;
        background: url("./images/login.png");
        background-size: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .login-title {
            span {
                font-size: 0.46rem;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 0.61rem;
            }
        }
    }
    .login-box {
        width: 6.28rem;
        height: 4.88rem;
        transform: translateY(-1.1rem);
        margin: 0 auto;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0.02rem 0.04rem 0px rgba(96, 175, 255, 1);
        border-radius: 0.1rem;
        filter: blur(0px);
        padding: 0.8rem 0.64rem;
        .tel {
            border-bottom: 0.01rem solid rgba(221, 221, 221, 1);
            width: 100%;
            height: 0.7rem;
            display: flex;
            align-items: center;
            margin-bottom: 0.1rem;
            input {
                font-size: 0.26rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 0.31rem;
                width: 100%;
                height: 100%;
            }
        }
        .code {
            border-bottom: 0.01rem solid rgba(221, 221, 221, 1);
            width: 100%;
            display: flex;
            height: 0.7rem;
            display: flex;
            align-items: center;
            input {
                font-size: 0.26rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 0.31rem;
                flex: 1;
                height: 100%;
            }
            span {
                font-size: 0.2rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 0.26rem;
                width: 1rem;
            }
        }
        .login-button {
            display: flex;
            justify-content: center;
            margin-top: 0.78rem;
            button {
                width: 4.58rem;
                height: 0.84rem;
                background: rgba(15, 79, 168, 0.8);
                border-radius: 0.1rem;
                text-align: center;
                font-size: 0.28rem;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 0.37rem;
            }
        }
    }
    .tips {
        width: 6.28rem;
        margin: 0 auto;
        p {
            font-size: 0.2rem;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 0.26rem;
            word-break: break-all;
        }
    }
}
</style>
