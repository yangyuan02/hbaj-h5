<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:43:01
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-04-18 00:23:55
 * @Description: 
 -->
 <template>
  <div class="my-header-content">
    <header>
      <span>我的</span>
    </header>
    <div class="my-person-info">
      <div class="person-thumb"></div>
      <div class="person-digest">
        <div class="nickname">
          <span>船福</span>
        </div>
        <div class="info">
          <span>这是一段自我介绍的文字。这是一段自我介绍的文字这是一段自我介绍的文字这是一段自我介绍的文字这是一段自我介绍的文字这是一段自我 介绍的文字。这是一段自我介绍的文字</span>
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
.my-header-content {
    width: 100%;
    height: 4.4rem;
    background: #f0f0f0;
    position: relative;
    header {
        height: 0.88rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        span {
            color: #fff;
        }
    }
    .my-person-info {
        display: flex;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 0.24rem;
        .person-thumb {
            width: 1.57rem;
            height: 1.57rem;
            border-radius: 50%;
            background: red;
            margin-right: 0.38rem;
        }
        .person-digest {
            flex: 1;
            .nickname {
                margin-bottom: 0.43rem;
                span {
                    font-size: 0.3rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 0.4rem;
                }
            }
            .info {
                span {
                    font-size: 0.24rem;
                    font-family: MicrosoftYaHei;
                    color: rgba(255, 255, 255, 1);
                    line-height: 0.42rem;
                }
            }
        }
    }
}
</style>