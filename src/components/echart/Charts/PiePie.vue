<template>
  <CommonEcharts :option="options" :echartsNames="echartsName" style="width: 100%; height: 100%" />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from '../CommonEcharts.vue'
  export default defineComponent({
    components: {
      CommonEcharts
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
      }
    },
    computed: {
      options() {
        return {
          title: {
            show: false,
            text: this.title,
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
            }
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
            // data: lableFilter
          },
          series: [
            {
              name: this.title,
              type: 'pie',
              radius: this.radius,
              center: this.center,
              avoidLabelOverlap: true,
              itemStyle: {
                borderRadius: 1,
                borderWidth: 1
              },
              label: {
                position: 'center',
                fontSize: '14',
                color: '#fff',
                // formatter: '{d}%',
                formatter: function (params) {
                  // 默认显示第一个数据
                  if (params.dataIndex === 0) {
                    return params.percent + '%'
                  } else {
                    return ''
                  }
                }
              },
              labelLine: {
                show: true
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                label: {
                  show: true,
                  fontSize: '14'
                  // formatter: function (params) {
                  //   // 默认显示第一个数据
                  //   if (params.dataIndex !== 0) {
                  //     return params.percent + '%'
                  //   }
                  // }
                }
              },
              data: this.data
            }
          ]
        }
      }
    }
  })
</script>
