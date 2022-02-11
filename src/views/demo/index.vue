<template>
  <div style="height: 600px">
    <div style="height: 100%"><map-index /></div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import MapIndex from '@/components/map/liangxiHotSvgMapCoor.vue'
  export default defineComponent({
    components: { MapIndex },
    data() {
      return {}
    }
  })
</script>
<style lang="scss">
  body {
    background-color: #0a61a7;
    width: 100%;
    height: 100%;
  }
</style>
