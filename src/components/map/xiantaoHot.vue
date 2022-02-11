<template>
  <div id="container">
    <div id="map-container"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FuncList from './functionalList'
import { enterpriseInfoList, Enterprise } from '@/api/map'
export type KeyWordType = {
  name: string
  id: string
  [props: string]: any
}

export default defineComponent({
  components: {
    FuncList
  },
  emits: ['clickMark'],
  setup(_, { emit }) {
    const keyword = ref<string>('')

    const mockList = ref<KeyWordType[]>([])

    const markTotal = ref<Enterprise[]>([])

    const mockArray = (list: Enterprise[]) => {
      const array = [...new Set(list.map(v => v.ownerIndustry))]
      return array.map((v: string) => ({
        name: v,
        id: v
      }))
    }

    const changeSelect = () => {
      const list = markTotal.value.filter(v => v.ownerIndustry === keyword.value)
      createMap(list)
    }

    const loadMark = async () => {
      const response: any = await enterpriseInfoList()
      markTotal.value = response.data
      mockList.value = mockArray(response.data)
      createMap(response.data)
    }
    const createMap = (list: Enterprise[]) => {
      var map = new BMapGL.Map('map-container', {
        minZoom: 5,
        maxZoom: 20
      })
      // map.centerAndZoom(new BMapGL.Point(113.90039, 29.72454), 11.5) // 赤壁
      map.centerAndZoom('贵阳市', 11) // 仙桃
      // map.centerAndZoom('仙桃市', 11)
      map.enableScrollWheelZoom(true) // 缩放特效

      list.forEach((item: Enterprise) => {
        const icon =
          item.enterpriseMainType === 1
            ? require('@/assets/lt-mark.png')
            : item.enterpriseMainType === 2
            ? require('@/assets/zd-mark.png')
            : require('@/assets/gs-mark.png')
        var myIcon = new BMapGL.Icon(icon, new BMapGL.Size(30, 30))
        var pt = new BMapGL.Point(item.addressLng, item.addressLat)
        var marker = new BMapGL.Marker(pt, {
          icon: myIcon
        })
        // marker.setAnimation(BMAP_ANIMATION_BOUNCE)
        const label = new BMapGL.Label(item.name, { offset: new BMapGL.Size(20, 20) })
        label.setStyle({
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, .7)',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '18px',
          display: 'none'
        })
        marker.setLabel(label)
        map.addOverlay(marker)
        marker.addEventListener('click', function () {
          console.log(item)
          emit('clickMark', item)
        })
        // const opts = {
        //   width: 200,
        //   height: 30,
        //   title: '企业名称'
        // }
        // const infoWindow = new BMapGL.InfoWindow(item.name, opts)

        marker.on('mouseover', function () {
          this.getLabel().setStyle({
            display: 'block'
          })
          // map.openInfoWindow(infoWindow, pt)
        })
        marker.addEventListener('mouseout', function () {
          this.getLabel().setStyle({
            display: 'none'
          })
          // map.closeInfoWindow(infoWindow, pt)
        })
      })

      var bd = new BMapGL.Boundary()
      // bd.get('仙桃市', function (rs) {
      //   var hole = new BMapGL.Polygon(rs.boundaries, {
      //     fillColor: '#d5e6f2', // 40a2ed // d516f2
      //     strokeColor: '#40a2ed'
      //   })
      //   map.addOverlay(hole)
      // })
      bd.get('贵阳市', function (rs) {
        var hole = new BMapGL.Polygon(rs.boundaries, {
          fillColor: '#d5e6f2', // 40a2ed // d516f2
          strokeColor: '#40a2ed'
        })
        map.addOverlay(hole)
      })
    }
    return {
      keyword,
      mockList,
      mockArray,
      changeSelect,
      loadMark
    }
  },
  async mounted() {
    // 有机会在提hook，将就着吧
    this.loadMark()
  },
  methods: {}
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
