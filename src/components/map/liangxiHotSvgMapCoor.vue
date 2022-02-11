<template>
  <div id="container">
    <div id="map-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts">
  import mapDataGeo from './liangxi_map_geo.js'
  import mapOptions from './liangxi_map_option.js'
  import * as echarts from 'echarts'
  export type KeyWordType = {
    name: string
    id: string
    [props: string]: any
  }

  export default {
    components: {},
    data() {
      return {
        regionsData: [],
        labelData: [],
        iconDom:
          '<span style="width:10px;height:10px;margin-right:5px;background-color:#fff94f;border-radius:50%;display:inline-block;"></span>'
      }
    },
    async mounted() {
      this.initChart()
    },
    methods: {
      initChart() {
        const that = this
        this.formatRegionsData()
        this.chartIns = echarts.init(this.$refs['chartRef'])
        echarts.registerMap('liangxi', mapDataGeo as any)
        const option = {
          title: {
            show: false
          },
          tooltip: {
            triggerOn: 'onmousemove',
            trigger: 'item',
            // alwaysShowContent: true, // 提示框总是显示（不再是鼠标离开就消失）
            enterable: true, // 允许提示框被点击
            backgroundColor: 'rgba(0,0,0,.8)',
            padding: [15, 20],
            textStyle: {
              color: '#fff',
              fontSize: 16
            },
            formatter: params => {
              return this.iconDom + params.name + '<br/>'
            }
          },
          geo: {
            map: 'liangxi',
            show: true,
            zoom: 1.2,
            roam: false // 鼠标缩放和平移漫游 'scale' 或者 'move' 关闭拖拽
            // center: [115.97, 29.71],
            // regions: this.regionsData, // 在地图中对特定的区域配置样式
          },
          series: [
            {
              // 图表的类型为散点图（地图上的黄色旗子）
              // type: 'scatter',
              type: 'effectScatter',
              // name: 'hasProperty',
              // 采用的坐标系为地理坐标系
              coordinateSystem: 'geo',
              // 散点图上点的大小（旗子的大小）
              symbolSize: 10,
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
            },
            {
              type: 'map',
              map: 'liangxi',
              zoom: 1.2,
              label: {
                show: true,
                color: '#fff',
                fontSize: 12
              },
              itemStyle: {
                // areaColor: 'rgba(57,162,251, .8)', // 地图填充色
                areaColor: {
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(76,184,252,1)'
                    },
                    {
                      offset: 1,
                      color: 'rgba(23,125,249,1)'
                    }
                  ],
                  global: false
                },
                borderWidth: 0, // 设置外层边框
                borderColor: 'rgba(7,54,120, .9)', // 边线色
                shadowColor: 'rgba(7,54,120, 1)', // 阴影色
                shadowOffsetY: 9,
                shadowOffsetX: 2,
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
                  areaColor: '#4BB6FD',
                  borderWidth: 0,
                  borderType: 'solid' // solid | dashed | dotted
                }
              },
              data: this.labelData
            }
          ]
        }
        this.chartIns.setOption(option)
        this.chartIns.on('click', function (params) {
          if (params.componentSubType === 'effectScatter') {
            that.$router.push({ name: 'projectDetail', params: { id: params.data } })
          }
        })
      },
      formatRegionsData() {
        mapOptions.options.forEach(item => {
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
            name: item.name,
            value: item.value
          })
        })
      },
      resize() {
        this.chartIns && this.chartIns.resize()
      }
    }
  }
</script>

<style lang="scss" scoped>
  #container {
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    transition: all 1s ease-in-out;
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
