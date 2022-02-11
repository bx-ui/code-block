<template>
  <div class="industry-summary">
    <div style="margin-bottom: 15px; float: right">
      <!-- <i-button type="primary">产业分析</i-button> -->
      <!-- <i-button style="margin-left:5px;cursor:pointer" @click="showIndustryChain">产业链全景图</i-button> -->
      <!-- <IndustryChain
        ref="industryChain"
        v-show="showChain"
        @close="showChain = false"
      ></IndustryChain> -->
    </div>
    <div class="main-title">仙桃市六大主导产业概况</div>
    <CardOutsideLight title="简介" style="margin-top: 18px; width: 100%">
      <div style="font-size: 16px; line-height: 30px">{{ summary }}</div>
    </CardOutsideLight>
    <div class="card-group">
      <CardOutsideLight class="card-chart" title="六大产业产值">
        <div class="shuishou">
          <div class="content">
            <div class="content_card">
              <SimpleTrend
                :value="panorama.currentValue"
                :trend="panorama.currentMonthPercentage"
                title="当月产值（亿元）"
              />
            </div>
            <div class="content_card" style="margin-left: 2%">
              <SimpleTrend
                :value="panorama.thisYearValue"
                :trend="panorama.cumulativePercentage"
                title="累计产值（亿元）"
              />
            </div>
          </div>
        </div>
      </CardOutsideLight>
    </div>
    <div class="card-group">
      <CardOutsideLight title="六大产业企业数量">
        <div class="shuishou" style="margin: 15px; height: 100%">
          <BarMulti
            style="height: 250px; width: 100%; margin: 15px 0px; padding: 0px 10px"
            yAxis1Name="单位（家）"
            yAxis2Name="单位（%）"
            lineDataName="同比增速"
            :barDataInfo="[
              { index: 1, name: '数据1' },
              { index: 2, name: '数据2' }
            ]"
            lineColor="#515a6e"
            :data="zhudaodata"
          />
        </div>
      </CardOutsideLight>
    </div>
    <div class="card-group">
      <CardOutsideLight title="六大产业主营业务收入">
        <div class="shuishou" style="margin: 0px; height: 100%">
          <BarLine
            style="height: 250px; width: 100%; margin: 15px 0px; padding: 0px 10px"
            yAxis1Name="单位（万元）"
            yAxis2Name="单位（%）"
            linePosition="top"
            :label1="{ show: true, position: 'top', color: '#333' }"
            :label2="{ show: true, position: 'bottom', color: '#333' }"
            :data="chanzhidata"
          />
        </div>
      </CardOutsideLight>
    </div>
    <!-- <div class="card-group">
            <CardOutsideLight class="LT_table" title="七大主导产业龙头企业列表">
                <TabHeader :tabs="topEnterpriseTabs" @tabChanged="tabChanged"></TabHeader>
                <TableSort :titleList='companyTable.titleList' :valueList="top_enterprise_table" @clickRow="clickCompany"></TableSort>
            </CardOutsideLight>
        </div> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CardOutsideLight from '@/components/card/CardOutsideLight.vue'
  import SimpleTrend from '@/components/echart/SimpleNumberTrend.vue'
  import BarMulti from '@/components/echart/BarMulti.vue'
  import BarLine from '@/components/echart/BarLine.vue'
  import { Panorama } from '@/api/big'
  export default defineComponent({
    components: {
      CardOutsideLight,
      SimpleTrend,
      BarMulti,
      BarLine
    },
    props: {
      panorama: {
        type: Object,
        default: {} as Panorama
      },
      zhudaodata: {
        type: Array
      },
      chanzhidata: {
        type: Array
      }
    },
    emits: ['init-initial-data', 'init-company-detail'],
    data() {
      return {
        // 简介
        summary: '',
        tax: {},
        taxChart: [],
        trend: {},
        trendChart: [],
        enterprise_table: [],
        top_enterprise_table: [],
        currentIndustry_name: '电子信息',
        showChain: false,
        companyTable: {
          titleList: [
            {
              label: '排序',
              row: 2,
              key: 'index'
            },
            {
              label: '企业名称',
              row: 12,
              key: '1'
            },
            {
              label: '所属行业',
              row: 6,
              key: 2
            }
          ],
          cy_chanzhi: {
            Month: {
              Num: 0,
              Rate: 0
            },
            Year: {
              Num: 0,
              Rate: 0
            }
          }
        }
      }
    },
    mounted() {
      // this.update()
      this.$emit('init-initial-data')
    },
    created() {
      // syBus.$on('get-initial-data', initialData => {
      //   this.chanzhidata = initialData.initialData[2].cy_shouru
      //   this.zhudaodata = initialData.initialData[2].cy_qiye
      // })
    },
    methods: {
      // update() {
      //   api.get_beihai_industry_summary_json().then(resp => {
      //     this.summary = resp.summary
      //   })

      //   api.get_beihai_industry_tax_json().then(resp => {
      //     this.tax = resp
      //   })

      //   api.get_beihai_industry_tax_table().then(resp => {
      //     this.taxChart = resp
      //   })

      //   api.get_beihai_industry_trend_json().then(resp => {
      //     this.trend = resp
      //   })

      //   api.get_beihai_industry_trend_table().then(resp => {
      //     const trendChart = resp
      //     trendChart[0] = trendChart[0].slice(trendChart[0].length - 10, trendChart[0].length)
      //     trendChart[1] = trendChart[1].slice(trendChart[1].length - 10, trendChart[1].length)
      //     this.trendChart = resp
      //   })

      //   api.get_beihai_industry_enterprise_table().then(resp => {
      //     this.enterprise_table = resp
      //   })

      //   this.update_top_enterprise_table()
      // },

      // tabChanged(item) {
      //   this.currentIndustry_name = item.value
      //   this.update_top_enterprise_table()
      // },

      // update_top_enterprise_table() {
      //   api.get_beihai_industry_top_enterprise_table(this.currentIndustry_name).then(resp => {
      //     this.top_enterprise_table = resp
      //   })
      // },

      showIndustryChain() {
        this.showChain = true
        this.$refs.industryChain.toBegin()
      },

      clickCompany(company: any) {
        this.$emit('init-company-detail', company)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .industry-summary {
    padding: 32px;
    padding-top: 40px;
    overflow-y: auto;

    .block {
      width: 100%;
    }

    .qushi {
      .shuishou-top {
        grid-template-columns: 100%;
      }
    }

    .main-title {
      text-align: left;
      font-size: 20px;
      color: #17233d;
      font-weight: 550;
      line-height: 30px;
      padding-left: 10px;
      margin-bottom: 30px;
    }

    .card-group {
      margin-top: 18px;
    }

    .card-chart {
      flex-grow: 1;
    }

    .shuishou {
      display: flex;
      flex-direction: column;

      /* height: 380px;*/
      .content_card {
        height: 96px;
        width: 49%;
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

    .shuishou-top {
      display: grid;
      // grid-template-columns: 49% 2% 49%;
      grid-template-columns: 50% 50%;
      flex-basis: 104px;
      flex-grow: 0;
    }

    .shuishou-chart {
      flex-grow: 1;
      margin-top: 32px;
    }

    .split {
      width: 100%;
      background: red;
      height: 1px;
    }

    .LT_table {
      .ivu-col-span-2 {
        display: block;
        width: 10.333333%;
      }

      .ivu-col-span-12 {
        display: block;
        width: 50%;
        height: 40px;
        overflow: hidden;
      }
    }

    .Dividing {
      height: 100%;
      width: 0px;
      border-left: 1px solid #2185f0;
      opacity: 0.25;
      display: inline-block;
      margin-left: 2px;
    }
  }
</style>
