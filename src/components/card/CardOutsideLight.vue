<template>
  <div class="card-wrapper">
    <div class="ivu-card">
      <div class="ivu-card-body">
        <el-card shadow="never" class="box-card">
          <div class="titleBox" v-if="title != ''">
            <span class="title">{{ title }}</span>
            <el-icon size="16" class="left titleicon"><arrow-right /></el-icon>
            <el-icon size="16" class="right titleicon"><arrow-right /></el-icon>
            <!-- </div> -->
            <span class="right_title" v-if="hasHistoryData" @click="Viewhistory"
              >查看历史数据
              <el-icon size="16" class="left titleicon"><arrow-right /></el-icon>
              <el-icon size="16" class="right titleicon"><arrow-right /></el-icon>
            </span>
          </div>
          <div class="card-content">
            <slot></slot>
          </div>
        </el-card>
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
      },
      disHover: {
        type: Boolean,
        default: false
      },
      hasHistoryData: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    emits: ['Viewhistory'],
    methods: {
      Viewhistory() {
        this.$emit('Viewhistory', this.title)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .card-wrapper {
    // background: #093068;
    // box-shadow: 0px 2px 6px 0px rgba(36, 128, 179, 1);
    // border: 1px solid rgba(36, 128, 180, 1);
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
      border-bottom: 1px solid #5a9fc6;
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
      .lefticon {
        color: #2d8fdb;
      }
      .righticon {
        color: #9acef7;
        position: relative;
        right: 10px;
      }
      .title,
      .right_title {
        font-family: PingFangSC-Medium;
        font-size: 18px;
        color: #0a88d8;
        letter-spacing: 0;
        line-height: 24px;
        display: inline-block;
        height: 30px;
        font-weight: normal;
      }
      .right_title {
        float: right;
        cursor: pointer;
        // margin-left: 10px;
      }
      // .right_title:hover{
      //     font-size: 19px;
      //      i{
      //          font-size: 18px !important;
      //      }
      // }
    }
    .card-content {
      > div.content {
        padding: 0 !important;
      }
      span {
        line-height: 30px !important;
        letter-spacing: 0 !important;
        color: rgba(23, 35, 61, 0.75) !important;
      }
      // color: #8daac2;
      line-height: 30px !important;
      letter-spacing: 0 !important;
      color: rgba(23, 35, 61, 0.75) !important;
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
  ::v-deep(.el-icon) {
    box-shadow: none;
  }
</style>
