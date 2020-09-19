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
                                <input type="text" placeholder="短信验证码" maxlength="6" />
                                <span @click="send">{{ buttonText }}</span>
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="iconfont iconmima"></i>
                            </div>
                            <div class="input">
                                <input type="text" placeholder="填写新密码" />
                            </div>
                        </li>
                        <li>
                            <div class="icon">
                                <i class="iconfont icontubiao-18"></i>
                            </div>
                            <div class="input">
                                <input type="text" placeholder="确认密码" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="save">
                <button @click="updateUser">更改密码</button>
            </div>
        </div>
    </div>
</template>

<script>
import utils from "@/widget/utils";
import Header from "@/components/common/header";
export default {
    data() {
        return {
            isMiniprogram: utils.isMiniprogram(),
            buttonText: "发送验证码",
            mobile: this.$route.params.mobile
        };
    },
    components: {
        Header
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
