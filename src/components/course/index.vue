<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 22:21:06
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-15 23:34:17
 * @Description: 
 -->
<template>
    <div class="course-content-item">
        <div class="course-item-thumb"></div>
        <div class="course-item-detail">
            <div class="course-item-title">
                <div class="text">
                    <p>2019年PSC集中大会战检查要 点-专题说</p>
                </div>
                <div class="status">
                    <span>公开</span>
                </div>
            </div>
            <div class="course-item-digest">
                <p>
                    宝山海事局执法人员通过具有增强现实（AR）技术支持的在线通讯协作办…
                </p>
            </div>
            <div class="course-item-source">
                <div class="organization">
                    <span>发布机构:</span>
                    <span>海宝安检</span>
                </div>
                <div class="publishTime">
                    <span>发布时间:</span>
                    <span>2020-04-15</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style lang="less">
.course-content-item {
    display: flex;
    padding-top: 0.28rem;
    padding-bottom: 0.2rem;
    border-bottom: 0.02rem solid rgba(221, 221, 221, 1);
    .course-item-thumb {
        width: 2.1rem;
        height: 2.1rem;
        margin-right: 0.22rem;
        background: #f0f0f0;
    }
    .course-item-detail {
        flex: 1;
        .course-item-title {
            display: flex;
            .text {
                p {
                    font-size: 0.28rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(51, 51, 51, 1);
                    line-height: 0.4rem;
                    letter-spacing: 0.01rem;
                    -webkit-background-clip: text;
                }
            }
            .status {
                width: 0.72rem;
                height: 0.34rem;
                display: flex;
                justify-content: center;
                align-content: center;
                line-height: 0.34rem;
                font-size: 0.2rem;
                color: #fff;
                text-align: center;
                background: rgba(59, 206, 180, 1);
                border-radius: 0.02rem;
            }
        }
        .course-item-digest {
            margin-top: 0.14rem;
            margin-bottom: 0.16rem;
            p {
                font-size: 0.24rem;
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 0.38rem;
                letter-spacing: 0.01rem;
                -webkit-background-clip: text;
            }
        }
        .course-item-source {
            display: flex;
            align-content: center;
            justify-content: space-between;
            span {
                font-size: 0.2rem;
                font-family: MicrosoftYaHei;
                color: rgba(153, 153, 153, 1);
                line-height: 0.26rem;
                -webkit-background-clip: text;
            }
        }
    }
}
</style>
