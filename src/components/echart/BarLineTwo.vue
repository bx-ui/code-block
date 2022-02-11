<template>
  <CommonEcharts :option="options" style="width: 100%; height: 100%" />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from './CommonEcharts.vue'
  import { colors, generateBarLinearGradient, generateLineFillLinearGradient } from './colors'
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
        default: '规上工业产值'
      },
      line1DataName: {
        type: String,
        default: '规上工业产值增速(%)'
      },
      line2DataName: {
        type: String,
        default: '规上工业增加值增速(%)'
      },
      barDataColumnIndex: {
        type: Number,
        default: 1
      },
      line1DataColumnIndex: {
        type: Number,
        default: 0
      },
      line2DataColumnIndex: {
        type: Number,
        default: 1
      },
      xAxisDataIndex: {
        type: Number,
        default: 0
      },
      yAxis1Name: {
        type: String,
        default: '单位(亿元)'
      },
      yAxis2Name: {
        type: String,
        default: '单位(%)'
      },
      seriesLayoutBy: {
        type: String,
        default: 'row'
      },
      lineColor: {
        type: String,
        default: '#515a6e'
      },
      data: {
        type: Array,
        default: function () {
          return [
            [2013, 2014, 2015, 2016, 2017, 2018],
            [234, 345, 439, 432, 546, 657],
            [14, 12, 40, 23, 33, 15],
            [87, 73, 50, 34, 62, 42]
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
            source: this.data
          },
          tooltip: {
            // show:false,
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          barWidth: 60,
          grid: {
            containLabel: true
          },
          legend: {
            // show:false,
            textStyle: {
              color: this.lineColor
            }
          },
          xAxis: [
            {
              type: 'category',
              axisLine: {
                show: true,
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
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: this.yAxis1Name,
              min: 0,
              // max: 'dataMax',
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
              splitLine: {
                show: true,
                lineStyle: {
                  color: this.lineColor
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
              scale: true,
              name: this.yAxis2Name,
              min: 'dataMin',
              // max: 'dataMax',
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
              splitLine: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: this.lineColor
                },
                formatter: '{value} %'
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
                  color: generateBarLinearGradient(0),
                  fontSize: 16
                }
              },
              areaStyle: {
                color: generateLineFillLinearGradient(0)
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.barDataColumnIndex
              }
            },
            {
              name: this.line1DataName,
              seriesLayoutBy: this.seriesLayoutBy,
              type: 'line',
              yAxisIndex: 1,
              symbol: 'circle',
              symbolSize: 8,
              // smooth: true,
              itemStyle: {
                color: colors[1]
              },
              label: {
                show: false, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: colors[1],
                  fontSize: 16
                }
              },
              areaStyle: {
                color: generateLineFillLinearGradient(1)
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.line1DataColumnIndex
              }
            },
            {
              name: this.line2DataName,
              seriesLayoutBy: this.seriesLayoutBy,
              type: 'line',
              yAxisIndex: 1,
              symbol: 'circle',
              symbolSize: 8,
              // smooth: true,
              itemStyle: {
                color: colors[2]
              },
              label: {
                show: false, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: colors[2],
                  fontSize: 16
                }
              },
              areaStyle: {
                color: generateLineFillLinearGradient(2)
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.line2DataColumnIndex
              }
            }
          ]
        }
      }
    }
  })
</script>
