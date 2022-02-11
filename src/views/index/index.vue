<template>
  <div class="tab-content">
    <LeftRightLayout class="shouye_page" leftWidth="1408px" paddingTop="180px">
      <template #left>
        <IndexMap @clickMark="clickMapMark" />
        <!-- <MeshPanoViewer v-show="!showMap" :iframe_url="iframe_url"></MeshPanoViewer> -->
      </template>
      <!-- <template #mapLegend class="mapLegend" v-if="legend">
        <div class="legend0" @click="gs">
          规上企业
          <em style="background: rgb(6, 183, 94)"></em>
        </div>
        <div class="legend1" @click="gx">
          规下重点培育企业
          <em style="background: rgb(255, 153, 0)"></em>
        </div>
      </template> -->
      <template #tools>
        <div>
          <div class="showBox">
            <Indicator
              title="地区生产总值"
              :date="time"
              title1="累计产值"
              :num1="827.91"
              unit="亿元"
              title2="同比增速"
              :percent="-4.3"
            />
            <Indicator
              title="社会消费品零售总额"
              date="2021年1-11月"
              title1="总额"
              :num1="421.91"
              unit="亿元"
              title2="同比增速"
              :percent="25.8"
            />
            <Indicator
              title="全地域财政收入"
              date="2021年1-11月"
              title1="总收入"
              :num1="64.04"
              unit="亿元"
              title2="同比增速"
              :percent="22.8"
            />
          </div>
          <!-- <div class="Select" v-show="selected_heat">
            <Row>
              <Col span="12" style="padding-right: 10px">
                <Select @on-select="on_select" v-model="model" setQuery filterable>
                  <div slot="empty">没找到数据</div>
                  <Option v-for="item in unique(enterprise_List)" :value="item[1]" :key="item[1]">{{
                    item[1]
                  }}</Option>
                </Select>
              </Col>
            </Row>
          </div> -->
        </div>
      </template>
      <template #right>
        <RightSlider ref="slideStack" @pop="onRightStackPop" :iconStyle="{ color: '#fff' }">
          <!-- @changeChose="changeChose"   -->
          <Chanye
            :dataAll="dataAll"
            :chanzhi="chanzhi"
            :qiyeData="qiyeData"
            @changeIndustry="onChanye"
          />
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
  import Chanye from '@/components/shouye/chanye.vue'
  import IndexMap from '@/components/map/index.vue'
  import {
    surveyStatistics,
    Statistics,
    surveyParkList,
    ParkList,
    surveyEnterprisesNumberList,
    EnterprisesNumber
  } from '@/api/big'
  export default defineComponent({
    name: 'Index',
    components: { LeftRightLayout, Indicator, IndexMap, RightSlider, Chanye },
    emits: ['chan-ye-type'],
    data() {
      return {
        time: '2020年1-12月',
        statistics: {} as Statistics,
        parkList: [] as ParkList[],
        chanzhi: [
          [2016, 2017, 2018, 2019, 2020],
          [59891, 63056, 76365, 79140.3, 323015],
          [-13.1, 5.3, 21.2, 3.6, 308.2]
        ],
        dataAll: {
          location: [
            [
              { name: '智能装备制造', src: '' },
              { name: '电子信息', src: '' },
              { name: '新能源新材料', src: '' }
            ],
            [
              { name: '非织造布', src: '' },
              { name: '食品加工', src: '' },
              { name: '文化旅游现代服务', src: '' }
            ]
          ]
        },
        enterpriseNumberList: [] as EnterprisesNumber[],
        qiyeData: [
          [2016, 2017, 2018, 2019, 2020, 2021],
          [-13.1, 5.3, 21.2, 3.6, 308.2, 21]
        ]
      }
    },
    async mounted() {
      // await this.fetchSurveyStatistics()
      // await this.fetchSurveyParkList()
      // await this.fetchSurveyEnterprisesNumberList()
    },
    methods: {
      // 概览头部数据
      async fetchSurveyStatistics() {
        const { data } = await surveyStatistics()
        this.statistics = data
      },
      // 园区产值情况
      async fetchSurveyParkList() {
        const { data } = await surveyParkList()
        this.parkList = data
        const arr = [[], [], []]
        if (this.parkList.length > 0) {
          this.parkList.forEach((item: ParkList) => {
            arr[0].push(item.parkName)
            arr[1].push(item.outputValue)
            arr[2].push(item.growthRate)
          })
        }
        this.chanzhi = arr
      },
      // 园区规上企业数量
      async fetchSurveyEnterprisesNumberList() {
        const { data } = await surveyEnterprisesNumberList()
        this.enterpriseNumberList = data
        const arr = [[], []]
        if (this.enterpriseNumberList.length > 0) {
          this.enterpriseNumberList.forEach((item: EnterprisesNumber) => {
            arr[0].push(item.parkName)
            arr[1].push(item.enterprisesNumber)
          })
        }
        this.qiyeData = arr
      },
      onRightStackPop(evt: any) {
        console.log(evt)
      },
      //园区产业类型
      onChanye(value: any) {
        //园区产业类型
        // this.$emit('chan-ye-type', value)
        console.log(value)
      },
      clickMapMark(value: any) {
        this.$router.push({ name: 'chanye', params: { company: value.name } })
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
