<!--
 * @Author: yangyuan
 * @Date: 2020-04-20 22:10:56
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-31 22:53:56
 * @Description: 
 -->
<template>
  <div class="task-item-content">
    <div class="task-item-title">
      <div class="text">
        <p class="ellipsisLineTwo">{{item.name}}</p>
      </div>
      <div class="status">
        <span>{{ item.status | formTaskText }}</span>
      </div>
    </div>
    <div class="task-item-detail">
      <div class="task-item-thumb">
        <div class="action">
          <span>立即执行</span>
        </div>
      </div>
      <div class="task-item-digest">
        <div class="duty"><span>负责人:</span><span>{{item.creatorSgname}}</span></div>
        <div class="start-time"><span>发起时间:</span><span>{{item.startDate| formaData }}</span></div>
        <div class="end-time"><span>结束时间:</span><span>{{item.expireDate | formaData }}</span></div>
        <div class="member-content">
          <div class="text"><span>协作成员:</span></div>
          <div class="member-item">
            <span v-for="(k,index) in item.project.userList">{{k.sgname}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="less">
.task-item-content {
    width: 6.8rem;
    margin: 0 auto;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0rem 0.01rem 0.03rem 0rem rgba(0, 0, 0, 0.5);
    border-radius: 0.1rem;
    filter: blur(0rem);
    margin-bottom: 0.18rem;
    padding: 0.32rem 0.16rem 0.32rem 0.16rem;
    &:last-child {
        margin-bottom: 0;
    }
    .task-item-title {
        display: flex;
        .text {
            flex: 1;
            margin-right: 0.08rem;
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
            width: 0.7rem;
            height: 0.34rem;
            background: rgba(255, 157, 59, 1);
            border-radius: 0.02rem;
            text-align: center;
            line-height: 0.34rem;
            span {
                font-size: 0.2rem;
                font-family: MicrosoftYaHei;
                color: rgba(255, 255, 255, 1);
                line-height: 0.26rem;
            }
        }
    }
    .task-item-detail {
        margin-top: 0.39rem;
        display: flex;
        .task-item-thumb {
            width: 2.1rem;
            height: 2.1rem;
            background: #f0f0f0;
            margin-right: 0.3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            .action {
                width: 1.3rem;
                height: 0.4rem;
                background: rgba(0, 0, 0, 0.6);
                border-radius: 0.2rem;
                text-align: center;
                line-height: 0.4rem;
                span {
                    font-size: 0.22rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 0.29rem;
                    -webkit-background-clip: text;
                }
            }
        }
        .task-item-digest {
            flex: 1;
            font-size: 0.24rem;
            font-family: MicrosoftYaHei;
            color: rgba(102, 102, 102, 1);
            line-height: 0.38rem;
            letter-spacing: 0.01rem;
            -webkit-background-clip: text;
            .text {
                width: 1.6rem;
            }
            .member-content {
                display: flex;
                flex: 1;
                .member-item {
                    span {
                        margin-right: 0.1rem;
                    }
                }
            }
        }
    }
}
</style>