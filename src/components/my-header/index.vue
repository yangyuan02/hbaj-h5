<!--
 * @Author: yangyuan
 * @Date: 2020-04-17 21:43:01
 * @Email: 1367511704@qq.com
 * @LastEditTime: 2020-05-18 21:30:13
 * @Description: 
 -->
<template>
    <div class="my-header-content">
        <header>
            <i class="iconfont icontubiao-13 goBack" @click="$router.back(-1)" v-if="isBack"></i>
            <span>我的</span>
            <i class="iconfont icontubiao-251 edit" @click="edit" v-if="isEdit"></i>
        </header>
        <div class="my-person-info">
            <div class="person-thumb">
                <input v-if="isOnUplaod" type="file" @change="uploadAvatar($event)" class="upload_file" accept="image/png,image/jpeg,image/jpg" />
                <img :src="globalConfig.imagePath + info.avatar" alt="" v-if="info.avatar" />
            </div>
            <div class="person-digest">
                <div class="nickname">
                    <span>{{ info.namecard }}</span>
                </div>
                <div class="info">
                    <span>{{ info.description }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ImageUpload from "@/widget/imageUpload";
export default {
    data() {
        return {};
    },
    props: {
        info: {
            type: Object,
            default: {}
        },
        onUploadSuccess: {
            type: Function,
            default: () => {}
        },
        isOnUplaod: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: true
        },
        isBack: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        uploadAvatar(e, opt) {
            this.$showLoading();

            var file = e.currentTarget.files[0];
            const info = this.info;
            var imageUpload = new ImageUpload(file, {
                url: `/api/file/upload?fileName=${info.namecard}&relatedId=${info.id}&fileType=USER_AVATAR`,
                fileKey: "file",
                onUpload: result => {
                    this.$hideLoading();

                    if (result.suceeded >= 1) {
                        // this.params[opt.img] = result.data.img_dir
                        e.target.value = "";
                        if (this.onUploadSuccess && typeof this.onUploadSuccess === "function") {
                            this.onUploadSuccess(result.data);
                        }
                        console.log(result);
                    } else {
                        this.$toast(result.msg);
                    }
                },
                onError: () => {
                    this.$toast("网络服务器错误");
                }
            });
            imageUpload.start();
        },
        edit() {
            this.$router.push({ name: "mySetting" });
        }
    }
};
</script>

<style lang="less">
.my-header-content {
    width: 100%;
    height: 4.4rem;
    background: url("./images/header-bg.png");
    background-size: 100%;
    position: relative;
    header {
        height: 0.88rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        position: relative;
        span {
            color: #fff;
        }
        .edit {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 0.34rem;
        }
        .goBack {
            position: absolute;
            left: 0.2rem;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
            font-size: 0.3rem;
        }
    }
    .my-person-info {
        display: flex;
        padding: 0 0.24rem;
        .person-thumb {
            width: 1.57rem;
            height: 1.57rem;
            border-radius: 50%;
            background: url("./images/person.png");
            background-size: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .upload_file {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
                z-index: 110;
            }
        }
        .person-digest {
            flex: 1;
            margin-left: 1.87rem;
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
