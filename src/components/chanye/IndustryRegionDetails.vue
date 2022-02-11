<template>
  <div class="industry-region-detail">
    <div class="main-title">{{ regionName }}{{ industryName }}概况</div>
    <CardOutsideLight title="主导产业简介" style="margin-top: 18px">
      <div style="margin: 15px">{{ detail.industryProfile }}</div>
    </CardOutsideLight>
    <div class="card-group">
      <CardOutsideLight title="主导产业产值规模" style="margin-top: 18px">
        <BarMultiLine
          style="height: 309px; padding: 15px"
          :data="chanZhiGuiMo"
          title="2021年1-10月产值"
          yAxisName="单位(亿)"
          :barDataInfo="[{ index: 1, name: '产值' }]"
        />
      </CardOutsideLight>
      <!-- <CardOutsideLight title="主导产业企业数量" style="margin-top: 18px">
        <div class="content">
          <div class="content_card">
            <SimpleTrend value="34" title="当年归上企业个数(个)" />
          </div>
          <div class="content_card" style="margin-left: 2%">
            <SimpleTrend value="10" title="当年规下重点培育企业个数(个)" />
          </div>
        </div>
      </CardOutsideLight> -->
    </div>
    <div class="card-group">
      <CardOutsideLight title="重点企业" style="margin-top: 18px">
        <Rank :list="bigEnterpriseList" name="1" @clickItem="clickCompany" style="padding: 15px" />
      </CardOutsideLight>
      <CardOutsideLight title="在建重点项目" style="margin-top: 18px">
        <Rank :list="bigProjectList" name="1" @clickItem="clickCompany" style="padding: 15px" />
      </CardOutsideLight>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import SimpleTrend from '@/components/echart/SimpleNumberTrend.vue'
  import CardOutsideLight from '@/components/card/CardOutsideLight.vue'
  import BarMultiLine from '@/components/echart/BarMultiLine.vue'
  import Rank from '@/components/list/Rank.vue'
  import { IndustrialPanoramaDetails, KeyEnterprises, KeyProjects } from '@/api/big'
  // import * as api from '../../../api/buju'
  export default defineComponent({
    components: {
      SimpleTrend,
      CardOutsideLight,
      BarMultiLine,
      Rank
    },
    props: {
      regionName: {
        type: String,
        defaule: ''
      },
      industryName: {
        type: String,
        default: ''
      },
      detail: {
        type: Object,
        default: {} as IndustrialPanoramaDetails
      }
    },
    emits: ['clickCompany'],
    data() {
      return {
        chanZhiGuiMo: [],
        bigEnterpriseList: [],
        bigProjectList: [],
        beihai_industry_detail_tax_table: [],
        beihai_industry_detail_enterprise_table: [],
        beihai_industry_detail_top_enterprise_list: [],
        largeScalecompanyTable: [{ label: '东营会展中心配套酒店项目' }],
        headCompanyTable: [{ label: '东营会展中心配套酒店项目' }]
      }
    },
    watch: {
      regionName: {
        handler() {
          // this.update()
        },
        immediate: true
      },
      detail: {
        handler() {
          this.update()
        }
      }

      // industry_name:{
      //   handler(){
      //     this.update();
      //   },
      //   immediate:true
      // },
    },
    methods: {
      update() {
        this.chanZhiGuiMo[0] = [2020, 2021]
        this.chanZhiGuiMo[1] = [this.detail.lastYearValue, this.detail.thisYearValue]
        if (this.detail.keyEnterprisesVoList.length > 0) {
          this.detail.keyEnterprisesVoList.forEach((item: KeyEnterprises) => {
            this.bigEnterpriseList.push({ name: item.enterprisesName })
          })
        }
        if (this.detail.keyProjectsVoList.length > 0) {
          this.detail.keyProjectsVoList.forEach((item: KeyProjects) => {
            this.bigProjectList.push({ name: item.projectName })
          })
        }
      },

      clickCompany(company) {
        this.$emit('clickCompany', company)
      }
    }
  })
</script>
<style lang="scss">
  .industry-region-detail {
    padding: 32px;
    overflow-y: auto;
    .content_card {
      font-family: normal !important;
      font-weight: normal !important;
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
    .main-title {
      text-align: left;
      font-size: 20px;
      color: #17233d;
      font-weight: 550;
      line-height: 30px;
      padding-left: 10px;
      margin-bottom: 20px;
    }
    .card-group {
      // display: grid;
      margin-top: 18px;
      grid-template-columns: calc(50% - 5px) calc(50% - 5px);
      grid-column-gap: 10px;
    }
    .card-chart {
      flex-grow: 1;
    }
    .block {
      width: 100%;
    }
  }
</style>
