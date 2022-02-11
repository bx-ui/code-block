<template>
  <div class="simple-number-trend" :style="{ width: width + 'px' }">
    <div class="title">{{ title }}</div>
    <div class="unit">{{ unit }}</div>
    <div class="trend" :style="{ color: _trend.isUp ? '#06B75E ' : '#FF1368' }">
      <div class="value">{{ _value }}</div>
      <el-icon
        size="20"
        :style="'color:' + (_value < 0 ? '#FF0000' : '#06B75E ')"
        style="margin: 0 3px 10px 0"
      >
        <template v-if="_value < 0"><arrow-down /></template><template v-else><arrow-up /></template
      ></el-icon>
      <span>{{ Math.abs(trend.toFixed(2) * 100) + '%' }}</span>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { ArrowUp, ArrowDown } from '@element-plus/icons'
  // import up from '@/assets/up'
  // import down from '@/assets/down'
  export default defineComponent({
    components: { ArrowUp, ArrowDown },
    props: {
      title: {
        type: String,
        default: '当年产值'
      },
      value: {
        type: [String, Number],
        default: 85500
      },
      trend: {
        type: [String, Number],
        default: 0.0056
      },
      width: {
        type: Number
      },
      unit: {
        type: String,
        default: '(万元)'
      }
    },
    computed: {
      _value() {
        return Number(this.value).toFixed(0)
      },
      _trend() {
        let v = this.trend * 100
        if (v % 1 !== 0) {
          v = v.toFixed(2)
        }
        return {
          isUp: this.trend > 0,
          text: v + '%'
        }
      }
    }
  })
</script>
<style lang="scss">
  .simple-number-trend {
    width: 100%;
    .title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: -0.6px;
      line-height: 24px;
      text-align: center;
    }
    .value {
      font-family: 'Agency FB';
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0.8px;
      line-height: 32px;
      display: inline-block;
      text-align: center;
    }
    .trend {
      display: inline-block;
      // width: 100%;
      text-align: center;
      span {
        font-family: 'Agency FB';
        font-size: 26px;
        letter-spacing: 0;
        line-height: 24px;
        padding-top: 8px;
        text-align: center;
      }
    }
    .unit {
      text-align: center;
    }
    .negative {
      transform: rotate(180deg);
    }
  }
</style>
