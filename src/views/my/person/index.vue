<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:38:27
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-24 22:20:49
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper" :class="{ 'menu-pBottom': menupB }">
      <div class="my-content">
        <my-header :info="user"></my-header>
        <div class="person-box">
          <div class="role common">
            <div class="thumb"></div>
            <div class="name">
              <span>港口检察官</span>
            </div>
            <div class="tag">
              <span>角色</span>
            </div>
          </div>
          <div class="organization common">
            <div class="thumb"></div>
            <div class="name">
              <span>宝山海事局</span>
            </div>
            <div class="tag">
              <span>机构</span>
            </div>
          </div>
          <div class="auth-box">
            <div class="title">
              <span>豪华游轮访问权限</span>
            </div>
            <div class="major-box">
              <div class="left-major">
                <ul>
                  <li class="active">技术解读</li>
                  <li>专业英语</li>
                  <li>模拟训练</li>
                </ul>
              </div>
              <div class="right-major">
                <div class="item" v-for="(item, index) in 16">
                  <span>救生</span>
                </div>
              </div>
            </div>
            <div class="tag">
              <span>权限</span>
            </div>
          </div>
          <div class="auth-box">
            <div class="title">
              <span>豪华游轮访问权限</span>
            </div>
            <div class="major-box">
              <div class="left-major">
                <ul>
                  <li class="active">技术解读</li>
                  <li>专业英语</li>
                  <li>模拟训练</li>
                </ul>
              </div>
              <div class="right-major">
                <div class="item" v-for="(item, index) in 16">
                  <span>救生</span>
                </div>
              </div>
            </div>
            <div class="tag">
              <span>权限</span>
            </div>
          </div>
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
            user: {},
            menupB: true
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
.person-box {
    padding: 0.27rem 0.35rem;
    background: #fff;
    min-height: 100%;
    .common {
        display: flex;
        align-items: center;
        background: rgba(15, 79, 168, 1);
        padding: 0.16rem;
        position: relative;
        .thumb {
            width: 1.2rem;
            height: 1.2rem;
            background: #f0f0f0;
            margin-left: 0.5rem;
            margin-right: 0.3rem;
        }
        .name {
            font-size: 0.28rem;
            font-family: MicrosoftYaHei;
            color: rgba(255, 255, 255, 1);
            line-height: 0.37rem;
            letter-spacing: 0.01rem;
            -webkit-background-clip: text;
        }
        .tag {
            width: 1.3rem;
            height: 0.4rem;
            background: rgba(224, 32, 32, 1);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 0.2rem 0px 0px 0.2rem;
            position: absolute;
            right: 0;
            top: 0.16rem;
            span {
                color: #fff;
            }
        }
    }
    .organization {
        margin: 0.16rem 0;
        .tag {
            background: rgba(255, 213, 26, 1);
        }
    }
    .auth-box {
        position: relative;
        width: 6.8rem;
        height: 3.51rem;
        background: rgba(15, 79, 168, 1);
        border-radius: 0.1rem;
        padding-left: 0.2rem;
        padding-top: 0.2rem;
        margin-bottom: 0.16rem;
        &:last-child {
            margin-bottom: 0rem;
        }
        .title {
            span {
                color: #fff;
            }
        }
        .major-box {
            display: flex;
            margin-top: 0.2rem;
            .left-major {
                ul {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    height: 100%;
                    li {
                        color: #fff;
                        position: relative;
                        padding-left: 0.1rem;
                        &.active {
                            &::before {
                                content: "";
                                height: 100%;
                                width: 0.04rem;
                                position: absolute;
                                left: 0;
                                top: 0;
                                background: rgba(255, 157, 59, 1);
                            }
                        }
                    }
                }
            }
            .right-major {
                width: 4.63rem;
                height: 2.6rem;
                background: rgba(0, 145, 255, 1);
                border-radius: 0.1rem;
                margin-left: 0.16rem;
                padding: 0.1rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .item {
                    width: 0.9rem;
                    height: 0.4rem;
                    border-radius: 0.04rem;
                    border: 0.01rem solid rgba(255, 255, 255, 1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        color: #fff;
                    }
                }
            }
        }
        .tag {
            position: absolute;
            width: 1.3rem;
            height: 0.4rem;
            background: rgba(255, 157, 59, 1);
            border-radius: 0.2rem 0px 0px 0.2rem;
            right: 0;
            top: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                color: #fff;
            }
        }
    }
}
</style>