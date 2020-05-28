<!--
 * @Author: yangyuan
 * @Date: 2020-04-14 21:30:31
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-28 10:51:41
 * @Description: 
 -->
<template>
  <div class="page-view">
    <div class="scroll-view-wrapper" :class="{ 'menu-pBottom': menupB }">
      <Header title="海宝安检"></Header>
      <div class="home-banner">
        <Banner :bannerList="bannerList"></Banner>
      </div>
      <Nav></Nav>
      <div class="news">
        <Title title="海宝资讯" :onClick="() => goTo('/news')"></Title>
        <div class="new-content">
          <div class="news-item" v-for="(item, index) in newsList" @click="toNewsDetail(item.id)">
            <div class="title">
              <p class="ellipsis">{{item.title}}</p>
            </div>
            <div class="digest">
              <!-- <p class="ellipsisLineTwo">{{item.summary}}</p> -->
              <div class="organization">
                <span>发布机构:</span>
                <span>{{item.author}}</span>
              </div>
              <div class="publishTime">
                <span>发布时间:</span>
                <span>{{item.publishTime | formaData}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="course-content">
        <Title title="公众课件" :onClick="() => goTo('/course')"></Title>
        <List :recommendProjectList="recommendProjectList"></List>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Banner from "./banner.vue";
import List from "./list.vue";
import Nav from "@/components/nav";
import Title from "@/components/title";
import Footer from "@/components/common/footer";
import Header from "@/components/common/header";
import { home } from "@/model/api";
import store from "@/widget/store";

export default {
    data() {
        return {
            menupB: true,
            bannerList: [],
            recommendProjectList: [],
            newList: [],
            items: []
        };
    },
    components: {
        Banner,
        List,
        Nav,
        Footer,
        Header,
        Title
    },
    methods: {
        getHome() {
            this.$showLoading();
            home({ type: "GET" }, "app/pageInfo").then(res => {
                this.$hideLoading();
                if (res.suceeded) {
                    const { recommendProject, navImage, newsList, newsDefaultImage } = res.data;
                    this.recommendProjectList = recommendProject;
                    this.bannerList = navImage.map(item => (item = JSON.parse(item)));
                    this.items = newsList;
                    store.set("newsDefaultImage", newsDefaultImage, "local");
                }
            });
        },
        toNewsDetail(id) {
            this.$router.push({
                name: "newsDetail",
                params: {
                    id
                }
            });
        },
        goTo(path) {
            this.$router.push({ path });
        }
    },
    computed: {
        newsList: function() {
            return this.items.slice(0, 2);
        }
    },
    mounted() {
        this.getHome();
    }
};
</script>
<style lang="less">
.scroll-view-wrapper {
    .news {
        margin: 0.18rem 0rem;
        .new-content {
            width: 100%;
            background: #fff;
            padding: 0.22rem 0.24rem;
            .news-item {
                padding-top: 0.18rem;
                padding-bottom: 0.15rem;
                border-bottom: 0.02rem solid rgba(221, 221, 221, 1);
                &:last-child {
                    border-bottom: 0;
                }
                .title {
                    p {
                        font-size: 0.28rem;
                        font-family: MicrosoftYaHei;
                        color: rgba(51, 51, 51, 1);
                        line-height: 0.37rem;
                        letter-spacing: 0.01rem;
                        -webkit-background-clip: text;
                    }
                    margin-bottom: 0.18rem;
                }
                .digest {
                    display: flex;
                    color: rgba(153, 153, 153, 1);
                    .publishTime {
                        margin-left: 0.2rem;
                    }
                    p {
                        font-family: MicrosoftYaHei;
                        color: rgba(102, 102, 102, 1);
                        line-height: 0.31rem;
                        letter-spacing: 0.01rem;
                        -webkit-background-clip: text;
                    }
                }
            }
            p {
                font-family: MicrosoftYaHei;
                color: rgba(102, 102, 102, 1);
                line-height: 0.31rem;
                letter-spacing: 0.01rem;
                -webkit-background-clip: text;
                margin-bottom: 0.14rem;
                &:last-child {
                    margin-bottom: 0rem;
                }
            }
        }
    }
    .course-content {
        width: 100%;
        background: #fff;
    }
}
</style>
