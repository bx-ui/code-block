<template>
  <div id="container">
    <div id="map-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import mapDataGeo from './xiantao_map_geo.js'
  import mapOptions from './xiantao_map_option.js'
  import * as echarts from 'echarts'
  export type KeyWordType = {
    name: string
    id: string
    [props: string]: any
  }

  export default defineComponent({
    components: {},
    data() {
      return {
        regionsData: [],
        labelData: [],
        appleDom:
          '<span style="width:10px;height:10px;margin-right:5px;background-color:#fff94f;border-radius:50%;display:inline-block;"></span>'
      }
    },
    async mounted() {
      // 有机会在提hook，将就着吧
      // this.loadMark()
      this.initChart()
    },
    methods: {
      initChart() {
        this.formatRegionsData()
        this.chartIns = echarts.init(this.$refs['chartRef'])
        echarts.registerMap('xiantao', mapDataGeo as any)
        const option = {
          title: {
            show: false
          },
          tooltip: {
            // triggerOn: 'onmousemove',
            trigger: 'item',
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
              let str
              mapOptions.options.forEach(item => {
                if (params.name === item.name) {
                  str =
                    '规上工业增加值增速 ' +
                    item.gyzjzzs +
                    ' %<br/>' +
                    '固定资产投资增速 ' +
                    item.gdzctz +
                    ' %<br/>' +
                    '限上社消零总额增速 ' +
                    item.xssxl +
                    ' %<br/>' +
                    '规上工业企业主营业务收入 ' +
                    item.zyywsr +
                    ' 万元<br/>' +
                    '规上工业企业利润总额 ' +
                    item.lr +
                    ' 万元<br/>' +
                    '规上工业企业主税金总额 ' +
                    item.sj +
                    ' 万元<br/>' +
                    '规上工业企业主营业务收入增速 ' +
                    item.zyywzs +
                    '%'
                }
              })
              return this.appleDom + params.name + '<br/>' + str + '<br/>'
            }
          },
          geo: {
            map: 'xiantao',
            show: true,
            zoom: 1.2,
            roam: false // 鼠标缩放和平移漫游 'scale' 或者 'move' 关闭拖拽
            // center: [115.97, 29.71],
            // regions: this.regionsData, // 在地图中对特定的区域配置样式
          },
          series: [
            // {
            //   // 图表的类型为散点图（地图上的黄色旗子）
            //   type: 'scatter',
            //   // name: 'hasProperty',
            //   // 采用的坐标系为地理坐标系
            //   coordinateSystem: 'geo',
            //   // 散点图上点的大小（旗子的大小）
            //   symbolSize: 20,
            //   // 标记的图形
            //   symbol: function () {
            //     return 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAABh0lEQVQ4jdXVvWtVQRDG4SdREIJgEwuJBi3URlBEiYUWKgSDhVgrFhb5BwIWipWNvRDETkhQAmlSplACQRKIjQoWIgh+FBokGj8IiiOLc8MlnJv7wW18YWDZd+a35+zZMytCKzEZISIMtpivV3saxdZWKlpKqtMNnMc4nuNXWj/wAV86BRcdwb0G3ju8xbN2t6KZduMEHnQbXHQfc90Gr2CsDLoN3oEDnYDnm/g9uFO47YIv4TIWsIzVipxjuNrJcZvMqFI/9mOgE/BmWs7o+sdb1/8H3rjHgziX/WAfRhrUncK1bERLmMW3qq24mGf0De7iZI4b6TN+4wqm8REP84H+KcLtbOJ/IoxH2FvRuBs1+p4IQxEepb8W4ULxirmSky83uRGa3SD96ZeYqYFv1k1ORDhcUXgmwmiE7Rvmt0QYjvAk639GGCleeZWis7iO0/m/v8dTvM5x/a+7E7twEMez8axhCrfwqiTVwDUN5CJHcQh7EtSHbfie19CnXPQFFvEYX9cp+As8wAD9SbJQaQAAAABJRU5ErkJggg=='
            //   },
            //   // 区名称的样式
            //   label: {
            //     show: false,
            //     formatter: '{b}',
            //     position: 'bottom',
            //     color: '#fff',
            //     fontSize: 14
            //   },
            //   // itemStyle: {
            //   //   color: '#ddb926'
            //   // },
            //   tooltip: {
            //     show: false
            //   },
            //   data: this.labelData
            // },
            {
              // 图表类型为地图
              type: 'map',
              // 使用 registerMap 注册的地图名称
              map: 'xiantao',
              // 地图缩放比例
              zoom: 1.2,
              label: {
                // 显示地图标签
                show: true,
                color: '#fff',
                fontSize: 12
              },
              itemStyle: {
                areaColor: 'rgba(4,73,128, 1)', // #044980 地图填充色
                // 设置外层边框
                borderWidth: 2,
                borderColor: 'rgba(85,85,85, .9)', // #22D8FF 边线色 rgba(34,216,255, .9)
                shadowColor: 'rgba(34,216,255, 1)', // #044B4D 阴影色
                shadowOffsetY: 7,
                shadowOffsetX: 7,
                shadowBlur: 0,
                opacity: 1
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
                  areaColor: '#2097E1',
                  borderWidth: 2,
                  borderType: 'solid' // solid | dashed | dotted
                }
              },
              data: this.labelData
            }
          ]
        }
        this.chartIns.setOption(option)
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
