<template>
  <CommonEcharts :option="options" style="width: 100%; height: 100%" />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from './CommonEcharts.vue'
  // import echarts from 'echarts'
  export default defineComponent({
    name: 'Line',
    components: { CommonEcharts },
    props: {
      title: { type: String, default: '历史数据' },
      line1DataName: { type: String, default: '产值' },
      line2DataName: { type: String, default: '税收' },
      yAxisName: { type: String, default: '单位(个)' },
      line1DataIndex: { type: Number, default: 1 },
      line2DataIndex: { type: Number, default: 2 },
      xAxisDataIndex: { type: Number, default: 0 },
      lineColor: { type: String, default: 'rgb(66,73,93)' },
      backgroundColor: {
        type: Array,
        default() {
          return ['#1F83F7', '#2CB3DD', '#fff']
        }
      },
      seriesLayoutBy: { type: String, default: 'row' },
      data: {
        type: Array,
        default: function () {
          return [
            [2013, 2014, 2015, 2016, 2017, 2018],
            [134, 445, 623, 832, 546, 357]
          ]
        }
      }
    },
    data() {
      return {}
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
          legend: {
            // show:false,
            textStyle: {
              color: this.lineColor
            }
          },
          xAxis: {
            name: this.yAxisName,
            boundaryGap: true, // 留白
            axisLabel: {
              show: true,
              textStyle: {
                color: this.lineColor
              }
            },
            axisLine: {
              lineStyle: {
                color: this.lineColor,
                width: 1 //这里是为了突出显示加上的
              }
            }
          },
          yAxis: {
            name: this.yAxisName,
            nameTextStyle: {
              // 坐标轴名称样式
              color: this.lineColor
            },
            splitLine: {
              show: false
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
                color: this.lineColor,
                width: 1
              }
            }
          },
          tooltip: {
            show: true
          },
          series: [
            {
              name: this.line1DataName,
              smooth: true,
              symbolSize: 8,
              color: ['#7DC2FF'],
              background: ['#000'],
              seriesLayoutBy: this.seriesLayoutBy,
              type: 'line',
              itemStyle: {
                lineStyle: {
                  //线的颜色
                  color: ['#7DC2FF']
                }
              },
              //以及在折线图每个日期点顶端显示数字
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'white'
                }
              },
              areaStyle: {
                color: '#7DC2FF'
              },
              encode: {
                x: this.xAxisDataIndex,
                y: this.line1DataIndex
              }
            }
          ]
        }
      }
    }
  })
</script>
