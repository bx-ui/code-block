<template>
  <div class="homePageBox">
    <div class="orientation cards">
      <CardOutside title="全市产业定位" style="width: 100%">
        <div class="content">
          <div style="display: flex; flex-wrap: wrap; justify-content: space-around">
            <div
              class="locationbox"
              v-for="(item, index) in dataAll.location[0]"
              :key="'0' + index"
              @click="chose_industry(item, index)"
            >
              <img class="locationimg" :src="item.src" alt="" />
              <span
                class="locationspan"
                :class="selectedIndustryIndex === index ? 'selected-locationspan' : ''"
                style="color: #d6e8ff"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <div
            style="display: flex; flex-wrap: wrap; margin-top: 10px; justify-content: space-around"
          >
            <div
              class="locationbox"
              v-for="(item, index) in dataAll.location[1]"
              :key="'1' + index"
              @click="chose_industry(item, (index + 4) * 2)"
            >
              <img class="locationimg" :src="item.src" alt="" />
              <span
                class="locationspan"
                :class="selectedIndustryIndex === (index + 4) * 2 ? 'selected-locationspan' : ''"
                style="color: #ecd67f"
                >{{ item.name }}</span
              >
            </div>
          </div>
        </div>
      </CardOutside>
    </div>
    <div class="scale cards">
      <CardOutside :title="title1" style="width: 100%">
        <div class="charts">
          <BarLine
            style="height: 320px"
            barDataName="出口额"
            lineDataName="增速"
            yAxis2Name="单位（%）"
            yAxis1Name="单位(万美元)"
            title=""
            lineColor="#BFBEBE"
            :data="chanzhi"
          />
        </div>
      </CardOutside>
    </div>
    <div class="enterprisesNum cards">
      <CardOutside :title="title2" style="width: 100%">
        <div class="charts">
          <Line
            style="height: 320px"
            line1DataName="增速"
            yAxisName="单位（%）"
            title=""
            lineColor="#BFBEBE"
            :data="qiyeData"
          />
        </div>
      </CardOutside>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import CardOutside from '@/components/card/CardOutside.vue'
  import SimpleNumberTrend from '@/components/echart/SimpleNumberTrend.vue'
  import BarLine from '@/components/echart/BarLine.vue'
  import BarMulti from '@/components/echart/BarMulti.vue'
  import Line from '@/components/echart/Line.vue'
  export default defineComponent({
    components: { CardOutside, SimpleNumberTrend, BarMulti, BarLine, Line },
    props: {
      dataAll: {
        type: Object
      },
      chanzhi: {
        type: Array
      },
      qiyeData: {
        type: Array
      }
    },
    emits: ['init-initial-data', 'changeIndustry'],
    data() {
      return {
        categoryIndex: 9999,
        qiyedata: [],
        industry: [],
        selectedIndustryIndex: 999
      }
    },
    computed: {
      title1() {
        return `外贸出口情况${this.time}`
      },
      title2() {
        return `固定资产投资情况${this.time}`
      },
      time() {
        // const uilt = this.$tool || {}
        // const uilt = this.$tool || {}
        // return `（${uilt.statisticsTime2}）`
        return '（2020年1-12月）'
      },
      time2() {
        // const uilt = this.$tool || {}
        // return `（${uilt.statisticsTime}）`
        return '（2020年1-12月）'
      }
    },
    watch: {
      qiyedata() {}
    },
    created() {
      // this.$on('removeInwindow', () => {
      //   this.industry = []
      // })
      // this.$on('get-initial-data', initialData => {
      //   this.qiyedata = initialData.initialData[0].sy_qiye
      //   this.chanzhi = initialData.initialData[0].sy_chanzhi
      // })
    },
    mounted() {
      this.$emit('init-initial-data')
    },
    methods: {
      chose_industry(i, index) {
        this.industry = []
        if (this.selectedIndustryIndex !== index) {
          this.selectedIndustryIndex = index
        } else {
          this.selectedIndustryIndex = 999
        }
        this.industry.push(i.name)
        this.$emit('changeIndustry', this.unique(this.industry))
      },
      //数组去重
      unique(arr) {
        return Array.from(new Set(arr))
      }
    }
  })
</script>
<style lang="scss" scoped>
  .homePageBox {
    // width: 512px;
    height: 100%;
    overflow-x: hidden;
    padding: 20px 16px;
    background-color: rgba(9, 48, 104, 1);
    // padding: 30px 16px 0 16px;
    .title {
      text-align: left;
      font-size: 20px;
      color: #17233d;
      font-weight: 550;
      line-height: 30px;
      padding-left: 10px;
    }
    .cards {
      margin-top: 10px;
      .ivu-card-body {
        padding: 16px 0;
      }
      .content_card {
        height: 96px;
        width: 48%;
        padding: 16px 20px;
        border: 1px solid rgba(23, 35, 61, 0.1);
        border-radius: 8px;
        float: left;
      }
      .content:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
    }
    .introduce {
      span {
        letter-spacing: 0.8px;
        font-size: 14px;
        // color: rgba(255, 255, 255, 0.75);
        letter-spacing: 0;
        text-align: justify;
        line-height: 22px;
      }
    }
    .orientation {
      .content {
        .locationbox {
          align-items: center;
          width: 25%;
          display: flex;
          // margin-right: 5px;
          // margin-top: 5px;
          cursor: pointer;
          color: rgba(251, 249, 249, 1);
          transition: color 0.2s linear;
          .locationimg {
            height: 30px;
            margin-top: 5px;
            margin-right: 4px;
          }
          .locationspan {
            font-size: 16px;
          }
          .selected-locationspan {
            color: #5cadff !important;
          }
        }
      }
    }
    .charts {
      width: 100%;
    }
  }
</style>
