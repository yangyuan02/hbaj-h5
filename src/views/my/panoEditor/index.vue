<template>
    <div class="p_editor_container">
        <div id="p_editor"></div>
        <Comment :isShow="isShow" :eventConfirm="confirm" :eventCancel="cancel" ref="Comment" :title="opt.title" :cancelText="opt.cancelText" :confirmText="opt.confirmText" />
    </div>
</template>

<script>
import { project } from "@/model/api";
import Comment from "@/components/comment";
export default {
    data() {
        return {
            isShow: false,
            opt: {
                title: "默认标题",
                cancelText: "取消",
                confirmText: "确认"
            }
        };
    },
    components: {
        Comment
    },
    methods: {
        initPano() {
            const projectId = this.$route.params.projectId;
            const scale = 1 / window.devicePixelRatio || 1;
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "/pano/tour.swf",
                    xml: `/pano/${this.isShowToobar ? "main" : "main_c"}.xml`,
                    target: "p_editor",
                    html5: "prefer",
                    mobilescale: 1 / scale,
                    passQueryParameters: true,
                    onready: buildProject(projectId)
                });
            });
        },
        getProject() {
            const projectId = this.$route.params.projectId;
            project(
                {
                    type: "get"
                },
                projectId
            ).then(res => {
                if (res.suceeded) {
                    const { name, imageUrl } = res.data;
                    const baseUrl = location.origin + "/pano/" + imageUrl;
                    if (window.__wxjs_environment === "miniprogram") {
                        wx.miniProgram.postMessage({ data: { name, imageUrl: baseUrl } });
                    }
                }
            });
        },
        toggleComment() {
            this.isShow = !this.isShow;
        },
        confirm(content) {
            this.toggleComment();
        },
        getText() {
            if (this.$refs.Comment) {
                return this.$refs.Comment.content;
            }
        },
        cancel() {
            this.toggleComment();
        },
        exportWindow() {
            window.hban_comment_getText = this.getText.bind(this);
            window.hban_comment_toggleComment = this.toggleComment.bind(this);
            window.hban_comment_setOpt = data => {
                this.opt = Object.assign(this.opt, data);
            };
            window.hban_comment_confirm = callBack => {
                callBack && callBack();
                this.toggleComment();
            };
            window.hban_comment_cancel = callBack => {
                callBack && callBack();
                this.toggleComment();
            };
        }
    },
    computed: {
        isShowToobar: function() {
            // 1 我的任务过 2课件过来
            return this.$route.params.from === "1";
        }
    },
    mounted() {
        this.getProject();
        this.initPano();
        this.exportWindow();
    },
    beforeDestroy() {
        window.removepano && window.removepano("kr");
    }
};
</script>

<style lang="less" scoped>
.p_editor_container {
    width: 100%;
    height: 100%;
    #p_editor {
        width: 100%;
        height: 100%;
    }
}
</style>
