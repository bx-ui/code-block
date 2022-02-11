<template>
  <div id="container">
    <div id="map-container"></div>
    <div class="posi-value">
      <el-select v-model="keyword" placeholder="请选择" size="small">
        <el-option v-for="item in mockList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <FuncList class="pop-list" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import FuncList from './functionalList'

export type KeyWordType = {
  name: string,
  id: number,
  [props: string]: any
}

export default defineComponent({
  components: {
    FuncList
  },
  setup () {
    
    const ak: string = "E3OWSSPQOIy8PXxPABxmewRcs0sOwlLx"

    const keyword = ref<string>('')

    const mockList = ref<KeyWordType[]>([
      { name: 'zs', id: 1 }
    ])
    
    return {
      ak,
      keyword,
      mockList
    }
  },
  mounted(){
    var map = new BMapGL.Map('map-container', {
      // enableDblclickZoom: false,
      // displayOptions: {
      //     building: false
      // },
      minZoom: 5,
      maxZoom: 20
    });
    map.centerAndZoom(new BMapGL.Point(113.90039, 29.72454), 12);
    map.enableScrollWheelZoom(true);

    var marker1 = new BMapGL.Marker(new BMapGL.Point(113.9935719572484, 29.759666975118994));
    map.addOverlay(marker1);

    var bd = new BMapGL.Boundary();
    bd.get('湖北赤壁', function (rs) {
        var hole = new BMapGL.Polygon(rs.boundaries, {
            fillColor: 'blue',
            fillOpacity: 0.2
        });
        map.addOverlay(hole);
    });
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
    z-index: 999
  }
  .pop-list {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
}
</style>