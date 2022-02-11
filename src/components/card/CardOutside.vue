<template>
  <div class="card-wrapper">
    <div class="ivu-card">
      <div class="ivu-card-body">
        <el-card shadow="never" class="box-card">
          <div class="titleBox" v-if="title != ''">
            <span class="title">{{ title }}</span>
            <!-- <div style="position:relative"> -->
            <el-icon size="16" class="left titleicon"><arrow-right /></el-icon>
            <el-icon size="16" class="right titleicon"><arrow-right /></el-icon>
            <!-- </div> -->
          </div>
          <div class="card-content">
            <slot></slot>
          </div>
        </el-card>
        <el-icon size="20" class="left_top bordericon"><arrow-left /></el-icon>
        <el-icon size="20" class="left_bottom bordericon"><arrow-left /></el-icon>
        <el-icon size="20" class="right_top bordericon"><arrow-left /></el-icon>
        <el-icon size="20" class="right_bottom bordericon"><arrow-left /></el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { ArrowLeft, ArrowRight } from '@element-plus/icons'

  export default defineComponent({
    name: 'CardOutside',
    components: { ArrowLeft, ArrowRight },
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  })
</script>
<style lang="scss" scoped>
  .card-wrapper {
    background: #093068;
    box-shadow: 0px 2px 6px 0px rgba(36, 128, 179, 1);
    border: 1px solid rgba(36, 128, 180, 1);
    position: relative;
    .bordericon {
      position: absolute;
      color: #02cde6;
    }
    .left_top {
      top: -9px;
      transform: rotate(44deg);
      left: -9px;
    }
    .left_bottom {
      bottom: -9px;
      left: -10px;
      transform: rotate(-44deg);
    }
    .right_bottom {
      bottom: -9px;
      right: -9px;
      transform: rotate(-135deg);
    }
    .right_top {
      top: -9px;
      right: -9px;
      transform: rotate(135deg);
    }
    .titleBox {
      height: 30px;
      border-bottom: 1px solid rgba(36, 128, 180, 1);
      margin-bottom: 10px;
      .titleicon {
        transform: rotate(180deg);
        margin-bottom: 5px;
        // color: #02CDE6;
        // position: absolute;
      }
      .left {
        color: #9acef7;
      }
      .right {
        color: #2d8fdb;
        position: relative;
        right: 10px;
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        // color: rgba(133, 199, 241, 1);
        color: #fff;
        letter-spacing: 0;
        line-height: 24px;
        display: inline-block;
        height: 30px;
        font-weight: normal;
      }
    }
    .card-content {
      color: #8daac2;
    }
  }
  .shouye_page {
    .ivu-card {
      background-color: rgba(9, 48, 104, 1);
    }
  }
  .box-card {
    border: none;
    border-radius: 0;
    background: none;
  }
  .showBox .ivu-card-body {
    padding: 5px 16px;
  }
  ::v-deep(.el-card__body) {
    padding: 0;
  }
</style>
