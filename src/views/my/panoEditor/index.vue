<template>
    <div class="p_editor_container">
        <div id="p_editor"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
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
        }
    },
    computed: {
        isShowToobar: function() {
            // 1 我的任务过 2课件过来
            return this.$route.params.from === "1";
        }
    },
    mounted() {
        this.initPano();
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
