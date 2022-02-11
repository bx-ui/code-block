<template>
  <div class="tab-content">
    <LeftRightLayout
      class="chanye-quanjing-wrapper"
      :toolsPosition="{ right: '30px', top: '50px', 'z-index': 1 }"
      :toolsPosition2="{ right: '200px', top: '50px' }"
      :toolsPosition3="{
        left: showProjectDetails ? '0px' : '-100%',
        bottom: '0px',
        width: '100%'
      }"
    >
      <template #left>
        <div style="height: 100%; width: 100%; overflow: hidden; position: relative">
          <div
            style="height: 100%; width: 100%"
            :style="{
              position: 'absolute',
              left: mainContentType == 'map' ? '0%' : '-120%'
            }"
          >
            <IndexMap @clickMark="clickMapMark" />
            <CoverImg v-show="enterpriseInfo.faceImage" :imgSrc="enterpriseInfo.faceImage" />
          </div>
          <!-- <MeshPanoViewer
            :style="{
              position: 'absolute',
              left: mainContentType == 'mesh' ? '0%' : '-120%'
            }"
            :iframe_url="iframe_url"
          ></MeshPanoViewer> -->
          <div
            style="width: 100%; height: 100%; top: 30px"
            :style="{
              position: 'absolute',
              left: mainContentType == 'tree' ? '0%' : '-120%'
            }"
          >
            <IndustryTypeTree @select-type="showIndustryType" />
          </div>
        </div>
      </template>

      <template #tools>
        <div v-if="showMap">
          <IndustryTypeSelect @change="showIndustryType" />
        </div>
        <!-- <div slot="tools2">
            <ProjectMatching @submit="projectMatch"></ProjectMatching>
        </div> -->
      </template>
      <template #tools3>
        <div style="width: 100%; height: 200px">
          <RightSlider ref="slideStack2" enterFrom="left" @pop="onProjectDetailPop">
            <template #details>
              <PlateInformation />
            </template>
          </RightSlider>
        </div>
      </template>

      <template #right>
        <RightSlider ref="slideStack" @pop="onRightStackPop">
          <IndustrySummary
            :panorama="panorama"
            :zhudaodata="zhudaodata"
            :chanzhidata="chanzhidata"
          />
          <template #industryDetailData>
            <IndustryRegionDetails
              :regionName="region_name"
              :industryName="industry_name"
              :detail="industrialPanoramaDetails"
              @clickCompany="clickCompany"
            />
          </template>
          <template #companyDetailData>
            <CompanyDetail :enterpriseProfileData="enterpriseInfo" />
          </template>
          <!-- <IndustryTypeDetail
            slot="industry-type-data"
            :industry_name="industry_name"
            @clickCompany="clickCompany"
            @clickCompanyXm="clickCompanyXm"
            @tojianjie="To_Jian_Jie()"
            @toshuishou="To_shui_shou()"
          /> -->
          <!-- <JianJie slot="jianjie" /> -->
          <!-- <ShuiShou slot="shuishou" /> -->
          <!-- <MathingList slot="project-matching" @clickProject="clickProject" /> -->
          <!-- <CompanyDetails slot="companydetails" :title="companyTitle" /> -->
        </RightSlider>
      </template>
    </LeftRightLayout>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import LeftRightLayout from '@/components/layouts/LeftRight.vue'
  import Indicator from '@/components/card/IndicatorCard.vue'
  import RightSlider from '@/components/layouts/RightSlider.vue'
  import IndustrySummary from '@/components/chanye/IndustrySummary.vue'
  import IndustryTypeSelect from '@/components/chanye/IndustryType.vue'
  import PlateInformation from '@/components/chanye/PlateInformation.vue'
  import IndustryTypeTree from '@/components/chanye/IndustryTypeTree.vue'
  import IndustryRegionDetails from '@/components/chanye/IndustryRegionDetails.vue'
  import CompanyDetail from '@/components/chanye/CompanyDetail.vue'
  import CoverImg from '@/components/map/CoverImg.vue'
  import IndexMap from '@/components/map/index.vue'
  import {
    industrialPanoramaPanoramaList,
    Panorama,
    industrialPanoramaEnterprisesNumberList,
    PanoramaEnterprisesNumber,
    industrialPanoramaBusinessIncomeList,
    BusinessIncome,
    IndustrialPanoramaDetails,
    industrialPanoramaDetailsList,
    EnterpriseList,
    enterpriseInfoList
  } from '@/api/big'
  // import { surveyStatistics } from '@/api/big'
  export default defineComponent({
    name: 'Chanye',
    components: {
      LeftRightLayout,
      Indicator,
      IndexMap,
      RightSlider,
      IndustrySummary,
      IndustryTypeSelect,
      PlateInformation,
      IndustryTypeTree,
      IndustryRegionDetails,
      CompanyDetail,
      CoverImg
    },
    emits: ['chan-ye-type', 'init-industry-type', 'init-company-detail'],
    data() {
      return {
        time: '2021年1-6月',
        panorama: {} as Panorama,
        PanoramaEnterprisesNumberList: [] as PanoramaEnterprisesNumber[],
        zhudaodata: [],
        BusinessIncomeList: [] as BusinessIncome[],
        chanzhidata: [],
        industrialPanoramaDetails: {} as IndustrialPanoramaDetails,
        enterpriseList: [] as EnterpriseList[],
        enterpriseInfo: {} as EnterpriseList,
        chanZhiGuiMo: [],
        companyTitle: '',
        showIframe: false,
        showMap: true,
        mainContentType: 'tree',
        region_name: '',
        industry_name: '',
        projectMatchInfo: '',
        showProjectDetails: false,
        credit_code: '',
        iframe_url: null
      }
    },
    created() {},
    async mounted() {
      await this.fetchIndustrialPanoramaPanoramaList()
      await this.fetchIndustrialPanoramaEnterprisesNumberList()
      await this.fetchIndustrialPanoramaBusinessIncomeList()
      console.log(this.$route.params)
      if (this.$route.params && this.$route.params.company) {
        // 直接打开企业
        this.showMap = true
        this.mainContentType = 'map'
        this.clickCompany({ name: this.$route.params.company })
      }
    },
    methods: {
      // N大产业产值
      async fetchIndustrialPanoramaPanoramaList() {
        const { data } = await industrialPanoramaPanoramaList()
        this.panorama = data
        this.panorama.currentValue = (this.panorama.currentValue / 100000000).toFixed(1)
        this.panorama.thisYearValue = (this.panorama.thisYearValue / 100000000).toFixed(1)
      },
      // N大产业企业数量
      async fetchIndustrialPanoramaEnterprisesNumberList() {
        const { data } = await industrialPanoramaEnterprisesNumberList()
        this.PanoramaEnterprisesNumberList = data
        const arr = [[], []]
        if (this.PanoramaEnterprisesNumberList.length > 0) {
          this.PanoramaEnterprisesNumberList.forEach((item: PanoramaEnterprisesNumber) => {
            arr[0].push(item.industryName)
            arr[1].push(item.enterprisesNumber)
          })
        }
        this.zhudaodata = arr
      },
      // N大产业主营业务收入
      async fetchIndustrialPanoramaBusinessIncomeList() {
        const { data } = await industrialPanoramaBusinessIncomeList()
        this.BusinessIncomeList = data
        const arr = [[], [], []]
        if (this.BusinessIncomeList.length > 0) {
          this.BusinessIncomeList.forEach((item: BusinessIncome) => {
            arr[0].push(item.industryName)
            arr[1].push((item.thisYearValue / 10000).toFixed(2))
            arr[2].push(item.growthRate)
          })
        }
        this.chanzhidata = arr
      },
      async fetchIndustrialPanoramaDetailsList(param: string) {
        const { data } = await industrialPanoramaDetailsList({ industryName: param })
        this.industrialPanoramaDetails = data
      },
      async fetchEnterpriseInfoList(name: string) {
        const { data } = await enterpriseInfoList()
        this.enterpriseList = data
        if (this.enterpriseList.length > 0) {
          this.enterpriseList.forEach((item: EnterpriseList) => {
            if (item.name === name) {
              this.enterpriseInfo = item
            }
          })
        }
      },
      push(name: String) {
        this.$refs.slideStack && this.$refs.slideStack.push(name)
      },
      pop() {
        this.$refs.slideStack && this.$refs.slideStack.pop()
        // if (params === 'industry-type-data') {
        //   this.showMap = false
        // }
      },
      onRightStackPop(evt: any) {
        // eventBus.pop(evt)
        // 新加的，为了二级能退回到一级的树状页面
        this.mainContentType = 'tree'
        this.enterpriseInfo = {}
        if (evt === 'companyDetailData' || evt === 'industryDetailData') {
          this.showMap = true
        }
      },
      async clickCompany(company: any) {
        // this.companyTitle = company
        await this.fetchEnterpriseInfoList(company.name)
        this.$refs.slideStack.push('companyDetailData')
      },
      clickCompanyXm(company: any) {
        this.companyTitle = company
        this.$refs.slideStack.push('companyDetailData')
        // eventBus.$emit('init-company-detail-xm', company)
        // this.showMap = false;
      },
      showIndustryType(value: any) {
        console.log(value)
        // this.$emit('init-industry-type', value)
        // 选择产业
        // this.region_name = value
        this.industry_name = value
        this.fetchIndustrialPanoramaDetailsList(value) // value
        this.$refs.slideStack.push('industryDetailData')
        this.mainContentType = 'map'
        this.showMap = false
      },
      clickMapMark(value) {
        console.log(value)
        this.clickCompany({ name: value.name })
      },
      projectMatch(queryInfo) {
        this.projectMatchInfo = queryInfo
        this.push('project-matching')
      },
      clickProject() {
        this.showProjectDetails = true
        this.$refs.slideStack2.push('details')
      },
      onProjectDetailPop() {
        setTimeout(() => {
          this.showProjectDetails = false
        }, 300)
      }
    }
  })
</script>
<style lang="scss" scoped>
  $syleft: 16px;

  .shouye_page {
    .slide-stack-wrapper {
      .close-icon {
        color: #8daac2;
      }
    }

    .tools {
      width: 100%;
    }

    .Select {
      width: 280px;
      margin-left: $syleft;
      box-sizing: border-box;
      position: relative;
      // background: #0a0a32;
      // border: 1px solid #058dfb;
      box-shadow: 0 2px 8px 0 rgba(23, 35, 61, 0.25);
      border-radius: 2px;
      height: 40px;
      float: left;

      .ivu-col-span-12 {
        width: 100%;
        padding: 0px !important;
      }

      .ivu-select-input {
        height: 40px;
        line-height: 40px;
        // color: #fff;
        font-weight: 600;
        font-size: 14px;
      }

      .ivu-select-selection {
        // background: transparent;
        // border: 0px solid #333;
        height: 40px;
      }

      .ivu-select-dropdown {
        min-width: 297px;
        position: absolute;
        will-change: top, left;
        transform-origin: center top;
        top: 40px !important;
        left: 0px;
        // border: 1px solid #058DFB;
        // background: #0a0a32;
      }

      .ivu-select-item {
        // color: #fff;
      }

      .ivu-select-item:hover {
        // background: rgba(9, 48, 104, 0.7);
      }

      // .ivu-select-item:hover {
      //     background: rgba(5,141,251,0.2);
      // }
      .ivu-select-item-focus {
        // background: rgba(5, 141, 251, 0.4);
        /* background: #f3f3f3; */
      }
    }
  }

  .industry {
    float: left;
    margin: 0 10px;
  }

  .showBox {
    // width: 100%;
    width: 101%;
    padding-right: 1%;
    padding-left: $syleft;
    height: 176px;
    background: #000;
    position: relative;
    // top: -5px;
    margin-bottom: 10px;
    background-color: rgba(9, 48, 104, 1);
    // left: -22px;
    display: flex;

    .ivu-card-body {
      padding: 5px 16px;
    }

    .leijigongye {
      .chanzhi {
        display: none;
      }

      .tongbi {
        width: 100% !important;
      }
    }
  }

  .Breadcrumb {
    box-sizing: border-box;
    position: relative;
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(23, 35, 61, 0.25);
    border-radius: 2px;
    overflow: hidden;
    height: 40px;
    line-height: 40px;
    width: 240px;
    margin: 0 10px;
    padding: 0 16px;

    .park {
      font-size: 14px;
      color: #0b1100;
    }

    .division {
      color: #0b1100;
      font-weight: 700;
      margin: 0 5px;
    }

    .getHome {
      font-size: 14px;
      color: rgba(23, 35, 61, 0.75);
      cursor: pointer;
      transition: color 0.3s ease-in-out;
      // margin-left: 3pxz;
    }

    .getHome:hover {
      color: #57a3f3;
    }
  }

  .mapLegend {
    // background: rgba(0, 0, 0, 0.7) !important;
    cursor: pointer;
    z-index: 1000 !important;
  }
  img {
    border-style: none;
  }
</style>
