<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:38:27
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-24 22:20:49
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="scroll-view-wrapper">
            <div class="my-content">
                <my-header :info="user"></my-header>
                <div class="person-box">
                    <div class="role common">
                        <div class="thumb">
                            <img :src="globalConfig.imagePath + 'static/app/department/group_01.jpg'" alt="" />
                        </div>
                        <div class="name">
                            <span>{{ user.departmentName || "未指定用户组" }}</span>
                        </div>
                        <div class="tag">
                            <span>群组</span>
                        </div>
                    </div>
                    <div class="organization common" v-for="(item, index) in enterprises" :key="index">
                        <div class="thumb">
                            <img src="https://msa_pc.vr2shipping.com/pano/static/role/cmsalogo.png" alt="" />
                        </div>
                        <div class="name">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="tag">
                            <span>机构</span>
                        </div>
                    </div>
                    <div class="auth-box" v-for="(item, Pindex) in blocks" :key="Pindex">
                        <div class="title">
                            <span class="ellipsis">{{ item.name }}访问权限</span>
                        </div>
                        <div class="major-box">
                            <div class="left-major">
                                <ul>
                                    <li
                                        class="ellipsis"
                                        v-for="(moduleItem, _moduleIndex) in item.moduleList"
                                        :key="_moduleIndex"
                                        :class="[_moduleIndex === ModuleIndex[Pindex] ? 'active' : '']"
                                        @click="setModuleIndex(Pindex, _moduleIndex)"
                                    >
                                        {{ moduleItem.name }}
                                    </li>
                                </ul>
                            </div>
                            <div class="right-major">
                                <div class="item" v-for="(itemClass, index) in item.classList" :key="index">
                                    <span class="ellipsis">{{ itemClass.name }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="tag">
                            <span>权限</span>
                        </div>
                    </div>
                </div>
                <div class="logout">
                    <button @click="logout">退出登录</button>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import MyHeader from "@/components/my-header";
import Footer from "@/components/common/footer";
import { user } from "@/model/api";
import store from "@/widget/store";
export default {
    data() {
        return {
            user: {},
            menupB: true,
            blocks: [],
            roleList: [],
            enterprises: [],
            ModuleIndex: {}
        };
    },
    components: {
        MyHeader,
        Footer
    },
    methods: {
        getUserDetail() {
            this.$showPageLoading();
            const userId = store.get("userId", "local");
            user(
                {
                    type: "get"
                },
                userId
            ).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    const { blocks, roleList, enterprises } = res.data;
                    (blocks || []).forEach(item => {
                        if (item["moduleList"] && item["moduleList"][0]["classList"]) {
                            item.classList = item["moduleList"][0]["classList"];
                        }
                    });
                    this.blocks = blocks;
                    this.roleList = roleList;
                    this.enterprises = enterprises;
                    this.user = res.data;
                }
            });
        },
        setModuleIndex(Pindex, index) {
            this.ModuleIndex[Pindex] = index;
            this.blocks[Pindex]["classList"] = this.blocks[Pindex]["moduleList"][index].classList || [];
        },
        logout() {
            if (window.__wxjs_environment === "miniprogram") {
                return wx.miniProgram.navigateTo({ url: "/pages/auth/auth?isClearStore=1" });
            } else {
                window.localStorage.removeItem("authorization");
                window.location.href = "/login";
            }
        }
    },
    mounted() {
        this.getUserDetail();
    }
};
</script>

<style lang="less">
.my-content {
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    .person-box {
        padding: 0.27rem 0.35rem;

        // min-height: 100%;
        flex: 1;
        .common {
            display: flex;
            align-items: center;
            background: rgba(15, 79, 168, 1);
            padding: 0.16rem;
            position: relative;
            .thumb {
                width: 1.2rem;
                height: 1.2rem;
                background: #f0f0f0;
                margin-left: 0.3rem;
                margin-right: 0.4rem;
                border-radius: 50%;
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 0.1rem;
                    max-width: 100%;
                    border-radius: 50%;
                }
            }
            .name {
                font-size: 0.28rem;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 0.37rem;
                letter-spacing: 0.01rem;
                -webkit-background-clip: text;
            }
            .tag {
                width: 1.3rem;
                height: 0.4rem;
                background: rgba(224, 32, 32, 1);
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 0.2rem 0px 0px 0.2rem;
                position: absolute;
                right: 0;
                top: 0.16rem;
                span {
                    color: #fff;
                }
            }
        }
        .role {
            margin-bottom: 0.16rem;
            border-radius: 0.1rem;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .organization {
            margin: 0.16rem 0;
            border-radius: 0.1rem;
            .tag {
                background: rgba(255, 213, 26, 1);
            }
        }
        .auth-box {
            position: relative;
            width: 6.8rem;
            height: 3.51rem;
            background: rgba(15, 79, 168, 1);
            border-radius: 0.1rem;
            padding-left: 0.2rem;
            padding-top: 0.2rem;
            margin-bottom: 0.16rem;
            &:last-child {
                margin-bottom: 0rem;
            }
            .title {
                span {
                    color: #fff;
                }
            }
            .major-box {
                display: flex;
                margin-top: 0.2rem;
                .left-major {
                    ul {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        height: 100%;
                        li {
                            color: #fff;
                            position: relative;
                            padding-left: 0.1rem;
                            &.active {
                                &::before {
                                    content: "";
                                    height: 100%;
                                    width: 0.04rem;
                                    position: absolute;
                                    left: 0;
                                    top: 0;
                                    background: rgba(255, 157, 59, 1);
                                }
                            }
                        }
                    }
                }
                .right-major {
                    width: 4.63rem;
                    height: 2.6rem;
                    background: rgba(0, 145, 255, 1);
                    border-radius: 0.1rem;
                    margin-left: 0.16rem;
                    padding: 0.1rem;
                    // display: flex;
                    // flex-wrap: wrap;
                    // justify-content: space-between;
                    .item {
                        width: 1.28rem;
                        height: 0.4rem;
                        border-radius: 0.04rem;
                        border-bottom: 0.02rem solid rgba(255, 255, 255, 1);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        float: left;
                        margin-left: 0.1rem;
                        span {
                            color: #fff;
                            font-size: 0.24rem;
                        }
                    }
                }
            }
            .tag {
                position: absolute;
                width: 1.3rem;
                height: 0.4rem;
                background: rgba(255, 157, 59, 1);
                border-radius: 0.2rem 0px 0px 0.2rem;
                right: 0;
                top: 0.2rem;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                    color: #fff;
                }
            }
        }
    }
    .logout {
        width: 100%;
        padding: 0 0.35rem;
        height: 0.9rem;
        padding-bottom: 0.2rem;
        flex-shrink: 0;
        button {
            width: 100%;
            height: 100%;
            background: #ff9d3b;
            color: #fff;
            height: 0.7rem;
        }
    }
}
</style>
