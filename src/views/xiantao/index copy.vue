<template>
  <div class="tab-content">
    <div class="slide-stack-wrapper">
      <div class="base-content">
        <el-row class="tac">
          <el-col :span="4">
            <el-scrollbar class="menu-wrap" :always="true">
              <el-menu
                class="el-menu-vertical"
                default-active="1"
                @open="handleOpen"
                @close="handleClose"
              >
                <el-menu-item v-for="(item, index) in menu" :index="item.id" :key="index">
                  <el-icon><component :is="item.icon" /></el-icon>
                  <span>{{ item.name }}</span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-col>
          <el-col :span="20">
            <el-scrollbar class="menu-wrap content-right">
              <el-row :gutter="20">
                <el-col :span="10" class="left-bar">
                  <el-row :gutter="20" class="first-line">
                    <el-col
                      :span="12"
                      class="analysis-card"
                      v-for="(item, index) in line_01"
                      :index="item.id"
                      :key="index"
                    >
                      <chart-card-icon
                        :loading="cardLoading"
                        :title="item.name"
                        :isRMB="true"
                        :precision="2"
                        :total="item.value"
                        :description="item.unit"
                        :icon="item.icon"
                      >
                        <template #footer>
                          <el-row justify="space-between">
                            <el-col :span="12">
                              <trend :type="item.up > 0" term="增幅" :rate="item.up" />
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                              <trend :type="item.rank > 0" term="排名" :rate="item.rank" />
                            </el-col>
                          </el-row>
                        </template>
                      </chart-card-icon>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-card
                        shadow="hover"
                        :body-style="{ padding: '20px 24px 8px' }"
                        :bordered="false"
                      >
                        <template #header>
                          <div class="card-header">
                            <span>存贷金融(单位：亿元)</span>
                          </div>
                        </template>
                        <el-row :gutter="20">
                          <el-col :span="12"
                            ><word-card
                              title="存款余额"
                              :total="946.75"
                              unit="亿元"
                              color="#0780cf"
                              :type="true"
                          /></el-col>
                          <el-col :span="12">
                            <word-card
                              title="贷款余额"
                              :total="421.97"
                              unit="亿元"
                              color="#765005"
                              :type="true"
                            />
                          </el-col>
                        </el-row>
                        <pie :data="jingRongData" :radius="['55%', '70%']" />
                      </el-card>
                    </el-col>
                    <el-col :span="12">
                      <el-card
                        shadow="hover"
                        :body-style="{ padding: '20px 24px 8px' }"
                        :bordered="false"
                      >
                        <template #header>
                          <div class="card-header">
                            <span>常住居民可支配收入(单位：元)</span>
                          </div>
                        </template>
                        <el-row :gutter="20">
                          <el-col :span="12">
                            <word-card
                              title="城镇"
                              :total="35750"
                              unit="元"
                              color="#fa6d1d"
                              :type="true"
                            />
                          </el-col>
                          <el-col :span="12">
                            <word-card
                              title="农村"
                              :total="20647"
                              unit="元"
                              color="#701866"
                              :type="true"
                            />
                          </el-col>
                        </el-row>
                        <pie-label :data="shouRuData" :radius="['0%', '35%']" />
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
                <el-col :span="14" class="right-bar">
                  <el-row :gutter="20" class="second-line">
                    <el-col
                      :span="8"
                      class="analysis-card"
                      v-for="(item, index) in line_02"
                      :index="item.id"
                      :key="index"
                    >
                      <chart-card-icon
                        :loading="cardLoading"
                        :title="item.name"
                        :isRMB="true"
                        :precision="2"
                        :total="item.value"
                        :description="item.unit"
                        :icon="item.icon"
                      >
                        <template #footer>
                          <el-row justify="space-between">
                            <el-col :span="12">
                              <trend :type="item.up > 0" term="增幅" :rate="item.up" />
                            </el-col>
                            <el-col :span="12" style="text-align: right">
                              <trend :type="item.rank > 0" term="排名" :rate="item.rank" />
                            </el-col>
                          </el-row>
                        </template>
                      </chart-card-icon>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" style="margin-bottom: 20px">
                    <el-col :span="24">
                      <el-card
                        shadow="hover"
                        :body-style="{ padding: '20px 24px' }"
                        :bordered="false"
                      >
                        <bar-line
                          style="height: 360px"
                          title="常住人口及城镇化率"
                          barDataName="常住人口"
                          lineDataName="城镇化率"
                          yAxis2Name="单位（%）"
                          yAxis1Name="单位(万人)"
                          lineColor="#BFBEBE"
                          :barWidth="60"
                          :data="renKouData"
                        />
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                      <el-card
                        shadow="hover"
                        :body-style="{ padding: '20px 24px' }"
                        :bordered="false"
                      >
                        <bar-line-two
                          style="height: 360px"
                          title="规模以上工业总产值"
                          barDataName="规上工业总产值"
                          line1DataName="规上工业产值增速(%)"
                          line2DataName="规上工业增加值增速(%)"
                          yAxis2Name="单位（%）"
                          yAxis1Name="单位(亿元)"
                          lineColor="#BFBEBE"
                          :data="guiShangData"
                        />
                      </el-card>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-scrollbar>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import {
    ChartCard,
    ChartCardIcon,
    Trend,
    Pie,
    PieLabel,
    LineCard,
    WordCard
  } from '@/components/echart/Charts'
  import BarLineTwo from '@/components/echart/BarLineTwo.vue'
  import BarLine from '@/components/echart/BarLine.vue'
  export default defineComponent({
    components: {
      ChartCard,
      Trend,
      Pie,
      PieLabel,
      LineCard,
      ChartCardIcon,
      WordCard,
      BarLineTwo,
      BarLine
    },
    setup() {
      const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
      }
      const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
      }
      return {
        handleOpen,
        handleClose
      }
    },
    data() {
      return {
        menu: [
          { id: '0', name: '数据总览', icon: 'wind-power' },
          { id: '1', name: '地区生产总值(GDP)', icon: 'view' },
          { id: '2', name: '服务业增加值', icon: 'trend-charts' },
          { id: '3', name: '城镇常住居民可支配收入', icon: 'user' },
          { id: '4', name: '农村常住居民可支配收入', icon: 'list' },
          { id: '5', name: '固定资产投资', icon: 'scale-to-original' },
          { id: '6', name: '社会消费品零售总额', icon: 'shopping-bag' },
          { id: '7', name: '外贸出口', icon: 'ship' },
          { id: '8', name: '规模以上工业总产值', icon: 'wallet' },
          { id: '9', name: '规模以上工业增加值增速', icon: 'takeaway-box' },
          { id: '10', name: '工业用电量', icon: 'magic-stick' },
          { id: '11', name: '全地域财政收入', icon: 'mostly-cloudy' },
          { id: '12', name: '地方一般公共预算收入', icon: 'lollipop' },
          { id: '13', name: '实际利用外资', icon: 'moon' },
          { id: '14', name: '存款余额', icon: 'hot-water' },
          { id: '15', name: '贷款余额', icon: 'goblet' },
          { id: '16', name: '城镇化率', icon: 'monitor' },
          { id: '17', name: '总人口', icon: 'user-filled' },
          { id: '18', name: '常住人口', icon: 'switch' },
          { id: '19', name: '高新技术产业增加值', icon: 'lightning' }
        ],
        cardLoading: false,
        line_01: [
          {
            id: '1',
            name: '地区生产总值(GDP)',
            icon: 'view',
            value: 827.91,
            unit: '亿元',
            up: -4.3,
            rank: 2
          },
          {
            id: '2',
            name: '社会消费品零售总额',
            icon: 'shopping-bag',
            value: 381.93,
            unit: '亿元',
            up: -14.2,
            rank: 1
          },
          {
            id: '3',
            name: '服务业增加值',
            icon: 'trend-charts',
            value: 373.39,
            unit: '亿元',
            up: -1.9,
            rank: 0
          },
          {
            id: '4',
            name: '工业用电量',
            icon: 'magic-stick',
            value: 19.58,
            unit: '亿千瓦时',
            up: 0.8,
            rank: 3
          },
          {
            id: '5',
            name: '地方一般公共预算收入',
            icon: 'lollipop',
            value: 31.98,
            unit: '亿元',
            up: -7.7,
            rank: 1
          },
          {
            id: '6',
            name: '实际利用外资',
            icon: 'moon',
            value: 3343,
            unit: '万美元',
            up: 1.1,
            rank: 0
          }
        ],
        line_02: [
          {
            id: '3',
            name: '外贸出口',
            icon: 'ship',
            value: 32.3015,
            unit: '亿美元',
            up: 308.2,
            rank: 2
          },
          {
            id: '4',
            name: '全地域财政收入',
            icon: 'mostly-cloudy',
            value: 53.64,
            unit: '亿元',
            up: -0.8,
            rank: 0
          },
          {
            id: '5',
            name: '固定资产投资',
            icon: 'scale-to-original',
            value: 0,
            unit: '亿元',
            up: -37.2,
            rank: 17
          }
        ],
        jingRongData: [
          { value: 946.75, name: '存款余额' },
          { value: 421.97, name: '贷款余额' }
        ],
        shouRuData: [
          { value: 35750, name: '城镇居民' },
          { value: 20647, name: '农村居民' }
        ],
        renKouData: [
          [2016, 2017, 2018, 2019, 2020],
          [114.8, 114.1, 114, 114.01, 113.5],
          [56.1, 57.6, 58.7, 59.04, 59.28]
        ],
        guiShangData: [
          [2016, 2017, 2018, 2019, 2020],
          [1105, 1057.2, 1004.6, 1094.2, 1098.31],
          [10, 12.3, 12.9, 7.9, -0.2],
          [9, 7.7, 8.4, 9.4, -3.8]
        ]
      }
    }
  })
</script>
<style lang="scss" scoped>
  ::v-deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
  ::v-deep(.is-horizontal) {
    display: none !important;
  }
  .tab-content {
    overflow: hidden;
  }
  .slide-stack-wrapper {
    height: 100%;
  }
  .base-content {
    height: 100%;
    padding: 40px 0 35px 30px;
  }
  .el-menu,
  .tac {
    height: 100%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    // width: 400px;
    min-height: 400px;
    font-size: 16px;
  }
  .el-menu-vertical {
    padding: 20px 0;
    .el-menu-item {
      font-size: 16px !important;
    }
  }
  .menu-wrap {
    height: calc(100% - 195px);
  }
  .content-right {
    padding: 20px 30px 0 20px;
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
      .el-col-5 {
        width: 20%;
        flex: 0 0 20%;
      }
    }
    .second-line {
      .el-col-10 {
        width: 40%;
        flex: 0 0 40%;
      }
    }
  }
</style>
