<template>
  <div ref="chartRef"></div>
</template>
<script>
  import { defineComponent } from 'vue'
  import * as echarts from 'echarts'
  import { colors, textColor, splitLineColor } from './colors'
  export default defineComponent({
    props: {
      option: { type: Object },
      echartsNames: { type: String },
      busName: { type: String, default: '没有点击事件' }, //bus传输值
      status: { type: Boolean, default: false } //点击状态
    },
    emits: ['chose'],
    data() {
      return {}
    },
    watch: {
      option: {
        handler() {
          this.setOption(this.option)
        },
        deep: true
      }
    },
    mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        this.chartIns = echarts.init(this.$refs['chartRef'])
        this.setOption({
          textStyle: {
            color: textColor,
            fontSize: 14
          },
          title: {
            show: true,
            left: 'left',
            textStyle: {
              color: textColor,
              fontSize: 14
            }
          },
          color: colors,
          legend: {
            textStyle: {
              color: textColor
            },
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            right: 0
          },

          grid: {
            right: 0,
            left: 10,
            bottom: 10,
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 30
            }
          },
          yAxis: [
            {
              axisLabel: {
                fontFamily: 'AgencyFB-Reg'
              },
              nameTextStyle: {
                align: 'left'
              },
              splitLine: {
                lineStyle: {
                  color: splitLineColor,
                  type: 'dotted'
                }
              }
            }
          ]
        })

        this.setOption(this.option)
        const me = this
        this.chartIns.getZr().on('click', params => {
          const pointInPixel = [params.offsetX, params.offsetY]
          if (this.chartIns.containPixel('grid', pointInPixel)) {
            const xIndex = this.chartIns.convertFromPixel({ seriesIndex: 0 }, [
              params.offsetX,
              params.offsetY
            ])[0]
            me.chose(xIndex)

            if (this.status) {
              //this.status为true的话可以点击

              this.$emit(this.busName, xIndex) //this.busName，bus传输的名称
            } else {
              console.log(this.busName)
            }
          }
        })
      },
      chose(name) {
        this.$emit('chose', name)
      },
      resize() {
        this.chartIns && this.chartIns.resize()
      },
      setOption(option) {
        this.chartIns && this.chartIns.setOption(option)
      }
    }
  })
</script>
