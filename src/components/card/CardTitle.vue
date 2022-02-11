<template>
  <div class="card-wrapper">
    <Card :bordered="bordered" :padding="0" :dis-hover="disHover">
      <div class="titleBox" v-if="title != ''">
        <span class="title">{{ title }}</span>
        <Icon type="ios-arrow-forward" size="16" class="lefticon titleicon" />
        <Icon type="ios-arrow-forward" size="16" class="righticon titleicon" />
        <span class="right_title" v-if="hasHistoryData" @click="Viewhistory"
          >查看历史数据
          <Icon type="ios-arrow-forward" size="16" class="lefticon titleicon" />
          <Icon type="ios-arrow-forward" size="16" class="righticon titleicon" />
        </span>
      </div>
      <div class="card-content">
        <slot></slot>
      </div>
    </Card>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'CardTitle',
    props: {
      title: {
        type: String,
        default: ''
      },
      // padding: {
      //     type: [String, Number],
      //     default () {
      //         return 20;
      //     }
      // },
      bordered: {
        type: Boolean,
        default() {
          return false
        }
      },
      disHover: {
        type: Boolean,
        default() {
          return true
        }
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
    .ivu-card {
      // background-color: rgba(9, 48, 104, 1);
    }
    .titleBox {
      height: 56px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #5a9fc6;
      .titleicon {
        transform: rotate(180deg);
        margin-bottom: 5px;
        // color: #02CDE6;
        // position: absolute;
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
        display: inline-block;
        font-weight: normal;
      }
      .right_title {
        float: right;
        // margin-left: 10px;
      }
      .right_title:hover {
        font-size: 19px;
        cursor: pointer;
        i {
          font-size: 18px !important;
        }
      }
    }
    .card-content {
      padding: 20px;
      // >div.content {
      //     padding: 0 !important;
      // }
      // span {
      //     line-height: 30px !important;
      //     letter-spacing: 0 !important;
      //     color: rgba(23, 35, 61, 0.75) !important;
      // }
      // // color: #8daac2;
      // line-height: 30px !important;
      // letter-spacing: 0 !important;
      // color: rgba(23, 35, 61, 0.75) !important;
    }
  }
</style>
