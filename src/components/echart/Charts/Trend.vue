<template>
  <div class="chart-trend">
    {{ term }}
    <span :class="['trend-icon', trend]"
      ><el-icon v-if="rankType" :size="size" :class="`el-icon-${trend}`"
        ><component :is="trend" /></el-icon
    ></span>
    <span>{{ rated }} <template v-if="percentage">%</template></span>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Trend',
    props: {
      term: {
        type: String,
        default: '',
        required: true
      },
      percentage: {
        type: Boolean,
        default: false
      },
      type: {
        type: Boolean,
        default: null
      },
      rankType: {
        type: Boolean,
        default: true
      },
      fixed: {
        type: Number,
        default: 2
      },
      size: {
        type: Number,
        default: 20
      },
      rate: {
        type: [String, Number]
      }
    },
    data() {
      return {
        trend: (this.type && 'caret-top') || 'caret-bottom'
      }
    },
    computed: {
      rated() {
        if (this.rate === 0) {
          return '-'
        } else {
          return this.rate
        }
      }
    },
    created() {
      this.trend = this.type ? 'caret-top' : 'caret-bottom'
      // this.rate = (this.percentage === null ? 0 : this.percentage).toFixed(this.fixed)
    }
  })
</script>

<style lang="scss" scoped>
  .chart-trend {
    display: inline-block;
    font-size: 16px;
    line-height: 22px;
    color: #fff;

    .trend-icon {
      &.caret-top,
      &.caret-bottom {
        // margin-left: 4px;
        // margin-right: 2px;
        position: relative;
        vertical-align: middle;

        i {
          transform: scale(0.83);
        }
      }

      &.caret-top {
        color: #52c41a;
      }
      &.caret-bottom {
        color: #f5222d;
        top: -1px;
      }
    }
  }
</style>
