<template>
  <CommonEcharts :option="options" style="width: 100%; height: 100%" />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from './CommonEcharts.vue'
  import { generateBarLinearGradient, generateLineFillLinearGradient } from './colors'
  export default defineComponent({
    components: { CommonEcharts },
    props: {
      title: { type: String, default: '历史数据' },
      yAxisName: { type: String, default: '单位(个)' },
      barDataInfo: {
        type: Array,
        default: () => {
          return [
            { index: 1, name: '数据1' },
            { index: 1, name: '数据2' },
            { index: 3, name: '数据3' }
          ]
        }
      },
      xAxisDataIndex: { type: Number, default: 0 },
      seriesLayoutBy: { type: String, default: 'row' },
      data: {
        type: Array,
        default: function () {
          return [
            [2013, 2014, 2015, 2016, 2017, 2018],
            [234, 345, 123, 432, 546, 657],
            [134, 445, 623, 832, 546, 357],
            [434, 345, 223, 532, 246, 457]
          ]
        }
      }
    },
    data() {
      return {
        echartsName: null
      }
    },

    computed: {
      options() {
        const series = this.barDataInfo.map((item, index) => {
          return {
            name: item.name,
            type: 'bar',
            seriesLayoutBy: this.seriesLayoutBy,
            itemStyle: {
              color: generateBarLinearGradient(index)
            },
            areaStyle: {
              color: generateLineFillLinearGradient(index)
            },
            encode: {
              x: this.xAxisDataIndex,
              y: item.index
            },
            yAxis: {
              name: this.yAxisName
            }
          }
        })
        return {
          title: {
            text: this.title
          },
          dataset: {
            source: this.data
          },
          yAxis: {
            name: this.yAxisName
          },
          series
        }
      }
    }
  })
</script>
