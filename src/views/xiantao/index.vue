<template>
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
            :isRMB="false"
            :precision="2"
            :total="item.value"
            :description="item.unit"
            :icon="item.icon"
          >
            <template #footer>
              <el-row justify="space-between">
                <el-col :span="12">
                  <trend :type="item.up > 0" :percentage="true" term="增幅" :rate="item.up" />
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
          </chart-card-icon>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <card>
            <el-row>
              <el-col :span="24">
                <div class="card-header">
                  <span>存贷金融(单位：亿元)</span>
                </div>
              </el-col>
            </el-row>
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
          </card>
        </el-col>
        <el-col :span="12">
          <card>
            <el-row>
              <el-col :span="24">
                <div class="card-header">
                  <span>常住居民可支配收入(单位：元)</span>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <word-card title="城镇" :total="35750" unit="元" color="#fa6d1d" :type="true" />
              </el-col>
              <el-col :span="12">
                <word-card title="农村" :total="20647" unit="元" color="#701866" :type="true" />
              </el-col>
            </el-row>
            <pie-label :data="shouRuData" :radius="['0%', '35%']" />
          </card>
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
            :isRMB="false"
            :precision="2"
            :total="item.value"
            :description="item.unit"
            :icon="item.icon"
          >
            <template #footer>
              <el-row justify="space-between">
                <el-col :span="12">
                  <trend :type="item.up > 0" :percentage="true" term="增幅" :rate="item.up" />
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
          </chart-card-icon>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="24">
          <card :style="{ padding: '20px 24px' }">
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
          </card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <card :style="{ padding: '20px 24px' }">
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
          </card>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
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
    WordCard,
    Card
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
      BarLine,
      Card
    },
    data() {
      return {
        cardLoading: false,
        line_01: [
          {
            id: '1',
            name: '地区生产总值(GDP)',
            icon: 'view',
            value: 602.85,
            unit: '亿元',
            up: 5.8,
            rank: 15,
            rankType: false
          },
          {
            id: '2',
            name: '社会消费品零售总额',
            icon: 'shopping-bag',
            value: 421.91,
            unit: '亿元',
            up: 25.8,
            rank: 6,
            rankType: false
          },
          {
            id: '3',
            name: '服务业增加值',
            icon: 'trend-charts',
            value: 373.39,
            unit: '亿元',
            up: -1.9,
            rank: 0,
            rankType: false
          },
          {
            id: '4',
            name: '工业用电量',
            icon: 'magic-stick',
            value: 20.3,
            unit: '亿千瓦时',
            up: 16.0,
            rank: 12,
            rankType: false
          },
          {
            id: '5',
            name: '地方一般公共预算收入',
            icon: 'lollipop',
            value: 36.58,
            unit: '亿元',
            up: 19.2,
            rank: 17,
            rankType: false
          },
          {
            id: '6',
            name: '实际利用外资',
            icon: 'moon',
            value: 5415,
            unit: '万美元',
            up: 73.4,
            rank: 0,
            rankType: false
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
            rank: 2,
            rankType: false
          },
          {
            id: '4',
            name: '全地域财政收入',
            icon: 'mostly-cloudy',
            value: 64.04,
            unit: '亿元',
            up: 22.83,
            rank: 0,
            rankType: false
          },
          {
            id: '5',
            name: '固定资产投资增速',
            icon: 'scale-to-original',
            value: 21,
            unit: '%',
            up: 21.0,
            rank: 12,
            rankType: false
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
  .card-header {
    color: #fff;
    padding-bottom: 20px;
    font-size: 14px;
  }
</style>
