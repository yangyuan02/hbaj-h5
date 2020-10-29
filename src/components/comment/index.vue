<template>
    <Overlay v-if="isShow">
        <div class="ui-model-container">
            <div class="ui-model-header">{{ title }}</div>
            <div class="ui-model-bd">
                <textarea v-model="content" />
            </div>
            <div class="ui-model-ft">
                <div class="button-group">
                    <span class="ui-model-confirm" @click="confirm">{{ confirmText }}</span>
                    <span class="ui-model-cancel" @click="cancel">{{ cancelText }}</span>
                </div>
            </div>
        </div>
    </Overlay>
</template>

<script>
import Overlay from "@/components/overlay";
export default {
    components: {
        Overlay
    },
    data() {
        return {
            content: ""
        };
    },
    props: {
        title: {
            type: String,
            default: "默认标题"
        },
        isShow: {
            type: Boolean,
            default: false,
            required: true
        },
        cancelText: {
            type: String,
            default: "取消"
        },
        confirmText: {
            type: String,
            default: "确认"
        },
        eventConfirm: {
            type: Function,
            default: () => {}
        },
        eventCancel: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        confirm() {
            const content = this.content;
            this.eventConfirm && this.eventConfirm(content);
        },
        cancel() {
            this.eventCancel && this.eventCancel();
        }
    }
};
</script>

<style lang="less">
.ui-model-container {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .ui-model-header {
        background: #f8f8f8; //0f4fa8
        height: 0.66rem;
        text-align: center;
        font-size: 0.3rem;
        color: #0f4fa8;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ui-model-bd {
        background: #fff;
        height: 4rem;
        padding: 0.2rem;
        & textarea {
            width: 100%;
            height: 100%;
            font-size: 0.3rem;
            outline: none;
            border: 1px solid #0f4fa8;
        }
    }
    .ui-model-ft {
        height: 0.66rem;
        font-size: 0.32rem;
        background: #fff;
        padding-right: 0.2rem;
        .button-group {
            float: right;
            span {
                padding: 0.1rem 0.24rem;
                border: 1px solid #0f4fa8;
                border-radius: 0.1rem;
                &.ui-model-confirm {
                    margin-right: 0.4rem;
                }
            }
        }
    }
}
</style>
