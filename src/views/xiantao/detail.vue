<template>
  <el-row
    :gutter="20"
    class="second-line"
  >
    <el-col
      :span="8"
      class="analysis-card"
      v-for="(item, index) in line_02"
      :index="item.id"
      :key="index"
    >
      <chart-card-icon-big
        :title="item.name"
        :isRMB="false"
        :precision="2"
        :total="item.value"
        :description="item.unit"
        :icon="item.icon"
        :size="55"
      >
        <template #footer>
          <el-row justify="space-between">
            <el-col :span="2" />
            <el-col
              :span="22"
              style="text-align: right"
            >
              <trend
                :type="item.up > 0"
                :percentage="true"
                term="增幅"
                :rate="item.up"
              />
            </el-col>
          </el-row>
        </template>
      </chart-card-icon-big>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col
      :span="13"
      class="left-bar"
    >
      <map-index />
    </el-col>
    <el-col
      :span="11"
      class="right-bar"
    >
      <el-row
        :gutter="20"
        style="margin-bottom: 20px"
      >
        <el-col :span="24">
          <card :style="{ padding: '20px 24px' }">
            <bar-multi
              style="height: 320px"
              :title="dataArray.name"
              barDataName="完成数"
              lineDataName="增幅"
              yAxis2Name="单位（%）"
              :yAxisName="'单位(' + dataArray.unit + ')'"
              lineColor="#BFBEBE"
              :barWidth="40"
              :data="dataArray.finish"
            />
          </card>
        </el-col>
      </el-row>
      <el-row
        :gutter="20"
        style="margin-bottom: 20px"
      >
        <el-col :span="24">
          <card :style="{ padding: '20px 24px' }">
            <Line
              style="height: 320px"
              :title="dataArray.name"
              line1DataName="增幅"
              :yAxisName="'单位(' + dataArray.unit + ')'"
              lineColor="#BFBEBE"
              :data="dataArray.rate"
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
  ChartCardIconBig,
  Trend,
  Pie,
  PieLabel,
  LineCard,
  WordCard,
  Card
} from '@/components/echart/Charts'
import BarMulti from '@/components/echart/BarMulti.vue'
import Line from '@/components/echart/Line.vue'
import { EconomyData } from './data.js'
import MapIndex from '@/components/map/xiantaoHot.vue'
// import MapIndex from '@/components/map/xiantaoHotSvgMap.vue'
export default defineComponent({
  name: 'XianTaoDetail',
  components: {
    ChartCard,
    Trend,
    Pie,
    PieLabel,
    LineCard,
    ChartCardIconBig,
    WordCard,
    BarMulti,
    Line,
    MapIndex,
    Card
  },
  beforeRouteUpdate(to, from, next) {
    if (to.fullPath != from.fullPath) {
      this.changeData(to.params.id)
      next()
    }
  },
  data() {
    return {
      line_02: [],
      menu: EconomyData,
      dataArray: {} as any
    }
  },
  mounted() {
    this.changeData(this.$route.params.id)
  },
  methods: {
    changeData(id) {
      this.dataArray = this.menu[id]
      this.formatData(this.dataArray)
    },
    formatData(data) {
      this.line_02 = [
        {
          id: '3',
          name: '仙桃市',
          icon: 'location-filled',
          value: data.location.value,
          unit: data.unit,
          up: data.location.rate
        },
        {
          id: '4',
          name: '湖北省',
          icon: 'flag',
          value: data.province.value,
          unit: data.unit,
          up: data.province.rate
        },
        {
          id: '5',
          name: '全国',
          icon: 'star-filled',
          value: data.contury.value,
          unit: data.unit,
          up: data.contury.rate
        }
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
</style>
