<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:38:27
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-19 23:40:31
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper">
      <div class="my-content">
        <my-header :info="user"></my-header>
        <div class="person-box">
          <div class="role"></div>
          <div class="organization"></div>
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
            user: {}
        };
    },
    components: {
        MyHeader,
        Footer
    },
    methods: {
        getUserDetail() {
            const userId = store.get("userId", "local");
            user(
                {
                    type: "get"
                },
                userId
            ).then(res => {
                if (res.suceeded) {
                    this.user = res.data;
                }
            });
        }
    },
    mounted() {
        this.getUserDetail();
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
                    .unreadCount {
                        width: 0.44rem;
                        height: 0.44rem;
                        background: rgba(238, 27, 27, 1);
                        text-align: center;
                        line-height: 0.44rem;
                        border-radius: 50%;
                        color: #fff;
                        display: inline-block;
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