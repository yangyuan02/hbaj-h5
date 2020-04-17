<!--
 * @Author: yangyuan
 * @Date: 2020-04-16 21:39:40
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-17 21:32:43
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <div class="news-detail">
        <div class="news-detail-header">
          <header>
            <i class="iconfont icontubiao-13"></i>
            <span>新闻资讯</span>
          </header>
        </div>
        <div class="news-detail-bg"></div>
        <div class="news-detail-content">
          <div class="title">
            <p>首家外国船级社获准在我国自贸区开展国际登记船舶入级检验业</p>
          </div>
          <div class="digest">
            <span>中国海事</span>
            <span>2020-03-01</span>
          </div>
          <div class="text">
            <p>中国海事局批准法国必维船级社（中国） 有限公司在我国自贸区开展国际登记船舶 入级检验业务。这是首家获准在我国自贸 区开展入级检验业务的外国船级社。</p>
            <p>近日，依法国必维船级社（中国）有限公 司申请，根据《中华人民共和国海事局关 于放开自由贸易试验区国际登记船舶入级 检验有关事项的公告》</p>
          </div>
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
.news-detail {
    padding: 0 0.2rem;
    background: #fff;
    min-height: 100%;
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
                left: 0;
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
    .news-detail-bg {
        width: 6.9rem;
        height: 2.94rem;
        margin: 0 auto;
        background: #f0f0f0;
    }
    .news-detail-content {
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
                font-size: 0.32rem;
                font-family: MicrosoftYaHei;
                color: rgba(51, 51, 51, 1);
                line-height: 0.33rem;
                letter-spacing: 0.05rem;
                -webkit-background-clip: text;
                margin-bottom: 0.4rem;
                &:last-child {
                    margin-bottom: 0rem;
                }
            }
        }
    }
}
</style>

