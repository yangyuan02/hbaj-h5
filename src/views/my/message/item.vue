<!--
 * @Author: yangyuan
 * @Date: 2020-04-19 18:58:59
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-01 21:25:43
 * @Description: 
 -->
<template>
    <div class="message-item-content" :class="[item.status === 0 ? 'unread' : '']" @click="message(item)">
        <!-- <div class="role">
            <div class="role-type">
                <div class="thumb"></div>
                <div class="text">
                    <span>系统管理员</span>
                </div>
            </div>
            <div class="role-info">
                <div class="type-thumb-bg">
                    <i class="iconfont icontubiao-17"></i>
                </div>
                <div class="tags">
                    <span>{{ item.messageType | formMessageText }} </span>
                </div>
            </div>
        </div>
        <div class="digest">
            <p>{{ item.content }}</p>
        </div> -->

        <div class="message-top">
            <div class="role">
                <span>系统管理员</span>
            </div>
            <div class="message-type" v-if="item.messageType">
                <span>{{ item.messageType | formMessageText }} </span>
            </div>
        </div>
        <div class="message-content-p">
            <p>{{ item.content }}</p>
        </div>
    </div>
</template>
<script>
import { messageDetail } from "@/model/api";

export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    methods: {
        message(item) {
            const { id, status } = item;
            if (status === 1) {
                return this.$toast("消息是已读状态");
            }
            messageDetail(
                {
                    type: "PATCH"
                },
                `${id}/read`
            ).then(res => {
                if (res.suceeded) {
                    item.status = 0;
                    this.$toast("消息已读");
                }
                console.log(res);
            });
        }
    }
};
</script>

<style lang="less">
.message-item-content {
    width: 6.6rem;
    margin: 0 auto;
    margin-bottom: 0.2rem;
    background: #ff9e3a;
    border-radius: 0.05rem;
    // border: 0.02rem solid #ccc;
    padding: 0.2rem;
    .message-top {
        display: flex;
        justify-content: space-between;
        border-bottom: 0.01rem solid #fff;
        padding-bottom: 0.1rem;
        .role {
            span {
                font-weight: bold;
            }
        }
        .message-type {
            background: #346fc1;
            color: #fff;
            padding: 0.05rem 0.2rem;
            border-radius: 0.1rem;
        }
    }
    .message-content-p {
        padding-top: 0.3rem;
    }
    // filter: blur(0px);
    // &:last-of-type {
    //     margin-bottom: 0;
    // }
    // &.unread {
    //     background: rgba(238, 238, 238, 1);
    // }
    // .role {
    //     height: 1.2rem;
    //     background: rgba(96, 175, 255, 1);
    //     display: flex;
    //     border-radius: 0.1rem 0.1rem 0 0;
    //     position: relative;
    //     .role-type {
    //         display: flex;
    //         align-items: center;
    //         margin-left: 0.33rem;
    //         .thumb {
    //             width: 1.03rem;
    //             height: 1.03rem;
    //             border-radius: 50%;
    //             background: url("./images/admin.png") no-repeat;
    //             background-size: 100%;
    //         }
    //         .text {
    //             margin-left: 0.27rem;
    //             span {
    //                 font-size: 0.28rem;
    //                 font-family: MicrosoftYaHei;
    //                 color: rgba(22, 61, 163, 1);
    //                 line-height: 0.37rem;
    //                 -webkit-background-clip: text;
    //             }
    //         }
    //     }
    //     .role-info {
    //         flex: 1;
    //         position: relative;
    //         .type-thumb-bg {
    //             position: absolute;
    //             bottom: 0;
    //             right: 1.3rem;
    //             i {
    //                 font-size: 1.21rem;
    //                 color: rgba(0, 126, 255, 0.26);
    //             }
    //         }
    //         .tags {
    //             position: absolute;
    //             right: 0;
    //             top: 0.35rem;
    //             width: 1.3rem;
    //             height: 0.4rem;
    //             background: rgba(224, 32, 32, 1);
    //             border-radius: 0.2rem 0px 0px 0.2rem;
    //             text-align: center;
    //             line-height: 0.4rem;
    //             span {
    //                 font-size: 0.22rem;
    //                 font-family: MicrosoftYaHei;
    //                 color: rgba(255, 255, 255, 1);
    //                 line-height: 0.29rem;
    //                 -webkit-background-clip: text;
    //             }
    //         }
    //     }
    // }
    // .digest {
    //     padding: 0.28rem 0.33rem;
    //     p {
    //         font-size: 0.28rem;
    //         font-family: MicrosoftYaHei;
    //         color: rgba(51, 51, 51, 1);
    //         line-height: 0.38rem;
    //         letter-spacing: 0.01rem;
    //         -webkit-background-clip: text;
    //     }
    // }
}
</style>
