<template>
  <v-chart class="chart" autoresize :option="option" />
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
    name: 'PieLabel',
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
      radius: {
        type: Array,
        default: () => {
          return ['20%', '40%']
        }
      },
      center: {
        type: Array,
        default: () => {
          return ['50%', '50%']
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
      const lableFilter = computed(() => {
        const r = [] as any
        props.data.forEach(function (item: any) {
          r.push(item.name)
        })
        return r
      })

      const option = ref({
        title: {
          show: false,
          text: props.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item', // axis
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: '{b}: <br/> {c} ({d}%)'
        },
        legend: {
          // 图例列表配置
          show: false,
          orient: 'horizontal', // horizontal  vertical图例列表的布局朝向
          top: 'top',
          // padding: [5, 10],
          // itemGap: 30,
          textStyle: {
            color: '#000',
            fontSize: '14'
          },
          // formatter: function (name: any) {
          //   let s: any = {}
          //   let a = 0
          //   props.data.forEach(function (item: any) {
          //     if (name == item.name) {
          //       s = item
          //     }
          //     a += item.value
          //   })
          //   return name + ' |  ' + ((s.value / a) * 100).toFixed(2) + '%' + '    ' + s.value
          // },
          data: lableFilter
        },
        series: [
          {
            name: props.title,
            type: 'pie',
            radius: props.radius,
            center: props.center,
            avoidLabelOverlap: true,
            // roseType: 'radius',
            label: {
              show: true,
              position: 'outside',
              fontSize: '14',
              textShadowBlur: 0,
              color: '#fff'
              // formatter: '{b}{c}: {d}',
              // padding: [3, 4, 5, 6]
            },
            labelLine: {
              show: true,
              showAbove: true,
              // lineStyle: {
              //   color: 'rgba(255, 255, 255, 0.3)'
              // },
              smooth: 0.2,
              length: 5,
              length2: 10
            },
            color: ['#6ce0e2', '#feda66', '#a1e5b9', '#3dc5e7', '#3ea3d8'],
            // itemStyle: {
            //   color: '#c23531',
            //   shadowBlur: 200,
            //   shadowColor: 'rgba(0, 0, 0, 0.5)'
            // },
            emphasis: {
              itemStyle: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: true,
                fontSize: '14',
                fontWeight: '500'
              }
            },
            data: props.data
          }
        ]
      })

      return { option }
    },
    methods: {}
  })
</script>

<style lang="scss" scoped>
  .chart {
    height: 250px;
  }
</style>
