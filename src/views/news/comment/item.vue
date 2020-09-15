<template>
    <div class="comment-item">
        <div class="user ui-lazyLoad-pic" v-skeleton="globalConfig.imagePath + item.userAvatar">
            <!-- <img :src="globalConfig.imagePath + item.userAvatar" alt="" /> -->
        </div>
        <div class="user-comment">
            <div class="user-name">
                <p class="ellipsis">{{ item.userName }}</p>
            </div>
            <div class="user-comment-content">
                <p>{{ item.content }}</p>
            </div>
            <div class="digest">
                <div class="time">
                    <span>{{ item.createTime | formaData }}</span>
                </div>
                <!-- <div class="like">
                    <i class="iconfont icondianzan-copy"></i>
                    <span>36</span>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    props: {
        item: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="less">
.comment-item {
    display: flex;
    border-bottom: 0.02rem solid rgba(221, 221, 221, 1);
    padding-top: 0.3rem;
    padding-bottom: 0.4rem;
    &:last-child {
        border: none;
    }
    .user {
        width: 0.81rem;
        height: 0.81rem;
        background: #fff;
        border-radius: 50%;
        margin-right: 0.24rem;
        background-size: 100%;
        background-position: center center;
        img {
            width: 100%;
            height: 100%;
            max-width: 100%;
        }
    }
    .user-comment {
        flex: 1;
        .user-name {
            p {
                font-size: 0.24rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 0.31rem;
                -webkit-background-clip: text;
            }
        }
        .user-comment-content {
            margin-top: 0.24rem;
            margin-bottom: 0.25rem;
            p {
                font-size: 0.3rem;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 0.36rem;
                -webkit-background-clip: text;
            }
        }
        .digest {
            display: flex;
            justify-content: space-between;
            color: rgba(153, 153, 153, 1);
            font-size: 0.24rem;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            line-height: 0.31rem;
            -webkit-background-clip: text;
            .like {
                i {
                    font-size: 0.26rem;
                    margin-right: 0.2rem;
                }
            }
        }
    }
}
</style>
