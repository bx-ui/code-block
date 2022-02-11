<template>
  <div id="container">
    <img class="enterpriseImg" :src="imgSrc" />
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    props: {
      imgSrc: {
        type: String,
        default: ''
      }
    },
    methods: {}
  })
</script>
<style lang="scss" scoped>
  .enterpriseImg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    border-style: none;
  }
</style>
