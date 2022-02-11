<template>
  <el-card
    shadow="hover"
    :body-style="{ padding: '15px 10px', textAlign: 'center', borderTop: `5px solid ${color}` }"
    :bordered="false"
  >
    <div class="title">{{ title }}</div>
    <div class="total">
      {{ total }}
    </div>
    <div>
      <span class="des">{{ unit }}</span>
      <span :class="['trend-icon', trend]">
        <el-icon :size="size" :class="`el-icon-${trend}`"><component :is="trend" /></el-icon>
      </span>
    </div>
  </el-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'WordCard',
    props: {
      title: {
        type: String,
        default: ''
      },
      total: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: '#000'
      },
      unit: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 20
      },
      type: {
        type: Boolean,
        default: null
      }
    },
    data() {
      return {
        trend: (this.type && 'top') || 'bottom'
      }
    },
    created() {
      this.trend = this.type ? 'top' : 'bottom'
    },
    methods: {}
  })
</script>
<style lang="scss" scoped>
  .title {
    font-size: 16px;
    height: 30px;
  }
  .total {
    color: rgba(0, 0, 0, 0.85);
    font-size: 26px;
  }
  .des {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
  }
  .trend-icon {
    display: inline-block;
    &.top,
    &.bottom {
      // margin-left: 4px;
      // margin-right: 2px;
      position: relative;
      vertical-align: middle;

      i {
        transform: scale(0.83);
      }
    }

    &.top {
      color: #52c41a;
      top: 4px;
    }
    &.bottom {
      color: #f5222d;
      top: -1px;
    }
  }
</style>
