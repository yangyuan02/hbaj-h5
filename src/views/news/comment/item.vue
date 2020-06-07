<template>
    <div class="comment-item">
        <div class="user"></div>
        <div class="user-comment">
            <div class="user-name">
                <p class="ellipsis">用户</p>
            </div>
            <div class="user-comment-content">
                <p>评论测试评论测试评论测试评论测试评论测试评论测试评论测试评论测试</p>
            </div>
            <div class="digest">
                <div class="time"><span>今天</span><span>13.36</span></div>
                <div class="like">
                    <i class="iconfont icondianzan-copy"></i>
                    <span>36</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {}
};
</script>

<style lang="less">
.comment-item {
    display: flex;
    border-bottom: 0.02rem solid rgba(221, 221, 221, 1);
    padding-top: 0.3rem;
    padding-bottom: 0.4rem;
    .user {
        width: 0.81rem;
        height: 0.81rem;
        background: RGBA(216, 216, 216, 1);
        border-radius: 50%;
        margin-right: 0.24rem;
    }
    .user-comment {
        flex: 1;
        .user-name {
            p {
                font-size: 0.24rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 31px;
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
