<template>
  <CommonEcharts :option="options" style="width: 100%; height: 100%" />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from './CommonEcharts.vue'
  import { generateBarLinearGradient, generateLineFillLinearGradient } from './colors'
  export default defineComponent({
    components: {
      CommonEcharts
    },
    props: {
      title: {
        type: String,
        default: '历史数据'
      },
      barDataName: {
        type: String,
        default: '产值'
      },
      lineDataName: {
        type: String,
        default: '增速'
      },
      barDataColumnIndex: {
        type: Number,
        default: 1
      },
      lineDataColumnIndex: {
        type: Number,
        default: 2
      },
      xAxisDataIndex: {
        type: Number,
        default: 0
      },
      yAxis1Name: {
        type: String,
        default: '单位(个)'
      },
      yAxis2Name: {
        type: String,
        default: '单位(万)'
      },
      seriesLayoutBy: {
        type: String,
        default: 'row'
      },
      linePosition: {
        type: String,
        default: 'bottom'
      },
      lineColor: {
        type: String,
        default: '#515a6e'
      },
      barWidth: {
        type: Number,
        default: 20
      },
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
        return {
          title: {
            text: this.title,
            textStyle: {
              color: '#fff'
            }
          },
          dataset: {
            // source: Object.freeze(this.data)
            source: this.data
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                lineStyle: {
                  color: '#c5c8ce',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: this.lineColor
                }
              }
            }
          ],
          // xAxis: {
          //     type: 'category',
          //     //设置坐标轴字体颜色和宽度
          //     axisLine: {  //这是x轴文字颜色
          //         lineStyle: {
          //             color: "#fff",
          //         }
          //     }
          // },
          legend: {
            // show:false,
            textStyle: {
              color: this.lineColor
            }
          },
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: this.yAxis1Name,
              splitLine: {
                show: false
              },
              nameTextStyle: {
                // 坐标轴名称样式
                color: this.lineColor
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#c5c8ce',
                  width: 1 //这里是为了突出显示加上的
                }
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: this.lineColor
                }
              }
            },
            {
              type: 'value',
              show: true,
              scale: false,
              name: this.yAxis2Name,
              // min:0,
              splitLine: {
                show: false
              },
              nameTextStyle: {
                // 坐标轴名称样式
                color: this.lineColor
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: this.lineColor
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: '#c5c8ce',
                  width: 1 //这里是为了突出显示加上的
                }
              }
            }
          ],
          series: [
            {
              name: this.barDataName,
              seriesLayoutBy: this.seriesLayoutBy,
              type: 'bar',
              itemStyle: {
                color: generateBarLinearGradient(0)
              },
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: '#02CDE6',
                  fontSize: 16
                }
              },
              barWidth: this.barWidth,
              areaStyle: {
                color: generateLineFillLinearGradient(0)
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.barDataColumnIndex
              }
            },

            {
              name: this.lineDataName,
              seriesLayoutBy: this.seriesLayoutBy,
              type: 'line',
              symbol: 'circle',
              symbolSize: 8,
              yAxisIndex: 1,
              smooth: false,
              // itemStyle: {
              // },
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                lineStyle: {
                  width: 2,
                  type: 'dotted' //'dotted'虚线 'solid'实线 'dashed'小线段
                }
              },
              label: {
                show: false, //开启显示
                position: this.linePosition, //在上方显示
                textStyle: {
                  //数值样式
                  color: '#E6ab4d',
                  fontSize: 16
                }
              },
              color: ['orange'],
              areaStyle: {
                color: generateLineFillLinearGradient(0)
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.lineDataColumnIndex
              }
            }
          ]
        }
      }
    }
  })
</script>
