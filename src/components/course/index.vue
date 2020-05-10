<!--
 * @Author: yangyuan
 * @Date: 2020-04-15 22:21:06
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-10 15:40:41
 * @Description: 
 -->
<template>
  <div class="course-content-item">
    <div class="course-item-thumb">
      <img :src="item.imageUrl" alt="">
    </div>
    <div class="course-item-detail">
      <div class="course-item-title">
        <div class="text ellipsisLineTwo">
          <p>{{item.name}}</p>
        </div>
        <div class="status">
          <span>{{item.status}}</span>
        </div>
      </div>
      <div class="course-item-digest ellipsisLineTwo">
        <p>
          {{item.detail}}
        </p>
      </div>
      <div class="course-item-source">
        <div class="organization">
          <span>发布机构:</span>
          <span>{{item.oriEnterpriseName}}</span>
        </div>
        <div class="publishTime">
          <span>发布时间:</span>
          <span>{{item.publishDate | formaData}}</span>
        </div>
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
