<template>
    <div class="page-view">
        <Header title="重置密码" :isBack="true" v-if="isMiniprogram"></Header>
        <div class="resetpassword">
            <div class="reset-password-container">
                <div class="reset-inputs-box">
                    <ul>
                        <li>
                            <div class="icon">
                                <i class="iconfont iconiconfontshouji"></i>
                            </div>
                            <div class="input">
                                <input type="text" placeholder="手机号" readonly v-model="mobile" />
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="iconfont iconxinxiduanxinxiaoxitixingyoujiansixinyouxiang"></i>
                            </div>
                            <div class="input code">
                                <input type="text" placeholder="短信验证码" maxlength="6" v-model="verifyCode" />
                                <span @click="send">{{ buttonText }}</span>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="iconfont iconmima"></i>
                            </div>
                            <div class="input">
                                <input type="password" placeholder="填写新密码" v-model="password" />
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="iconfont iconmima"></i>
                            </div>
                            <div class="input">
                                <input type="password" placeholder="确认密码" v-model="confirmPassword" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="save">
                <button @click="submit">更改密码</button>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/widget/utils";
import Header from "@/components/common/header";
import validate from "@/widget/validate";
import { user } from "@/model/api";
export default {
    data() {
        return {
            isMiniprogram: utils.isMiniprogram(),
            buttonText: "发送验证码",
            mobile: this.$route.params.mobile,
            time: 60,
            verifyCode: "",
            password: "",
            confirmPassword: "",
            isClickCode: false
        };
    },
    components: {
        Header
    },
    methods: {
        send() {
            const sendCode = () => {
                this.isClickCode = true;
                let times = this.time;
                this.buttonTextClone = this.buttonText;
                this.buttonText = times + "s";
                const countTimeTimer = setInterval(() => {
                    times--;
                    this.buttonText = times + "s";

                    if (times == 0) {
                        this.isClickCode = false;
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
            if (this.isClickCode) {
                return false;
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
            const { verifyCode, password, confirmPassword, mobile } = this;
            if (!mobile) {
                return this.$toast("手机号不存在");
            }
            if (!verifyCode) {
                return this.$toast("验证码不存在");
            }
            if (!password) {
                return this.$toast("请输入密码");
            }
            if (!confirmPassword) {
                return this.$toast("请输入确认密码");
            }
            if (confirmPassword !== password) {
                return this.$toast("两次密码输入不一致");
            }
            const data = {
                mobile,
                password,
                verifyCode
            };
            this.$showLoading();
            user(
                {
                    type: "post",
                    data
                },
                "password/reset"
            ).then(res => {
                if (res.suceeded) {
                    this.$hideLoading();
                    this.$toast("重置密码成功");
                    window.history.back();
                } else {
                    this.$hideLoading();
                    res.message && this.$toast(res.message);
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
.resetpassword {
    .reset-password-container {
        padding: 0.2rem;
        .reset-inputs-box {
            background: #fff;
            ul {
                li {
                    display: flex;
                    flex: 1;
                    padding: 0.24rem 0.2rem;
                    border-bottom: 0.01rem solid #eee;
                    font-size: 0.28rem;
                    font-family: MicrosoftYaHei;
                    color: #333333;
                    line-height: 0.49rem;
                    .icon {
                        i {
                            font-size: 0.32rem;
                        }
                    }
                    .input {
                        flex: 1;
                        margin-left: 0.24rem;
                        display: flex;
                        &.code {
                            input {
                                flex: 1;
                            }
                            span {
                                width: 2rem;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
    .save {
        padding: 0 0.24rem;
        height: 0.84rem;
        margin: 0.24rem 0;
        button {
            width: 100%;
            height: 0.84rem;
            line-height: 0.84rem;
            text-align: center;
            background: rgba(15, 79, 168, 1);
            border-radius: 0.1rem;
            color: #fff;
            font-size: 0.28rem;
        }
    }
}
</style>
