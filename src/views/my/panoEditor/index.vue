<template>
    <div class="p_editor_container">
        <div id="p_editor">
            <!-- <iframe :src="src" style="width:100%;height:100%"></iframe> -->
        </div>
    </div>
</template>

<script>
import { project } from "@/model/api";
export default {
    data() {
        return {
            src: ""
        };
    },
    methods: {
        initPano() {
            const projectId = this.$route.params.projectId;
            const scale = 1 / window.devicePixelRatio || 1;
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "https://msa_pc.vr2shipping.com/pano/tour.swf",
                    xml: `https://msa_pc.vr2shipping.com/pano/${this.isShowToobar ? "main" : "main_c"}.xml`,
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
                    const baseUrl = "https://msa_pc.vr2shipping.com/pano/" + imageUrl;
                    if (window.__wxjs_environment === "miniprogram") {
                        wx.miniProgram.postMessage({ data: { name, imageUrl: baseUrl } });
                    }
                }
            });
        },
        iframe() {
            const scale = 1 / window.devicePixelRatio || 1;
            this.src = `https://msa.vr2shipping.com/pano/index.html?id=${this.$route.params.projectId}&scale=${scale}`;
        }
    },
    computed: {
        isShowToobar: function() {
            // 1 我的任务过 2课件过来
            return this.$route.params.from === "1";
        }
    },
    created() {
        // this.iframe();
    },
    mounted() {
        this.getProject();
        this.initPano();
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
