<template>
  <div class='ui-tabs' :class="{'ui-tabs-border':isBorder}">
    <div class='ui-tab-item' v-if='showTabItem'>
      <span :key='tab.id || index' v-for='(tab, index) in tabs' :class="{'active': tab.active}" @click='select(tab, index)'>
        {{tab.name}}
      </span>
      <span class="ui-tab-bar-underline" :style='barUnderlineStyle'></span>
    </div>
    <div class='ui-tab-item-content' v-if='showTabItem'>
      <div class='ui-tab-item-content-slot' :style='uiTabItemContentStyle'>
        <slot></slot>
      </div>
    </div>
    <div class='ui-tabs-no-data' v-if="isData">
      <p>无数据！</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      /**
       * [{name: string, value: number}]
       */
      default: [],
      type: Array
    },
    eventFn: {
      default: null,
      type: Function
    },
    defaultTabIndex: {
      default: 0,
      type: Number
    },
    isData: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      barUnderlineStyle: {},
      uiTabItemContentStyle: {}
    };
  },
  computed: {
    showTabItem() {
      return this.tabs.length > 0;
    }
  },
  methods: {
    eventEmitter(tab) {
      if (this.eventFn && this.eventFn instanceof Function) {
        this.eventFn(tab);
      }
    },
    changeBarUnderlineStyle(index) {
      index = index > 0 ? index : 0;

      const width = `${100 / (this.tabs.length || 1)}`;

      this.barUnderlineStyle = Object.assign(
        {},
        {
          width: `${width - 10}%`,
          left: `${width * index + 5}%`
        }
      );
    },
    addSlotDefaultClass() {
      const slot = this.$slots.default;

      if (slot.length > 0) {
        slot.forEach(item => {
          item['elm']['classList'].add('ui-tab-item-content-slot-item');
        });
      }
    },
    activeSlotChild(index) {
      const target = this.$slots.default[index];

      if (target) {
        this.$slots.default.forEach((item, i) => {
          i === index ? item['elm']['classList'].add('active') : item['elm']['classList'].remove('active');
        });

        this.uiTabItemContentStyle = {
          transform: `translate3d(${-100 * index}%, 0px, 1px)`
        };
      }
    },
    select(tab, index) {
      this.tabs.forEach(item => {
        this.$set(item, 'active', item['value'] === tab['value']);
      });

      this.changeBarUnderlineStyle(index);

      this.activeSlotChild(index);

      this.eventEmitter(tab);
    }
  },
  created: function() {
    this.changeBarUnderlineStyle(this.defaultTabIndex);
  },
  mounted: function() {
    this.addSlotDefaultClass();
    this.activeSlotChild(this.defaultTabIndex);
  }
};
</script>

<style lang='less'>
.ui-tabs {
  position: relative;
  overflow-x: hidden;
  height: 100%;
  width: 100%;

  .ui-tab-item {
    height: 0.94rem;
    background-color: #fff;
    display: flex;
    position: fixed;
    width: 100%;
    z-index: 9999;

    span {
      flex: 1;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.94rem;
      transition: 0.2s all linear;
      cursor: pointer;
      position: relative;
    }

    .ui-tab-bar-underline {
      position: absolute;
      transition: top 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1),
        color 0.3s cubic-bezier(0.35, 0, 0.25, 1), width 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      height: 0.15rem;
      background-color: #4496c8ff;
      bottom: 0;
    }
  }

  .ui-tab-item-content {
    margin: 0.2rem;
    background-color: #fff;
    overflow: hidden;
    flex-direction: column;
    margin-top: 1.2rem;

    .ui-tab-item-content-slot {
      transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1),
        top 0.3s cubic-bezier(0.35, 0, 0.25, 1), -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);
      display: flex;
      flex: 1;
      width: 100%;
      height: 100%;
      touch-action: pan-x pan-y;
      will-change: transform, left, top;

      .ui-tab-item-content-slot-item {
        height: 0;
        overflow: visible;
        width: 100%;
        flex-shrink: 0;

        &.active {
          height: auto;
        }
      }
    }
  }
  .ui-tabs-no-data {
    display: flex;
    align-items: center;
    p {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
