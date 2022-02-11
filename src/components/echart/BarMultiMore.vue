<template>
  <CommonEcharts
    :option="options"
    :echartsNames="echartsName"
    :status="status"
    style="width: 100%; height: 100%"
  />
</template>

<script>
  import { defineComponent } from 'vue'
  import CommonEcharts from './CommonEcharts.vue'
  import { generateBarLinearGradient } from './colors'
  export default defineComponent({
    components: {
      CommonEcharts
    },
    props: {
      title: {
        type: String,
        default: '历史数据'
      },
      status: {
        //是否可以点击
        type: Boolean,
        default: false
      },
      barDataName: {
        type: String,
        default: '企业个数'
      },
      yAxisName: {
        type: String,
        default: '单位(个)'
      },
      echartsName: {
        type: String,
        default: '园区规上企业数量'
      },
      lineColor: {
        type: String,
        default: '#c5c8ce'
      },
      barWidth: {
        type: Number,
        default: 20
      },
      data: {
        type: Array,
        default: function () {
          return [
            [2016, 2017, 2018, 2019, 2020],
            [234, 345, 123, 432, 546]
          ]
        }
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
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: this.data[0],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#c5c8ce',
                width: 1 //这里是为了突出显示加上的
              }
            },
            axisLabel: {
              show: true,
              interval: 0,
              rotate: 70,
              textStyle: {
                color: this.lineColor
              }
            }
          },
          splitLine: {
            show: false
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
            axisLine: {
              show: false,
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
          tooltip: {
            // show:false,
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
          },
          legend: {
            show: true,
            textStyle: {
              //图例文字的样式
              color: this.lineColor,
              fontSize: 16
            }
          },
          series: [
            {
              name: this.barDataName,
              data: this.data[1],
              type: 'bar',
              label: {
                show: false, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: this.lineColor,
                  fontSize: 16
                }
              },
              itemStyle: {
                color: params => {
                  if (params.name === '仙桃市') {
                    return generateBarLinearGradient(1)
                  } else {
                    return generateBarLinearGradient(0)
                  }
                }
              },
              barWidth: this.barWidth
            }
          ]
        }
      }
    }
  })
</script>
