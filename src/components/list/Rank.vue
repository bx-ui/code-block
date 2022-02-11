<template>
  <div class="rank-wrapper">
    <div class="rank-item" v-for="(it, index) in list" :key="index" @click="clickItem(it)">
      <i class="number">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</i
      ><span class="name">{{ it['name'] }}</span>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Rank',
    props: {
      // 别名
      name: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    emits: ['clickItem'],
    data() {
      return {}
    },

    methods: {
      clickItem(it) {
        this.$emit('clickItem', it)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .rank-wrapper {
    .rank-item {
      display: flex;
      margin-top: 10px;
      cursor: pointer;
      .number {
        display: block;
        height: 24px;
        width: 20px;
        line-height: 24px;
        font-family: Roboto-Condensed;
        font-size: 16px;
        font-style: normal;
        color: rgba(23, 35, 61, 0.75);
        letter-spacing: 0;
        flex: 0 0 30px;
      }
      .name {
        font-family: PingFangSC-Regular;
        font-size: 16px;
        color: rgba(23, 35, 61, 0.75);
        letter-spacing: 0.86px;
        line-height: 24px;
        transition: color 0.1s linear;
      }
      .name:hover {
        color: rgba(23, 35, 61, 1);
      }
      &:first-child {
        .number,
        .name {
          font-size: 16px;
          color: rgba(23, 35, 61, 1);
        }
      }
    }
  }
</style>
