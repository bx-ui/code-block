<template>
  <div class="list" :style="style" @click="toLink">
    <i class="icon">
      <img :src="img" alt="" />
    </i>
    <span class="title">
      <h2 class="tit">{{ title }}</h2>
      <p class="eng">{{ engTitle }}</p>
    </span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Menu',
    props: {
      title: {
        type: String,
        default: ''
      },
      engTitle: {
        type: String,
        default: ''
      },
      style: {
        type: Object,
        default() {
          return {}
        }
      },
      outLink: {
        type: Boolean,
        default: false
      },
      link: {
        type: String,
        default: ''
      },
      img: {
        type: String,
        default: ''
      },
      sumMenu: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      toLink() {
        if (this.link === '') {
          return false
        }
        if (this.outLink) {
          window.location.href = this.link
        } else {
          this.$router.push({ name: this.link })
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  .list {
    position: relative;
    z-index: 999;
    width: 320px;
    height: 80px;
    cursor: pointer;
    display: flex;
    margin-top: 60px;
    background: url('../../assets/navigation.png') no-repeat 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;

    .icon {
      display: block;
      width: 40px;
      height: 40px;
      line-height: 80px;
      padding-top: 15px;
      margin-left: 20px;
      img {
        width: 100%;
      }
    }
    .title {
      cursor: pointer;
      padding-top: 20px;
      display: inline-block;
      width: 200px;
      height: 80px;
      color: #fff;
      margin-left: 10px;
      .tit {
        font-weight: 700;
        font-size: 20px;
      }
      .eng {
        margin-top: 5px;
        font-size: 12px;
      }
    }
  }
</style>
