<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-row :gutter="20" justify="space-between" class="first-line">
          <el-col
            :span="4"
            class="analysis-card"
            v-for="(item, index) in line_01"
            :index="item.id"
            :key="index"
          >
            <chart-card
              :loading="cardLoading"
              :title="item.name"
              :isGrowth="item.isGrowth"
              :precision="2"
              :total="item.value"
              :description="item.unit"
              :type="item.up > 0"
            >
              <template #date>{{ item.time }}</template>
              <template #footer>
                <el-row justify="space-between">
                  <el-col :span="12">
                    <trend :type="item.up > 0" :percentage="true" term="增速" :rate="item.up" />
                  </el-col>
                  <el-col :span="12" style="text-align: right">
                    <trend
                      :rankType="item.rankType"
                      :type="item.rank > 0"
                      term="排名"
                      :rate="item.rank"
                    />
                  </el-col>
                </el-row>
              </template>
            </chart-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="second-line">
      <el-col class="slider slider-flex" :span="8">
        <el-row style="margin-bottom: 20px">
          <el-col>
            <card>
              <el-row>
                <el-col :span="24">
                  <div class="card-header-title">
                    <span>春节前后可完工及可开工项目统计</span>
                  </div>
                </el-col>
              </el-row>
              <el-row class="card-header-content">
                <el-col :span="12"
                  ><span>总项目数</span
                  ><span class="card-header-content_total"
                    >{{ preOpenColseProject.allProject }}<i>个</i></span
                  ></el-col
                >
                <el-col :span="12"
                  ><span>投资总额</span
                  ><span class="card-header-content_total"
                    >{{ preOpenColseProject.allInvestmentAmount }}<i>亿</i></span
                  ></el-col
                >
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <div class="card-header">
                        <span
                          >招商引资项目数
                          <i class="color">{{ preOpenColseProject.zhaoShang.allProject }}</i
                          >个</span
                        >
                      </div>
                    </el-col>
                    <el-col :span="24" class="progress">
                      <el-progress
                        :stroke-width="18"
                        :percentage="preOpenColseProject.zhaoShang.projectRate"
                        color="#FFCC00"
                      />
                    </el-col>
                    <el-col :span="24">
                      <el-row class="progress-content">
                        <el-col :span="12"
                          >可完工
                          <i class="color">{{ preOpenColseProject.zhaoShang.beCompletedNum }}</i
                          >个</el-col
                        >
                        <el-col :span="12"
                          >可开工 <i class="color">{{ preOpenColseProject.zhaoShang.workable }}</i
                          >个</el-col
                        >
                      </el-row>
                    </el-col>
                    <el-col :span="24">
                      <div class="card-header">
                        <span
                          >招商引资项目金额
                          <i class="color">{{ preOpenColseProject.zhaoShang.allPrice }}</i
                          >亿</span
                        >
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-row>
                        <el-col>
                          <pie
                            id="zhaoShangPriceData"
                            :showLabel="false"
                            :style="{ height: '100px' }"
                            :data="preOpenColseProject.zhaoShang.priceData"
                            :radius="['70%', '90%']"
                          />
                        </el-col>
                        <el-col class="card-bottom-title"
                          >可完工{{ preOpenColseProject.zhaoShang.beCompletedPrice }}亿</el-col
                        >
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col>
                          <pie
                            id="zhaoShangPriceData"
                            :showLabel="false"
                            :style="{ height: '100px' }"
                            :data="preOpenColseProject.zhaoShang.priceDataFoo"
                            :radius="['70%', '90%']"
                          />
                        </el-col>
                        <el-col class="card-bottom-title"
                          >可开工{{ preOpenColseProject.zhaoShang.workablePrice }}亿</el-col
                        >
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <el-row>
                    <el-col :span="24">
                      <div class="card-header">
                        <span
                          >政府投资项目数
                          <i class="color">{{ preOpenColseProject.zhengFuTZ.allProject }}</i
                          >个</span
                        >
                      </div>
                    </el-col>
                    <el-col :span="24" class="progress">
                      <el-progress
                        :stroke-width="18"
                        :percentage="preOpenColseProject.zhengFuTZ.projectRate"
                        color="#FFCC00"
                      />
                    </el-col>
                    <el-col :span="24">
                      <el-row class="progress-content">
                        <el-col :span="12"
                          >可完工
                          <i class="color">{{ preOpenColseProject.zhengFuTZ.beCompletedNum }}</i
                          >个</el-col
                        >
                        <el-col :span="12"
                          >可开工 <i class="color">{{ preOpenColseProject.zhengFuTZ.workable }}</i
                          >个</el-col
                        >
                      </el-row>
                    </el-col>
                    <el-col :span="24">
                      <div class="card-header">
                        <span
                          >政府投资项目金额
                          <i class="color">{{ preOpenColseProject.zhengFuTZ.allPrice }}</i
                          >亿</span
                        >
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-row>
                        <el-col>
                          <pie
                            :style="{ height: '100px' }"
                            :showLabel="false"
                            :data="preOpenColseProject.zhengFuTZ.priceData"
                            :radius="['70%', '90%']"
                          />
                        </el-col>
                        <el-col class="card-bottom-title"
                          >可完工{{ preOpenColseProject.zhengFuTZ.beCompletedPrice }}亿</el-col
                        >
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-row>
                        <el-col>
                          <pie
                            :style="{ height: '100px' }"
                            :showLabel="false"
                            :data="preOpenColseProject.zhengFuTZ.priceDataFoo"
                            :radius="['70%', '90%']"
                          />
                        </el-col>
                        <el-col class="card-bottom-title"
                          >可开工{{ preOpenColseProject.zhengFuTZ.workablePrice }}亿</el-col
                        >
                      </el-row>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </card>
          </el-col>
        </el-row>
        <el-row style="flex: 1">
          <el-col>
            <card>
              <el-row>
                <el-col :span="24">
                  <div class="card-header">
                    <span>2021年1-11月全市招商引资上会项目进展情况</span>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" class="slider-flex-content">
                <el-col :span="12" class="wrap">
                  <el-row :gutter="20">
                    <el-col :span="12" class="title">总项目数</el-col>
                    <el-col :span="12">136个</el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="title">投资总额</el-col>
                    <el-col :span="12">235.1亿</el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12" class="title">占地总面积</el-col>
                    <el-col :span="12">4709亩</el-col>
                  </el-row>
                </el-col>
                <el-col :span="12">
                  <pie
                    :data="shouRuData"
                    :radius="['0', '85%']"
                    position="inside"
                    legend
                    :center="['50%', '40%']"
                    :style="{ height: '280px' }"
                  />
                </el-col>
              </el-row>
            </card>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="main" :span="12">
        <el-row :gutter="20" style="height: 475px; margin-bottom: 20px">
          <el-col style="height: 100%">
            <div class="map-select">
              <el-radio-group v-model="tabPosition" style="margin-bottom: 30px">
                <el-radio-button label="province">全省</el-radio-button>
                <el-radio-button label="city">全市</el-radio-button>
              </el-radio-group>
            </div>
            <div class="map_wrap" v-if="tabPosition === 'province'"><hubei-map-index /></div>
            <div class="map_wrap" v-if="tabPosition === 'city'"><map-index /></div>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="middle-wrap">
          <card :style="{ padding: '20px 24px' }">
            <el-row>
              <el-col :span="24">
                <div class="card-header">
                  <span>镇、办规模以上工业增加值增速排名（%）</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class="bar-content" style="padding-right: 10px">
                <bar-horizontal
                  :valueData="gyzjzRate.up.value"
                  :cateData="gyzjzRate.up.cate"
                  title="增幅前五"
                  titleStyle="right"
                />
              </el-col>
              <el-col :span="12" class="bar-content" style="padding-left: 10px">
                <bar-horizontal
                  :valueData="gyzjzRate.down.value"
                  :cateData="gyzjzRate.down.cate"
                  title="降幅前五"
                  :inverseX="false"
                  position="left"
                />
              </el-col>
            </el-row>
          </card>
        </el-row>
      </el-col>
      <el-col class="slider" :span="8">
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="24">
            <el-select
              class="select-wrap"
              v-model="selectValue"
              placeholder="Select"
              :popper-append-to-body="false"
              @change="selectChange"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <card :style="{ padding: '20px 24px' }">
              <line-two
                style="height: 330px"
                :line1DataName="renKouData[selectValue].name1"
                :line2DataName="renKouData[selectValue].name2"
                yAxis2Name="单位（%）"
                yAxis1Name="单位(亿元)"
                lineColor="#BFBEBE"
                :data="renKouData[selectValue].data"
              />
            </card>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <card :style="{ padding: '20px 24px' }">
              <bar-multi-more
                style="height: 320px"
                title="市、州地区生产总值"
                barDataName="生产总值"
                yAxisName="单位(亿元)"
                lineColor="#BFBEBE"
                :barWidth="15"
                :data="shiZhou"
              />
            </card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import MapIndex from '@/components/map/xiantaoHotSvgMap.vue'
  import HubeiMapIndex from '@/components/map/hubeiHotSvgMap.vue'
  import {
    ChartCardIcon,
    Trend,
    Pie,
    PieLabel,
    LineCard,
    WordCard,
    Card
  } from '@/components/echart/Charts'
  import { ChartCard } from '@/components/echart/Xiantao'
  import BarLineTwo from '@/components/echart/BarLineTwo.vue'
  import BarLine from '@/components/echart/BarLine.vue'
  import BarHorizontal from '@/components/echart/BarHorizontal.vue'
  import BarMultiMore from '@/components/echart/BarMultiMore.vue'
  import LineTwo from '@/components/echart/LineTwo.vue'
  export default defineComponent({
    components: {
      Trend,
      Pie,
      PieLabel,
      LineCard,
      ChartCardIcon,
      WordCard,
      BarLineTwo,
      BarLine,
      Card,
      ChartCard,
      MapIndex,
      HubeiMapIndex,
      BarHorizontal,
      BarMultiMore,
      LineTwo
    },
    data() {
      return {
        cardLoading: false,
        line_01: [
          {
            id: '1',
            name: 'GDP（地区生产总值）',
            time: '2021年1-9月',
            value: 602.85,
            unit: '亿元',
            up: 5.8,
            rank: 15,
            isGrowth: false,
            rankType: false
          },
          {
            id: '2',
            name: '规模以上工业增加值',
            time: '2021年1-11月',
            value: -12.4,
            unit: '%',
            up: -12.4,
            rank: 17,
            isGrowth: true,
            rankType: false
          },
          {
            id: '3',
            name: '财政总收入',
            time: '2021年1-11月',
            value: 64.04,
            unit: '亿元',
            up: 22.8,
            rank: 0,
            isGrowth: false,
            rankType: false
          },
          {
            id: '4',
            name: '固定资产投资',
            time: '2021年1-11月',
            value: 21,
            unit: '%',
            up: 21,
            rank: 12,
            isGrowth: true,
            rankType: false
          },
          {
            id: '5',
            name: '进出口总额',
            time: '2021年1-11月',
            value: 101.0,
            unit: '亿元',
            up: -53.5,
            rank: 16,
            isGrowth: false,
            rankType: false
          },
          {
            id: '6',
            name: '社会消费品零售总额',
            time: '2021年1-11月',
            value: 421.91,
            unit: '亿元',
            up: 25.8,
            rank: 6,
            isGrowth: false,
            rankType: false
          },
          {
            id: '7',
            name: '全社会用电量',
            time: '2021年1-11月',
            value: 36.74,
            unit: '亿千瓦时',
            up: 10.9,
            rank: 14,
            isGrowth: false,
            rankType: false
          }
        ],
        preOpenColseProject: {
          allProject: 235,
          allInvestmentAmount: 448.46,
          zhaoShang: {
            allProject: 159,
            beCompletedNum: 68,
            workable: 91,
            projectRate: 42,
            allPrice: 357.47,
            beCompletedPrice: 96.51,
            workablePrice: 260.96,
            priceData: [
              { value: 96.51, name: '可完工', label: { show: true } },
              { value: 260.96, name: '可开工' }
            ],
            priceDataFoo: [
              { value: 260.96, name: '可开工', label: { show: true } },
              { value: 96.51, name: '可完工' }
            ]
          },
          zhengFuTZ: {
            allProject: 76,
            beCompletedNum: 42,
            workable: 34,
            projectRate: 55,
            allPrice: 90.99,
            beCompletedPrice: 48.5,
            workablePrice: 42.49,
            priceData: [
              { value: 48.5, name: '可完工', label: { show: true } },
              { value: 42.49, name: '可开工' }
            ],
            priceDataFoo: [
              { value: 42.49, name: '可开工', label: { show: true } },
              { value: 48.5, name: '可完工' }
            ]
          }
        },
        gyzjzRate: {
          up: {
            value: [28.3, 23.3, 21.2, 17.7, 16.9],
            cate: ['毛嘴1', '沙原2', '剅河3', '干河4', '三伏潭5']
          },
          down: {
            value: [48.1, 32.4, 26.5, 18.3, 7.5],
            cate: ['1彭场', '2长埫口', '3沙嘴', '4龙华山', '5西流河']
          }
        },
        shiZhou: [
          [
            '武汉市',
            '襄阳市',
            '宜昌市',
            '荆州市',
            '孝感市',
            '黄冈市',
            '十堰市',
            '荆门市',
            '黄石市',
            '咸宁市',
            '恩施州',
            '随州市',
            '鄂州市',
            '潜江市',
            '仙桃市',
            '天门市',
            '神农架'
          ],
          [
            12317.73, 3674.39, 3456.63, 1894.1, 1867.53, 1742.47, 1497.12, 1447.92, 1304.21,
            1239.91, 924.8, 915.59, 830.52, 638.63, 602.85, 501.12, 25.02
          ]
        ],
        shouRuData: [
          { value: 23, name: '已开工' },
          { value: 29, name: '已完工' },
          { value: 66, name: '未开工' },
          { value: 18, name: '已终止' }
        ],
        renKouData: [
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-45.0, -28.1, -19.8, -16.1, -12.6, -9.9, -8.3, -5.9, -5.6, -4.3, -3.8],
              [66.5, 13.7, -6.1, -15.4, -13.5, -15.9, -18.3, -20.0, -16.0, -12.4]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-49.7, -42.7, -29.4, -19.0, -12.3, -10.3, -3.8, -2.5, 0.5, 3.7, 0.8],
              [77.0, 80.4, 50.3, 34.5, 26.0, 21.1, 17.2, 17.6, 16.3, 16.0]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-86.3, -83.0, -75.4, -66.9, -58.2, -50.4, -39.8, -33.5, -28.8, -26.3, -37.2],
              [263.8, 166.0, 109.5, 92.2, 51.5, 56.1, 38.2, 27.6, 24.0, 21.0]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-42.5, -59.1, -24.5, -21.5, -20.9, -9.3, -6.3, -3.5, -3.8, -4.6, -7.7],
              [215.8, 178.6, 65.7, 59.6, 46.1, 32.6, 28.9, 26.2, 21.1, 19.2]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [36.5, 56.1, 80.2, 111.6, 145.5, 178.4, 212.4, 250.6, 292.8, 335.4, 381.9],
              [54.1, 80.5, 108.9, 146.5, 189.0, 230.5, 272.6, 316.0, 367.47, 421.91]
            ]
          }
        ],
        selectValue: 0,
        options: [
          {
            value: 0,
            label: '规模以上工业增加值各月累计增幅'
          },
          {
            value: 1,
            label: '工业用电量各月累计增幅'
          },
          {
            value: 2,
            label: '固定资产投资各月累计增幅'
          },
          {
            value: 3,
            label: '地方一般公共预算收入各月累计增幅'
          },
          {
            value: 4,
            label: '全社会消费品零售总额各月累计增幅'
          }
        ],
        tabPosition: 'city'
      }
    },
    methods: {
      selectChange(value) {
        console.log(value)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .analysis-card {
    margin-bottom: 20px;
  }
  .dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }
  .extra-wrapper {
    font-size: 14px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        color: #303133;
        margin-left: 24px;
        cursor: pointer;
      }
    }

    .active-extra {
      .active-item {
        background-color: #1890ff;
        color: #fff;
        padding: 2px 8px;
        border-radius: 4px;
      }
    }
  }
  .first-line {
    .el-col-4 {
      width: 14.27%;
      flex: 0 0 14.27%;
    }
  }
  .second-line {
    .slider.el-col-8 {
      width: 28.54%;
      flex: 0 0 28.54%;
    }
    .main.el-col-12 {
      width: 42.92%;
      flex: 0 0 42.92%;
    }
  }

  .card-header-title {
    color: #fff;
    padding-bottom: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  .card-header {
    color: #fff;
    padding-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }
  .card-header-content {
    text-align: center;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    .el-col {
      display: flex;
      padding-bottom: 20px;
    }
    span {
      flex: 1;
    }
    .card-header-content_total {
      color: #ffff20;
      i {
        font-style: normal;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
  .color {
    color: #ffff20;
    font-style: normal;
  }
  .progress {
    // padding-bottom: 10px;
    ::v-deep(.el-progress-bar__outer),
    ::v-deep(.el-progress-bar__inner) {
      border-radius: 2px;
    }
    ::v-deep(.el-progress__text) {
      color: #fff;
      font-size: 16px !important;
    }
  }
  .progress-content {
    font-size: 14px;
    color: #fff;
    padding: 10px 0;
  }
  .card-bottom-title {
    font-size: 14px;
    color: #fff;
    text-align: center;
    padding: 10px 0;
  }
  .slider-flex {
    display: flex;
    flex-direction: column;
  }
  .slider-flex-content {
    color: #fff;
    font-size: 16px;
    .wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .el-row {
      padding: 10px 0;
    }
  }
  .middle-wrap {
    height: 250px;
    background-color: #fff;
    .el-card {
      width: 100%;
    }
    .bar-content {
      padding-top: 15px;
      height: 185px;
    }
  }
  .select-wrap {
    position: absolute;
    top: 10px;
    right: 20px;
    z-index: 999;
    min-width: 300px;
    color: #000;
  }
  .map-select {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
  }
  .map_wrap {
    height: 475px;
  }
  .map_wrap.active {
    display: block;
  }
</style>
