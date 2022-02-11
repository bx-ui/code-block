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
    name: 'Pie',
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
      position: {
        type: String,
        default: 'center'
      },
      data: {
        type: Array,
        default: () => {
          return []
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
      showLabel: {
        type: Boolean,
        default: true
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
          trigger: 'item', // axis
          // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
          formatter: '{b}: <br/> {c}' + props.unit + ' ({d}%)'
        },
        legend: {
          // 图例列表配置
          show: props.legend,
          orient: 'horizontal', // horizontal  vertical图例列表的布局朝向
          top: 'bottom',
          // padding: [5, 10],
          // itemGap: 30,
          textStyle: {
            color: '#fff',
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
        color: ['#6ce0e2', '#feda66', '#3ea3d8', '#3dc5e7', '#a1e5b9'],
        series: [
          {
            name: props.title,
            type: 'pie',
            radius: props.radius,
            center: props.center,
            avoidLabelOverlap: true,
            itemStyle: {
              borderRadius: 1,
              borderWidth: 1
            },
            label: {
              show: props.showLabel,
              position: props.position,
              fontSize: '14',
              color: '#fff',
              formatter: '{d}%'
              // formatter: function (params) {
              //   // 默认显示第一个数据
              //   if (params.dataIndex === 0) {
              //     return params.percent + '%'
              //   } else {
              //     return ''
              //   }
              // }
            },
            labelLine: {
              show: false
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: props.data
          }
        ]
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
