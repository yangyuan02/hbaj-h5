<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:39:40
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-06-04 01:22:42
 * @Description: 
 -->
<template>
    <div class="page-view">
        <div class="news-detail-header" v-if="isMiniprogram">
            <header>
                <i class="iconfont icontubiao-13" @click="$router.back(-1)"></i>
                <span>新闻资讯</span>
            </header>
        </div>
        <div class="scroll-view-wrapper">
            <div class="news-detail">
                <div class="news-detail-bg"></div>
                <div class="news-detail-content">
                    <div class="title">
                        <p>{{ data.title }}</p>
                    </div>
                    <div class="digest">
                        <span>{{ data.author }}</span>
                        <span>{{ data.publishTime | formaData }}</span>
                    </div>
                    <div class="text" v-html="data.contentHtml"></div>
                </div>
            </div>
        </div>
        <div class="news-comment">
            <div class="write" @click="write">
                <span>写下你的评论</span>
            </div>
            <!-- <div class="comment-count">
                        <i class="iconfont iconpinglun"></i>
                        <span>36</span>
                    </div>
                    <div class="like-count">
                        <i class="iconfont icondianzan-copy"></i>
                        <span>36</span>
                    </div> -->
        </div>
    </div>
</template>

<script>
import { newsDetail } from "@/model/api";
import utils from "@/widget/utils";
export default {
    data() {
        return {
            isMiniprogram: utils.isMiniprogram(),
            data: {}
        };
    },
    methods: {
        getNewsDetail() {
            this.$showPageLoading();
            const { id } = this.$route.params;
            newsDetail(
                {
                    type: "get"
                },
                id
            ).then(res => {
                this.$hidePageLoading();
                if (res.suceeded) {
                    this.data = res.data;
                }
            });
        },
        write() {
            const { id } = this.$route.params;
            this.$router.push({
                name: "comment",
                params: {
                    id
                }
            });
        }
    },
    mounted() {
        this.getNewsDetail();
    }
};
</script>
<style lang="less">
.news-detail-header {
    header {
        width: 100%;
        height: 0.88rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        position: relative;
        background: #fff;
        i {
            font-size: 0.28rem;
            color: rgba(15, 79, 168, 1);
            position: absolute;
            top: 50%;
            left: 0.2rem;
            transform: translateY(-50%);
        }
        span {
            font-size: 0.32rem;
            font-family: MicrosoftYaHei;
            color: rgba(0, 0, 0, 1);
            line-height: 0.42rem;
            -webkit-background-clip: text;
        }
    }
}
.news-detail {
    background: #fff;
    min-height: 100%;

    .news-detail-bg {
        width: 100%;
        height: 2.94rem;
        background: url("../images/news-detail-bg.png");
        background-size: 100%;
    }
    .news-detail-content {
        padding: 0 0.2rem;
        .title {
            margin-top: 0.33rem;
            p {
                font-size: 0.45rem;
                font-family: MicrosoftYaHei;
                color: rgba(0, 0, 0, 1);
                line-height: 0.56rem;
                letter-spacing: 0.06rem;
                -webkit-background-clip: text;
            }
        }
        .digest {
            font-size: 0.21rem;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            line-height: 0.27rem;
            -webkit-background-clip: text;
            margin-top: 0.14rem;
            margin-bottom: 0.32rem;
            span:last-child {
                margin-left: 0.2rem;
            }
        }
        .text {
            p {
                &[style] {
                    font-size: 0.32rem !important;
                }
                span {
                    font-size: 0.32rem !important;
                    &[style] {
                        font-size: 0.32rem !important;
                    }
                }
                img {
                    &[style] {
                        width: 90% !important;
                    }
                }
                font-size: 0.32rem !important;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                // line-height: 0.33rem;
                // letter-spacing: 0.05rem;
                -webkit-background-clip: text;
                // margin-bottom: 0.4rem;
                &:last-child {
                    margin-bottom: 0rem;
                }
            }
        }
    }
}
.news-comment {
    padding: 0.18rem 0.26rem;
    // padding-left: 0.26rem;
    // border: 0.01rem solid rgba(221, 221, 221, 1);
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    .write {
        width: 100%;
        height: 0.6rem;
        background: rgba(238, 240, 243, 1);
        border-radius: 0.31rem;
        display: flex;
        align-items: center;
        padding-left: 0.28rem;
        span {
            font-size: 0.28rem;
            font-family: MicrosoftYaHei;
            color: rgba(153, 153, 153, 1);
            line-height: 0.37rem;
            letter-spacing: 0.01rem;
            -webkit-background-clip: text;
        }
    }
    .comment-count,
    .like-count {
        color: rgba(219, 219, 219, 1);
        i {
            font-size: 0.36rem;
        }
        span {
            margin-left: 0.1rem;
        }
    }
    .comment-count {
        margin-left: 0.6rem;
        margin-right: 0.3rem;
        display: flex;
        align-items: center;
    }
    .like-count {
        display: flex;
        align-items: center;
    }
}
</style>
