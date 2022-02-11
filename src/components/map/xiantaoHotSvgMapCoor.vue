<template>
  <div id="container">
    <div id="map-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import mapDataGeo from './xiantao_map_geo.js'
  import mapOptionsCan from './xiantao_project_can.js'
  import mapOptionsMeeting from './xiantao_project_meeting.js'
  import * as echarts from 'echarts'
  export type KeyWordType = {
    name: string
    id: string
    [props: string]: any
  }

  export default defineComponent({
    components: {},
    props: {
      status: {
        type: Number,
        default: 0
      },
      type: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        regionsData: [],
        labelData: [],
        appleDom:
          '<span style="width:10px;height:10px;margin-right:5px;background-color:#fff94f;border-radius:50%;display:inline-block;"></span>'
      }
    },
    mounted() {
      this.chartIns = echarts.init(this.$refs['chartRef'])
      echarts.registerMap('xiantao', mapDataGeo as any)
      this.initChart(this.status, this.type)
    },
    methods: {
      initChart(status, type) {
        const that = this
        this.formatRegionsData(status, type)
        const option = {
          title: {
            show: false
          },
          tooltip: {
            triggerOn: 'onmousemove',
            trigger: 'item',
            // alwaysShowContent: true, // 提示框总是显示（不再是鼠标离开就消失）
            enterable: true, // 允许提示框被点击
            // position: `top`,
            // position: function (point, _params, _dom, _rect, size) {
            //   // 鼠标坐标和提示框位置的参考坐标系
            //   let x = 0 // x坐标位置
            //   let y = 0 // y坐标位置
            //   const pointX = point[0]
            //   const pointY = point[1]
            //   const boxHeight = size.contentSize[1]
            //   if (size.contentSize[0] > pointX) {
            //     x = 5
            //   } else {
            //     x = pointX - 10
            //   }
            //   if (boxHeight > pointY) {
            //     y = 5
            //   } else {
            //     y = pointY - boxHeight - 10
            //   }
            //   return [x, y]
            // },
            backgroundColor: 'rgba(0,0,0,.8)',
            padding: [15, 20],
            textStyle: {
              color: '#fff',
              fontSize: 16
            },
            formatter: params => {
              return this.appleDom + params.name + '<br/>'
            }
          },
          geo: {
            map: 'xiantao',
            show: true,
            zoom: 1.2,
            roam: true, // 鼠标缩放和平移漫游 'scale' 或者 'move' 关闭拖拽
            // center: [115.97, 29.71],
            // regions: this.regionsData, // 在地图中对特定的区域配置样式
            label: {
              // 显示地图标签
              show: true,
              color: '#fff',
              fontSize: 12
            },
            itemStyle: {
              // areaColor: 'rgba(4,73,128, 1)', // #044980 地图填充色
              areaColor: {
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(9,49,105,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(4,73,128,1)'
                  }
                ],
                global: false
              },
              // 设置外层边框
              borderWidth: 3,
              borderColor: 'rgba(85,85,85, .9)', // #22D8FF 边线色 rgba(34,216,255, .9)
              shadowColor: 'rgba(34,216,255, 1)', // #044B4D 阴影色
              shadowOffsetY: 7,
              shadowOffsetX: 7,
              shadowBlur: 0,
              opacity: 1,
              borderCap: 'round'
            },
            emphasis: {
              // 高亮状态下的多边形和标签样式
              focus: 'none', // 聚焦 self | none
              label: {
                show: true,
                color: '#fff', // inherit
                fontSize: 16
              },
              itemStyle: {
                areaColor: '#47B2FC',
                borderWidth: 2,
                borderType: 'solid' // solid | dashed | dotted
              }
            }
          },
          series: [
            {
              // 图表的类型为散点图（地图上的黄色旗子）
              type: 'scatter',
              // type: 'effectScatter',
              // name: 'hasProperty',
              // 采用的坐标系为地理坐标系
              coordinateSystem: 'geo',
              // 散点图上点的大小（旗子的大小）
              symbolSize: 22,
              // 标记的图形
              symbol: function () {
                return 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABh0lEQVQ4jdXVvWtVQRDG4SdREIJgEwuJBi3URlBEiYUWKgSDhVgrFhb5BwIWipWNvRDETkhQAmlSplACQRKIjQoWIgh+FBokGj8IiiOLc8MlnJv7wW18YWDZd+a35+zZMytCKzEZISIMtpivV3saxdZWKlpKqtMNnMc4nuNXWj/wAV86BRcdwb0G3ju8xbN2t6KZduMEHnQbXHQfc90Gr2CsDLoN3oEDnYDnm/g9uFO47YIv4TIWsIzVipxjuNrJcZvMqFI/9mOgE/BmWs7o+sdb1/8H3rjHgziX/WAfRhrUncK1bERLmMW3qq24mGf0De7iZI4b6TN+4wqm8REP84H+KcLtbOJ/IoxH2FvRuBs1+p4IQxEepb8W4ULxirmSky83uRGa3SD96ZeYqYFv1k1ORDhcUXgmwmiE7Rvmt0QYjvAk639GGCleeZWis7iO0/m/v8dTvM5x/a+7E7twEMez8axhCrfwqiTVwDUN5CJHcQh7EtSHbfie19CnXPQFFvEYX9cp+As8wAD9SbJQaQAAAABJRU5ErkJggg=='
              },
              // 区名称的样式
              label: {
                show: false,
                formatter: '{b}',
                position: 'bottom',
                color: '#fff',
                fontSize: 14
              },
              itemStyle: {
                color: '#ddb926'
              },
              tooltip: {
                show: true
              },
              data: this.labelData
            }
            // {
            //   // 图表类型为地图
            //   type: 'map',
            //   // 使用 registerMap 注册的地图名称
            //   map: 'xiantao',
            //   roam: true,
            //   // 地图缩放比例
            //   zoom: 1.2,
            //   label: {
            //     // 显示地图标签
            //     show: true,
            //     color: '#fff',
            //     fontSize: 12
            //   },
            //   itemStyle: {
            //     areaColor: 'rgba(4,73,128, 1)', // #044980 地图填充色
            //     // 设置外层边框
            //     borderWidth: 2,
            //     borderColor: 'rgba(85,85,85, .9)', // #22D8FF 边线色 rgba(34,216,255, .9)
            //     shadowColor: 'rgba(34,216,255, 1)', // #044B4D 阴影色
            //     shadowOffsetY: 7,
            //     shadowOffsetX: 7,
            //     shadowBlur: 0,
            //     opacity: 1
            //   },
            //   emphasis: {
            //     // 高亮状态下的多边形和标签样式
            //     focus: 'none', // 聚焦 self | none
            //     label: {
            //       show: true,
            //       color: '#fff', // inherit
            //       fontSize: 16
            //     },
            //     itemStyle: {
            //       areaColor: '#eee',
            //       borderWidth: 2,
            //       borderType: 'solid' // solid | dashed | dotted
            //     }
            //   },
            //   data: this.labelData
            // }
          ]
        }
        this.chartIns.setOption(option, true) // true 强制重新绘制 避免move后无法回复原位
        this.chartIns.on('click', function (params) {
          if (params.componentSubType === 'scatter') {
            that.$router.push({
              name: 'projectDetail',
              params: { id: params.data.id, status: that.status, type: that.type }
            })
          }
        })
      },
      formatRegionsData(status, type) {
        this.regionsData = []
        this.labelData = []
        let arr = []
        if (status == 4) {
          // 可开工
          arr = mapOptionsCan.details
        } else {
          // todo
          arr = mapOptionsMeeting.details.filter(
            item =>
              item.status == mapOptionsMeeting.status[status] &&
              item.type == mapOptionsMeeting.type[type]
          )
        }
        arr.forEach(item => {
          this.regionsData.push({
            name: item.name,
            itemStyle: {
              areaColor: item.areaColor,
              opacity: 0.9
            },
            emphasis: {
              itemStyle: {
                areaColor: item.areaColor,
                opacity: 1,
                borderColor: 'rgba(0, 210, 255, 1)' // #00d2ff
              }
            }
          })
          this.labelData.push({
            id: item.id,
            name: item.project,
            value: [item.lat, item.lng]
          })
        })
      },
      resize(status, type) {
        // this.chartIns && this.chartIns.resize()
        this.initChart(status, type)
      }
    }
  })
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    #map-container {
      width: 100%;
      height: 100%;
    }
    .posi-value {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 999;
    }
    .pop-list {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
  }
</style>
