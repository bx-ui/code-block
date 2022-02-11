<template>
  <v-chart class="chart" autoresize :option="option" />
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { use } from 'echarts/core'
  import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent
  } from 'echarts/components'
  import { LineChart } from 'echarts/charts'
  import { CanvasRenderer } from 'echarts/renderers'
  import VChart, { THEME_KEY } from 'vue-echarts'
  use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer
  ])
  export default defineComponent({
    name: 'LineCard',
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
      xAxis: {
        type: Array,
        default: () => {
          return []
        }
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    setup(props) {
      const option = ref({
        title: {
          text: props.title
        },
        tooltip: {
          trigger: 'axis'
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          // formatter: "{b}: <br/> {c} ({d}%)"
        },
        legend: {
          // 图例列表配置
          // formatter: function (name: any) {
          //   let s: any = {}
          //   let a = 0
          //   props.data.forEach(function(item: any) {
          //     if (name == item.name) {
          //       s = item
          //     }
          //     a += item.value
          //   })
          //   return name + ' |  ' + (s.value/a*100).toFixed(2) + '%' + '    ' + s.value
          // },
          data: ['全部', '成功', '失败']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xAxis
        },
        yAxis: {
          type: 'value'
        },
        series: props.data
      })

      return { option }
    },
    methods: {}
  })
</script>

<style lang="scss" scoped>
  .chart {
    height: 300px;
  }
</style>
