<template>
  <div class="left-right-layout">
    <div class="left" :style="{ 'flex-basis': leftWidth, 'padding-top': paddingTop }">
      <slot name="left"></slot>
      <slot name="mapLegend"></slot>
      <div class="tools" :style="_toolsPosition">
        <slot name="tools"></slot>
      </div>
      <div class="tools" :style="_toolsPosition2">
        <slot name="tools2"></slot>
      </div>
      <div class="tools" :style="_toolsPosition3">
        <slot name="tools3"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'LeftRight',
    props: {
      leftWidth: {
        type: String,
        default: '70%'
      },
      toolsPosition: {
        type: Object,
        default() {
          return {
            left: '0px',
            top: '0px'
          }
        }
      },
      toolsPosition2: {
        type: Object,
        default() {
          return {
            right: '30px',
            top: '50px'
          }
        }
      },
      toolsPosition3: {
        type: Object,
        default() {
          return {
            right: '0px',
            top: '0px'
          }
        }
      },
      paddingTop: {
        type: String,
        default: '0px'
      }
    },
    computed: {
      _toolsPosition() {
        if (this.toolsPosition) {
          return this.toolsPosition
        } else {
          return {
            right: '30px',
            top: '50px'
          }
        }
      },

      _toolsPosition2() {
        if (this.toolsPosition2) {
          return this.toolsPosition2
        } else {
          return {
            left: '30px',
            top: '50px'
          }
        }
      },

      _toolsPosition3() {
        if (this.toolsPosition3) {
          return this.toolsPosition3
        } else {
          return {
            left: '0px',
            bottom: '0px'
          }
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  .left-right-layout {
    height: 100%;
    width: 100%;
    display: flex;
    .left {
      position: relative;
      // flex-basis: 1250px;
      flex-grow: 0;
    }
    .right {
      flex-grow: 1;
      flex-basis: 680px;
      box-shadow: 0 2px 8px 0 rgba(23, 35, 61, 0.25);
    }
    .tools {
      position: absolute;
    }
  }
  .shouye_page .tools {
    width: 100%;
  }
</style>
