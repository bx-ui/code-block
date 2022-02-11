<template>
  <div class="plateBox">
    <div class="plateTitle">
      <span>{{ list.plateName }}</span>
    </div>
    <div class="bottom">
      <ul>
        <li v-for="(item, index) in list.listContent" :key="index">
          <span class="title">{{ item.title }}</span>
          <span :title="item.msg" class="msg">{{ item.msg }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import { list } from '@/components/demoData.js'
  export default defineComponent({
    props: {
      list: {
        type: Object,
        default() {
          return list
        }
      }
    },
    data() {
      return {}
    }
  })
</script>
<style lang="scss" scoped>
  .plateBox {
    background: #0a0a32;
    border: 1px solid #038af8;
    width: 1220px;
    height: 200px;
    border-top: 3px solid #038af8;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.5);
    padding-left: 15px;
    .plateTitle {
      span {
        line-height: 65px;
        font-size: 18px;
        color: #e6f2ff;
      }
    }
    .bottom {
      height: 120px;
      width: 1190px;
      background: rgba(13, 144, 251, 0.1);
      ul {
        li {
          .title {
            font-size: 14px;
            color: #038cfb;
            letter-spacing: 1px;
            line-height: 37px;
            display: inline-block;
            width: 90px;
            height: 24px;
            text-align: center;
          }
          .msg {
            font-size: 14px;
            color: #ffffff;
            letter-spacing: 1px;
            max-width: 200px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            display: inline-block;
            height: 24px;
            line-height: 37px;
          }
        }
      }
    }
  }
  li {
    list-style: none;
    display: inline-block;
    width: 395px;
    line-height: 40px;
  }
</style>
