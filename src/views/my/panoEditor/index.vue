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
            this.$nextTick(() => {
                embedpano({
                    id: "kr",
                    swf: "/pano/tour.swf",
                    xml: `/pano/${this.isShowToobar ? "main" : "main_c"}.xml`,
                    target: "p_editor",
                    html5: "prefer",
                    mobilescale: 1.0,
                    passQueryParameters: true
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
