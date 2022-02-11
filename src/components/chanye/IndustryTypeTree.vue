<template>
  <div class="industry-type-tree-wrapper">
    <div
      class="circle-item"
      v-for="(item, index) of types"
      :key="item.name"
      @click="clickType(item)"
      :style="{ left: positions[index][0] + '%', top: positions[index][1] + '%' }"
    >
      <span>
        {{ item.name }}
        <p>共{{ item.num }}家企业</p>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  // import eventBus from '../../../bus/chanye-buju-bus'
  export default defineComponent({
    emits: ['select-type'],
    data() {
      return {
        positions: [
          [47, 10],
          [55, 30],
          [42, 27],
          [25, 36],
          [70, 38],
          [67, 15],
          [29, 7],
          [31, 21],
          [36, 38],
          [76, 26],
          [59, 3]
        ],
        types: [
          {
            name: '智能装备制造',
            num: '30'
          },
          {
            name: '电子信息',
            num: '125'
          },
          {
            name: '新能源新材料',
            num: '98'
          },
          {
            name: '非织造布',
            num: '35'
          },
          {
            name: '食品加工',
            num: '56'
          },
          {
            name: '文化旅游现代服务',
            num: '56'
          }
        ]
      }
    },
    created() {
      // eventBus.$on('industry-type-all-data', data => {
      //   this.types.forEach(item => {
      //     if (item.name === data.industry_name) {
      //       item.num = data.geo_industry.length
      //     }
      //   })
      // })
    },
    mounted() {
      // this.initdata()
    },
    methods: {
      clickType(item) {
        console.log(item)
        this.$emit('select-type', item.name)
      }
      // initdata() {
      //   this.types.forEach(item => {
      //     eventBus.$emit('init-industry-type-all', item.name)
      //   })
      // }
    }
  })
</script>
<style lang="scss">
  .industry-type-tree-wrapper {
    height: 100%;
    background: url('../../assets/tree.jpg') no-repeat;
    background-size: 100% 100%;
    position: relative;

    .circle-item {
      width: 130px;
      height: 130px;
      position: absolute;
      border-radius: 50%;
      text-align: center;
      vertical-align: middle;
      background-image: radial-gradient(to 30% 82%, #ffffff 17%, #daecff 41%, #a8d2ff 91%);
      background: #ffffff;
      border: 5px solid #2185f0;
      box-shadow: 8px 8px 17px 0 rgba(0, 63, 157, 0.5), inset -2px -2px 6px 0 #edf6ff;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      font-weight: bold;
      color: rgba(23, 35, 61, 0.85);
      letter-spacing: 0;
      text-align: center;
      cursor: pointer;

      span {
        display: inline-block;
        width: 80%;
        line-height: 20px;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      p {
        line-height: 18px;
        font-size: 12px;
        display: inline-block;
        width: 100%;
        color: #808695;
        margin-top: 10px;
      }
    }

    .circle-item:hover {
      border-color: #06b75e;
      color: #06b75e;
    }
  }
</style>
