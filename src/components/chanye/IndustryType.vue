<template>
  <div class="industry-type-wrapper industry-map-custom-iview">
    <div class="control-block" @click="handleClick">
      <el-icon class="icon-compass" :size="18.3"><info-filled /></el-icon>
      <span class="title">产业类型</span>
      <div style="flex: 2"></div>
      <el-icon class="icon-arrow" :class="{ rotated: showPanel }" :size="20"
        ><arrow-down
      /></el-icon>
    </div>
    <div class="placeholder" :style="{ width: panelSize[0], height: panelSize[1] }"></div>
    <div class="panel" ref="panel">
      <el-radio-group v-model="selectedItems">
        <el-radio
          v-for="item in types"
          :key="item"
          :value="item"
          :label="item"
          style="width: 160px; height: 25px"
        />
      </el-radio-group>
    </div>
  </div>
</template>

<script>
  import { ArrowDown, InfoFilled } from '@element-plus/icons'
  export default {
    name: 'IndustryType',
    components: { ArrowDown, InfoFilled },
    props: {
      types: {
        type: Array,
        default() {
          return [
            '智能装备制造',
            '电子信息',
            '新能源新材料',
            '非织造布',
            '食品加工',
            '文化旅游现代服务'
          ]
        }
      }
    },
    emits: ['close-panel', 'open-panel', 'change'],
    data() {
      return {
        showPanel: false,
        selectedItems: '',
        panelSize: ['0', '0']
      }
    },
    watch: {
      selectedItems(cv) {
        this.$emit('change', cv)
        this.handleClick()
      }
    },
    methods: {
      handleClick() {
        if (this.showPanel) {
          this.showPanel = false
          this.panelSize = ['0', '0']
          this.$emit('close-panel')
        } else {
          this.showPanel = true
          const { width, height } = getComputedStyle(this.$refs.panel)
          this.panelSize = [width, height]
          this.$emit('open-panel')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .industry-type-wrapper {
    box-sizing: border-box;
    position: relative;
    background: #fff;
    border-radius: 2px;
    min-height: 32px;
    overflow: hidden;
    width: max-content;
    box-shadow: 0 2px 8px 0 rgba(23, 35, 61, 0.25);
    .control-block {
      padding: 0 10px;
      height: 40px;
      width: 160px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .icon-compass {
        // color: #048CFB;
      }

      .icon-arrow {
        // color: #048CFB;
        justify-self: center;
        transition: transform 0.3s ease-in;
        transform: rotate(180deg);

        &.rotated {
          transform: rotate(0deg);
        }
      }

      .title {
        font-family: PingFangSC-Semibold;
        vertical-align: baseline;
        font-size: 14px;
        // color: #FFFFFF;
        letter-spacing: 0;
        margin-left: 8px;
        margin-right: 8px;
      }
    }

    .placeholder {
      transition: height 0.4s ease-in-out, width 0.4s ease-in-out;
    }

    .panel {
      box-sizing: border-box;
      position: absolute;
      left: 0;
      top: 32px;
      padding: 19px 11px;
      min-width: 364px;
    }
  }
</style>
<style lang="scss">
  .industry-type-wrapper.industry-map-custom-iview {
    .ivu-checkbox-wrapper {
      margin-right: 0;
      min-width: 167px;
    }
  }
</style>
