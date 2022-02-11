<template>
  <div class="simple-number-trend">
    <div
      class="title"
      :style="{ fontSize: titleFontSize + 'px', color: varColor }"
      v-if="title != ''"
      >{{ title }}</div
    >
    <div class="box">
      <div
        class="value"
        v-if="value != '' || value === 0"
        :style="{ color: varColor, fontSize: valFontSize + 'px' }"
        >{{ value }}<span class="unit" v-if="unit != ''">{{ unit }}</span></div
      >
      <div
        class="trend"
        v-if="trend != ''"
        :style="{ color: _trend.isUp ? '#06B75E' : '#E62D2D', fontSize: trendFontSize + 'px' }"
      >
        <img style="height: 20px" v-if="trend != 0" :src="Number(trend) > 0 ? up : down" alt="" />
        {{ _trend.text }}%
      </div>
      <div class="simple-number-trend_progress">
        <el-progress v-if="progress" type="circle" :width="90" :percentage="Number(progress)" />
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import up from '@/assets/up'
  import down from '@/assets/down'
  export default defineComponent({
    components: {},
    props: {
      title: {
        type: String,
        default: ''
      },
      valFontSize: {
        type: String,
        default: '32'
      },
      value: {
        type: [String, Number],
        default: ''
      },
      trend: {
        type: [String, Number],
        default: ''
      },
      varColor: {
        type: String,
        default: '#17233D'
      },
      trendFontSize: {
        type: String,
        default: '18'
      },
      percentage: {
        type: Boolean,
        default: false
      },
      titleFontSize: {
        type: String,
        default: '16'
      },
      unit: {
        type: String,
        default: ''
      },
      paiming: {
        type: Boolean,
        default: false
      },
      progress: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        up: up,
        down: down
      }
    },
    computed: {
      _value() {
        //   let num = this.toThousands(Number(this.value))
        return Number(this.value)
      },
      _trend() {
        let v = this.trend * 100
        if (v % 1 !== 0) {
          v = (v / 100).toFixed(2)
        }
        return {
          isUp: this.trend > 0,
          text: Math.abs(v / 100)
        }
      }
    },
    methods: {
      toThousands(num) {
        const result = [],
          counter = 0
        num = (num || 0).toString().split('')
        for (var i = num.length - 1; i >= 0; i--) {
          counter++
          result.unshift(num[i])
          if (!(counter % 3) && i != 0) {
            result.unshift(',')
          }
        }
        return result.join('')
      }
    }
  })
</script>
<style lang="scss" scoped>
  .simple-number-trend {
    width: 100%;
    .box {
      display: flex;
      width: 100%;
      .simple-number-trend_progress {
        position: relative;
        left: 100px;
        bottom: 40px;
      }
    }
    .title {
      padding: 2px 0px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: rgba(23, 35, 61, 0.75);
      letter-spacing: -0.6px;
      line-height: 24px;
      text-align: left;
      white-space: nowrap;
      margin-bottom: 15px;
    }
    .value {
      font-family: PingFangSC-Regular !important;
      color: #17233d;
      letter-spacing: -0.5px;
      line-height: 20px;
      display: inline-block;
      font-weight: 500;
      // width:100%;
    }
    .trend {
      font-size: 18px;
      letter-spacing: 0;
      line-height: 24px;
      display: inline-block;
      // padding-top: 10px;
      float: right;
      margin-left: 10px;
    }
    .unit {
      font-size: 16px;
      margin-left: 10px;
    }
    .negative {
      transform: rotate(180deg);
    }
  }
</style>
