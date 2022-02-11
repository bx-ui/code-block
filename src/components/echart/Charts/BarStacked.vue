<template>
  <v-chart
    :id="id"
    :style="style"
    class="chart"
    autoresize
    :option="option"
    :init-options="initOptions"
  />
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { use } from 'echarts/core'
  import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
  import { PieChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart, { THEME_KEY } from 'vue-echarts'
  use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer])
  export default defineComponent({
    name: 'BarStacked',
    components: {
      VChart
    },
    provide: {
      [THEME_KEY]: ''
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: ''
      },
      radius: {
        type: Array,
        default: () => {
          return ['40%', '60%']
        }
      },
      center: {
        type: Array,
        default: () => {
          return ['50%', '50%']
        }
      },
      data: {
        type: Object,
        default: () => {
          return {}
        }
      },
      style: {
        type: Object,
        default: () => {
          return { height: '250px' }
        }
      },
      legend: {
        type: Boolean,
        default: false
      },
      unit: {
        type: String,
        default: ''
      },
      lineColor: { type: String, default: 'rgb(66,73,93)' }
    },
    setup(props) {
      // const lableFilter = computed(() => {
      //   const r = [] as any
      //   props.data.forEach(function (item: any) {
      //     r.push(item.name)
      //   })
      //   return r
      // })
      const series = props.data.data.map(item => {
        return {
          name: item.name,
          type: 'bar',
          stack: props.data.stack,
          emphasis: {
            // focus: 'series'
          },
          // seriesLayoutBy: this.seriesLayoutBy,
          itemStyle: {
            // color: generateBarLinearGradient(index)
          },
          areaStyle: {
            // color: generateLineFillLinearGradient(index)
          },
          data: item.data
          // encode: {
          //   x: this.xAxisDataIndex,
          //   y: item.index
          // },
          // yAxis: {
          //   name: this.yAxisName
          // }
        }
      })

      const initOption = computed(() => {
        return document.getElementById(props.id)
      })

      const initOptions = ref({
        dom: initOption.value,
        renderer: 'canvas' // svg
      })

      const option = ref({
        title: {
          show: false,
          text: props.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis', // axis | item
          axisPointer: {
            type: 'shadow'
          }
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          // formatter: '{b}: <br/> {c}' + props.unit + ' ({d}%)'
        },
        legend: {
          // 图例列表配置
          show: props.legend,
          orient: 'horizontal', // horizontal  vertical图例列表的布局朝向
          right: '0',
          top: '10',
          // padding: [5, 10],
          // itemGap: 30,
          textStyle: {
            color: '#fff',
            fontSize: '14'
          }
        },
        grid: {
          show: false,
          left: '1%',
          right: '1%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              color: props.lineColor,
              fontSize: 16,
              interval: 0,
              rotate: 70
            },
            data: props.data.list
          }
        ],
        yAxis: [
          {
            type: 'value',
            nameTextStyle: {
              // 坐标轴名称样式
              color: props.lineColor
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: props.lineColor
              }
            }
          }
        ],
        // color: ['#6ce0e2', '#feda66', '#3ea3d8', '#3dc5e7', '#a1e5b9'],
        series
      })

      return {
        option,
        initOptions
      }
    },
    methods: {}
  })
</script>

<style lang="scss" scoped></style>
