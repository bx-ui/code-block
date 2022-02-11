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
      title: {
        type: String,
        default: '历史数据'
      },
      yAxisName: {
        type: String,
        default: '单位(个)'
      },
      lineColor: {
        type: String,
        default: '#BFBEBE'
      },
      valueData: {
        type: Array,
        default: function () {
          return []
        }
      },
      cateData: {
        type: Array,
        default: function () {
          return []
        }
      },
      inverseX: {
        type: Boolean,
        default: true
      },
      inverseY: {
        type: Boolean,
        default: true
      },
      position: {
        type: String,
        default: 'right'
      },
      titleStyle: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {
        echartsName: null
      }
    },

    computed: {
      options() {
        let title = {}
        if (this.titleStyle === 'left') {
          title = {
            text: this.title,
            textStyle: {
              color: this.lineColor
            }
          }
        } else {
          title = {
            text: this.title,
            right: 25,
            textStyle: {
              color: this.lineColor
            }
          }
        }
        return {
          title: title,
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            show: false,
            top: '30',
            left: '0',
            right: '0',
            bottom: '-10',
            containLabel: true
          },
          legend: {
            show: false,
            textStyle: {
              color: this.lineColor
            }
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0],
            axisLine: {
              show: false
            },
            splitLine: {
              //网格线
              show: false
            },
            axisTick: {
              show: false
            },
            inverse: this.inverseX
          },
          yAxis: {
            name: '',
            type: 'category',
            data: this.cateData,
            splitLine: {
              //网格线
              show: false
            },
            axisTick: {
              show: false
            },
            nameTextStyle: {
              // 坐标轴名称样式
              color: this.lineColor
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: this.lineColor,
                fontSize: 14
              }
            },
            position: this.position,
            inverse: this.inverseY
          },
          series: [
            {
              name: '2011',
              type: 'bar',
              data: this.valueData,
              itemStyle: {
                fontSize: 16,
                color: generateBarLinearGradient(0)
              },
              areaStyle: {
                color: generateLineFillLinearGradient(0)
              },
              label: {
                show: true,
                position: 'inside',
                fontSize: 16,
                color: '#fff',
                algin: 'left',
                formatter: '{c}'
              },
              barCategoryGap: '35%'
            }
          ]
        }
      }
    }
  })
</script>
