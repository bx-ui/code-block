<template>
  <div class="qiye_homePageBox">
    <span class="title">{{ dataQiYe.name }}</span>
    <div class="cards">
      <CardOutsideLight title="企业基本信息">
        <div class="contentList">
          <div class="xinxi_flex">
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.registerCapital"
                unit="万元"
                valFontSize="18"
                ValColor="#000"
                title="注册资本"
              />
            </div>
            <div class="content_card SimpleTrend_long">
              <SimpleTrend
                :value="dataQiYe.operateGarden == '' ? '暂无数据' : dataQiYe.operateGarden"
                valFontSize="16"
                ValColor="#000"
                title="所在园区"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.operateRegion"
                valFontSize="16"
                ValColor="#000"
                title="所在区县"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.capitalType"
                valFontSize="16"
                ValColor="#000"
                title="资本类型"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.enterprisesCategory"
                valFontSize="16"
                ValColor="#000"
                title="组织类型"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.enterpriseMainType === 1 ? '否' : '是'"
                valFontSize="16"
                ValColor="#000"
                title="是否规上企业"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.linkman == '' ? '暂无联系人' : dataQiYe.linkman"
                valFontSize="16"
                ValColor="#000"
                title="企业联系人"
              />
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="dataQiYe.linkphone == '' ? '暂无联系电话' : dataQiYe.linkphone"
                valFontSize="16"
                ValColor="#000"
                title="联系电话"
              />
            </div>
          </div>
        </div>
      </CardOutsideLight>
    </div>
    <!-- <div class="cards">
      <CardOutsideLight title="创新状况">
        <div class="contentList">
          <div class="chuangxin_flex">
            <div class="content_card numall">
              <SimpleTrend
                :value="
                  rightDta.patent_appearance +
                  rightDta.patent_invent +
                  rightDta.patent_practical
                "
                unit="个"
                ValColor="#000"
                title="有效专利总数"
              ></SimpleTrend>
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="rightDta.patent_practical"
                unit="个"
                ValColor="#000"
                title="实用新型专利"
              ></SimpleTrend>
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="rightDta.patent_appearance"
                unit="个"
                ValColor="#000"
                title="外观设计专利"
              ></SimpleTrend>
            </div>
            <div class="content_card">
              <SimpleTrend
                :value="rightDta.patent_invent"
                unit="个"
                ValColor="#000"
                title="实用新型专利"
              ></SimpleTrend>
            </div>
          </div>
          <div class="chuangxincharts" style="height: 300px">
            <SimplePie
              :centerDataIndex="100"
              :data="chuangxindata"
              v-if="charts1"
            ></SimplePie>
          </div>
        </div>
      </CardOutsideLight>
    </div> -->
    <div class="cards">
      <CardOutsideLight title="产业分类">
        <div class="chanye_list">
          <div class="list_item list_item_left">
            <span class="list_title">主导产业:</span>
            <span class="list_val">{{ dataQiYe.ownerIndustry }}</span>
          </div>
          <div class="list_item list_item_right">
            <span class="list_title">国民经济行业:</span>
            <span class="list_val">{{ dataQiYe.businessName }}</span>
          </div>
        </div>
      </CardOutsideLight>
    </div>
    <div class="cards">
      <CardOutsideLight title="主营业务">
        <div class="contentList">
          <div class="list-msg">
            <span class="textMsg">{{ dataQiYe.businessRange }}</span>
          </div>
        </div>
      </CardOutsideLight>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import CardOutsideLight from '@/components/card/CardOutsideLight.vue'
  import SimpleTrend from '@/components/echart/SimpleNumberTrend.vue'
  import { EnterpriseList } from '@/api/big'
  // import bus from '@/bus/chanye-yuanqu-bus'
  export default defineComponent({
    components: { CardOutsideLight, SimpleTrend },
    props: {
      dataQiYe: {
        type: Object,
        default: {} as EnterpriseList
      }
    },
    emits: ['close'],
    data() {
      return {}
    },
    watch: {
      dataQiYe: {
        handler() {
          console.log(this.dataQiYe)
        },
        deep: true
      }
    },
    created() {
      // const that = this
      // bus.$on('init-qiye-data-all', function (data) {
      //   var datas = data.getGeoEnterpriseAll
      //   if (datas) {
      //     for (var a in datas) {
      //       that.rightDta[a] = datas[a]
      //     }
      //     that.chuangxindata = [
      //       { name: '实用新型专利', value: that.rightDta.patent_practical },
      //       { name: '外观设计专利', value: that.rightDta.patent_appearance },
      //       { name: '发明授权专利', value: that.rightDta.patent_invent }
      //     ]
      //     that.charts1 = true
      //   } else {
      //     console.log('无数据')
      //   }
      // })
    },
    methods: {
      close() {
        this.$emit('close')
      }
    }
  })
</script>
<style lang="scss">
  .chuangxincharts {
    .chart-node {
      height: 70%;
    }
    .pie-simple-wrapper {
      .legend-item {
        // flex-basis: 100px!important;
        .val {
          font-size: 20px;
          margin-right: 5px;
          font-weight: 600;
        }
      }
    }
  }
  .shouru_charts {
    height: 300px;
  }
</style>
<style lang="scss" scoped>
  .qiye_homePageBox {
    background-color: #f1f2f4;
    // width: 512px;
    height: 100%;
    overflow-x: hidden;
    padding: 30px 16px;
    .title {
      text-align: left;
      font-size: 24px;
      color: #101010;
      display: block;
      line-height: 32px;
    }
    .cards {
      margin-top: 10px;
      .contentList {
        .xinxi_flex {
          display: flex;
          flex-wrap: wrap;
          .content_card {
            width: 31%;
          }
        }
        .chuangxin_flex {
          display: flex;
          flex-wrap: wrap;
          .content_card {
            width: 125px;
          }
          .numall {
            width: 165px;
          }
        }
      }
      .chanye_list {
        display: flex;
        .list_item {
          border: 2px solid rgba(209, 210, 243, 43);
          height: 56px;
          width: 276px;
          margin: 5px;
          line-height: 56px;
          text-align: center;
          overflow: hidden;
          span {
            display: inline-block;
            color: rgba(16, 16, 16, 100);
            font-size: 18px;
          }
        }
        .list_item:hover {
          height: 112px;
        }
      }
      .content_card {
        height: 96px;
        padding: 16px 20px;
        border: 1px solid rgba(23, 35, 61, 0.1);
        border-radius: 8px;
        float: left;
        margin: 5px;
      }

      .content:after {
        content: '';
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      .msgTitle {
        display: inline-block;
        min-width: 113px;
      }
    }
  }
</style>
<style lang="scss">
  .qiye_homePageBox {
    .simple_long {
      .simple-number-trend {
        .title {
        }
      }
    }
    .xinxi_flex {
      .simple-number-trend {
        .title {
          color: #0a88d8 !important;
        }
        .box {
          .value {
            color: #000;
          }
        }
      }
    }
    .chuangxin_flex {
      .simple-number-trend {
        .title {
          color: #0a88d8 !important;
        }
      }
    }
  }
</style>
