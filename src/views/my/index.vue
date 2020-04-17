<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:38:27
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-18 00:07:48
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <div class="my-content">
        <my-header></my-header>
        <div class="my-list-content">
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <div class="info">
                <i class="iconfont" :class="[item.icon ? item.icon : '']" :style="{color:item.color}"></i>
                <span>{{item.text}}</span>
              </div>
              <div class="arrows">
                <i class="iconfont icontubiao-13"></i>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
    <Footer></Footer>
  </div>

</template>

<script>
import MyHeader from "@/components/my-header";
import Footer from "@/components/common/footer";
export default {
    data() {
        return {
            list: [
                {
                    icon: "icontubiao-14",
                    text: "我的信息",
                    color: "rgba(224, 32, 32, 1)"
                },
                {
                    icon: "icontubiao-15",
                    text: "我的课件",
                    color: "rgba(60, 206, 181, 1)"
                },
                {
                    icon: "icontubiao-17",
                    text: "我的任务",
                    color: "rgba(255, 157, 59, 1)"
                },
                {
                    icon: "icontubiao-16",
                    text: "我的通知",
                    color: "rgba(238, 27, 27, 1)"
                }
            ]
        };
    },
    components: {
        MyHeader,
        Footer
    }
};
</script>

<style lang="less">
.my-content {
    background: rgba(245, 245, 245, 1);
    height: 100%;
    .my-list-content {
        width: 7rem;
        height: calc(100% - 3.9rem);
        background: #fff;
        margin: 0 auto;
        border-radius: 0.21rem 0.21rem 0 0;
        transform: translateY(-0.5rem);
        ul {
            padding-left: 0.38rem;
            padding-right: 0.4rem;
            li {
                padding-top: 0.26rem;
                padding-bottom: 0.26rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 0.02rem solid rgba(238, 238, 238, 1);
                .info {
                    i {
                        font-size: 0.32rem;
                    }
                    span {
                        font-size: 0.28rem;
                        font-family: MicrosoftYaHei;
                        color: rgba(51, 51, 51, 1);
                        line-height: 0.37rem;
                        -webkit-background-clip: text;
                        margin-left: 0.3rem;
                    }
                }
                .arrows {
                    i {
                        transform: rotate(180deg);
                        font-size: 0.24rem;
                        color: rgba(153, 153, 153, 1);
                    }
                }
            }
        }
    }
}
</style>