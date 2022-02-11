<template>
  <div>
    <el-row :gutter="20" class="main-wrap">
      <el-col :span="20">
        <el-row :gutter="20" justify="space-between" class="first-line">
          <el-col
            :span="5"
            class="analysis-card"
            v-for="(item, index) in line_01"
            :index="item.id"
            :key="index"
          >
            <chart-card-icon-big-simple
              :title="item.name"
              :isRMB="false"
              :precision="0"
              :total="item.value"
              :description="item.unit"
              :icon="item.icon"
            />
          </el-col>
        </el-row>
        <el-row :gutter="20" class="second-line">
          <el-col class="slider" :span="38">
            <el-row class="margin-bottom">
              <el-col>
                <card>
                  <el-row>
                    <el-col :span="24">
                      <div class="card-header">
                        <span>2021年1-11月全市招商引资上会项目进展情况</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row class="slider-flex-content">
                    <el-col :span="8">
                      <span class="title">总项目数</span>
                      <span>136个</span>
                    </el-col>
                    <el-col :span="8">
                      <span class="title">投资总额</span>
                      <span>235.1亿</span>
                    </el-col>
                    <el-col :span="8">
                      <span class="title">占地总面积</span>
                      <span>4709亩</span>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="slider-flex-content">
                    <el-col :span="8">
                      <pie
                        :data="projectProgress.num"
                        :radius="['0', '85%']"
                        position="inside"
                        unit="个"
                        :center="['50%', '50%']"
                        :style="{ height: '200px' }"
                      />
                    </el-col>
                    <el-col :span="8">
                      <pie
                        :data="projectProgress.price"
                        :radius="['0', '85%']"
                        position="inside"
                        unit="亿"
                        :center="['50%', '50%']"
                        :style="{ height: '200px' }"
                      />
                    </el-col>
                    <el-col :span="8">
                      <pie
                        :data="projectProgress.area"
                        :radius="['0', '85%']"
                        position="inside"
                        unit="亩"
                        :center="['50%', '50%']"
                        :style="{ height: '200px' }"
                      />
                    </el-col>
                  </el-row>
                  <el-row class="pie-bottom">
                    <el-col :span="6"><span class="color1"></span>已开工</el-col>
                    <el-col :span="6"><span class="color2"></span>已完工</el-col>
                    <el-col :span="6"><span class="color3"></span>未开工</el-col>
                    <el-col :span="6"><span class="color4"></span>已终止</el-col>
                  </el-row>
                </card>
              </el-col>
            </el-row>
            <el-row class="margin-bottom">
              <el-col>
                <card>
                  <el-row>
                    <el-col :span="24">
                      <div class="card-header">
                        <span>2021年1-11月全市招商引资上会项目产业分类占比</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20" class="slider-flex-content">
                    <pie-legend
                      :data="productRate"
                      :radius="['65%', '85%']"
                      position="center"
                      unit="个"
                      legend
                      :center="['22%', '50%']"
                      :style="{ width: '100%', height: '230px' }"
                    />
                  </el-row>
                </card>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="margin-bottom">
              <el-col :span="24">
                <card :style="{ padding: '20px 24px' }">
                  <el-row>
                    <el-col :span="24">
                      <div class="card-header">
                        <span>2021年1-11月全市招商引资上会日期情况分析</span>
                      </div>
                    </el-col>
                  </el-row>
                  <Line
                    style="height: 160px"
                    :line1DataName="productDate.name"
                    yAxisName="单位(个)"
                    lineColor="#BFBEBE"
                    :data="productDate.data"
                  />
                </card>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="main" :span="48">
            <el-row :gutter="20" style="height: 475px; margin-bottom: 20px">
              <el-col style="height: 100%">
                <el-row class="map-select">
                  <el-col :span="12">
                    <el-select
                      class="select-wrap"
                      style="width: 100px"
                      v-model="selectStatus"
                      placeholder="Select"
                      :popper-append-to-body="false"
                      @change="selectChange"
                    >
                      <el-option
                        v-for="item in optionsStatus"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-select
                      v-show="isTypeShow"
                      class="select-wrap"
                      style="width: 280px"
                      v-model="selectValue"
                      placeholder="Select"
                      :popper-append-to-body="false"
                      @change="selectChangeType"
                    >
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                </el-row>
                <div class="map-refresh" @click="refreshMap">
                  <el-icon size="20" color="#fff" class="refresh"><refresh /></el-icon>
                </div>
                <div class="map_wrap"
                  ><map-index ref="mapRef" :status="selectStatus" :type="selectValue"
                /></div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="middle-wrap">
              <card :style="{ padding: '20px 24px' }">
                <el-row>
                  <el-col :span="24">
                    <div class="card-header">
                      <span>2021年1-11月全市招商引资上会项目落户地</span>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <bar-stacked
                      :style="{ height: '290px' }"
                      :valueData="gyzjzRate.up.value"
                      :cateData="gyzjzRate.up.cate"
                      legend
                      lineColor="#BFBEBE"
                      :data="stackedData"
                    />
                  </el-col>
                </el-row>
              </card>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="32">
        <el-row class="margin-bottom">
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
        <el-row :gutter="20" class="margin-bottom">
          <el-col :span="24">
            <card :style="{ padding: '20px 24px' }">
              <el-row>
                <el-col :span="24">
                  <div class="card-header">
                    <span>乡镇春节前后可完工及可开工项目</span>
                  </div>
                </el-col>
              </el-row>
              <bar-right-two
                style="height: 480px"
                lineColor="#BFBEBE"
                :data="chunJieQianData"
                legend
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
  import MapIndex from '@/components/map/xiantaoHotSvgMapCoor.vue'
  import {
    ChartCardIconBigSimple,
    Trend,
    Pie,
    PieLabel,
    LineCard,
    WordCard,
    Card,
    PieLegend,
    BarStacked,
    BarRightTwo
  } from '@/components/echart/Charts'
  import { ChartCard } from '@/components/echart/Xiantao'
  import BarLineTwo from '@/components/echart/BarLineTwo.vue'
  import BarLine from '@/components/echart/BarLine.vue'
  import BarHorizontal from '@/components/echart/BarHorizontal.vue'
  import BarMultiMore from '@/components/echart/BarMultiMore.vue'
  import LineTwo from '@/components/echart/LineTwo.vue'
  import Line from '@/components/echart/Line.vue'
  export default defineComponent({
    components: {
      Trend,
      Pie,
      PieLabel,
      PieLegend,
      LineCard,
      ChartCardIconBigSimple,
      WordCard,
      BarLineTwo,
      BarLine,
      Card,
      ChartCard,
      MapIndex,
      BarHorizontal,
      BarMultiMore,
      LineTwo,
      Line,
      BarStacked,
      BarRightTwo
    },
    data() {
      return {
        cardLoading: false,
        isTypeShow: true,
        line_01: [
          {
            id: '1',
            name: '上会项目',
            time: '',
            icon: 'view',
            value: 136,
            unit: ''
          },
          {
            id: '2',
            name: '已开工项目',
            time: '',
            icon: 'shopping-bag',
            value: 23,
            unit: ''
          },
          {
            id: '3',
            name: '已完工项目',
            time: '',
            icon: 'trend-charts',
            value: 29,
            unit: ''
          },
          {
            id: '4',
            name: '未开工项目',
            time: '',
            icon: 'magic-stick',
            value: 66,
            unit: ''
          },
          {
            id: '5',
            name: '已终止项目',
            time: '',
            icon: 'lollipop',
            value: 18,
            unit: ''
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
            value: [24.4, 20.6, 19.9, 17.3, 8.3],
            cate: ['毛嘴1', '剅河2', '沙原3', '郑场4', '干河5']
          },
          down: {
            value: [50.7, 34, 29.6, 21.6, 10.4],
            cate: ['1彭场', '2长埫口', '3沙嘴', '4龙华山', '5西流河']
          }
        },
        shiZhou: [
          [
            '武汉市',
            '黄石市',
            '十堰市',
            '宜昌市',
            '襄阳市',
            '鄂州市',
            '荆门市',
            '孝感市',
            ' 荆州市',
            '黄冈市',
            '咸宁市',
            '随州市',
            '恩施州',
            '仙桃市',
            '潜江市',
            '天门市',
            '神农架'
          ],
          [
            12317.73, 1304.21, 1497.12, 3456.63, 3674.39, 830.52, 1447.92, 1867.53, 1894.1, 1742.47,
            1239.91, 915.59, 924.8, 602.85, 638.63, 501.12, 25.02
          ]
        ],
        projectProgress: {
          num: [
            { value: 23, name: '已开工' },
            { value: 29, name: '已完工' },
            { value: 66, name: '未开工' },
            { value: 18, name: '已终止' }
          ],
          price: [
            { value: 101.14, name: '已开工' },
            { value: 18.18, name: '已完工' },
            { value: 235.06, name: '未开工' },
            { value: 54.9, name: '已终止' }
          ],
          area: [
            { value: 1508, name: '已开工' },
            { value: 162.09, name: '已完工' },
            { value: 4708.76, name: '未开工' },
            { value: 1763, name: '已终止' }
          ]
        },
        productRate: [
          { value: 3, name: '电子信息技术' },
          { value: 50, name: '非织造布' },
          { value: 10, name: '服装加工' },
          { value: 1, name: '生物医药' },
          { value: 9, name: '食品加工' },
          { value: 15, name: '现代服务业' },
          { value: 26, name: '新能源新材料' },
          { value: 19, name: '智能装备制造' },
          { value: 3, name: '其他' }
        ],
        productDate: {
          name: '2021年',
          data: [
            ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            [16, 12, 0, 11, 35, 37, 0, 0, 0, 17, 8, 0]
          ]
        },
        stackedData: {
          stack: 'open',
          list: [
            '陈场镇',
            '干河街道',
            '郭河镇',
            '胡场镇',
            '九合垸原种场',
            '龙华山街道',
            '剅河镇',
            '毛嘴镇',
            '沔城回族镇',
            '排湖风景区',
            '彭场镇',
            '三伏潭镇',
            '沙湖原种场',
            '沙湖镇',
            '沙嘴街道',
            '通海口镇',
            '西流河镇',
            '仙桃高新区',
            '仙桃工业园',
            '杨林尾镇',
            '张沟镇',
            '长埫口镇',
            '郑场镇'
          ],
          data: [
            {
              name: '已开工',
              data: [1, 4, 0, 1, 1, 3, 0, 4, 0, 0, 0, 1, 0, 0, 4, 0, 0, 1, 0, 3, 0, 0, 0]
            },
            {
              name: '未开工',
              data: [1, 4, 3, 6, 0, 7, 1, 4, 1, 0, 10, 1, 1, 1, 1, 2, 3, 10, 6, 1, 2, 1, 0]
            },
            {
              name: '已完工',
              data: [2, 0, 4, 0, 1, 0, 2, 0, 1, 1, 3, 1, 1, 3, 3, 0, 0, 0, 1, 4, 0, 0, 2]
            },
            {
              name: '已终止',
              data: [4, 0, 4, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0]
            }
          ]
        },
        chunJieQianData: {
          list: [
            '郭河镇',
            '工业园',
            '三伏潭镇',
            '彭场镇',
            '沙嘴',
            '毛嘴镇',
            '通海口镇',
            '龙华山',
            '胡场镇',
            '张沟镇',
            '西流河镇',
            '陈场镇',
            '沙湖镇',
            '杨林尾镇',
            '排湖',
            '九合垸',
            '郑场镇',
            '沔城镇',
            '长埫口镇',
            '干河	沙原',
            '剅河镇',
            '高新区'
          ],
          data: [
            {
              name: '可完工',
              data: [8, 8, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 0, 0]
            },
            {
              name: '可开工',
              data: [11, 14, 3, 12, 6, 8, 1, 6, 6, 6, 3, 1, 6, 3, 3, 1, 3, 1, 3, 2, 0, 5, 6]
            }
          ]
        },
        renKouData: [
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-45.0, -28.1, -19.8, -16.1, -12.6, -9.9, -8.3, -5.9, -5.6, -4.3, -3.8],
              [66.5, 13.7, -6.1, -15.4, -13.5, -15.9, -18.3, -20.0, -16.0]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-49.7, -42.7, -29.4, -19.0, -12.3, -10.3, -3.8, -2.5, 0.5, 3.7, 0.8],
              [77.0, 80.4, 50.3, 34.5, 26.0, 21.1, 17.2, 17.6, 16.3]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-86.3, -83.0, -75.4, -66.9, -58.2, -50.4, -39.8, -33.5, -28.8, -26.3, -37.2],
              [263.8, 166.0, 109.5, 92.2, 51.5, 56.1, 38.2, 27.6, 24.0]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [-42.5, -59.1, -24.5, -21.5, -20.9, -9.3, -6.3, -3.5, -3.8, -4.6, -7.7],
              [215.8, 178.6, 65.7, 59.6, 46.1, 32.6, 28.9, 26.2, 21.1]
            ]
          },
          {
            name1: '2020年',
            name2: '2021年',
            data: [
              ['2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              [36.5, 56.1, 80.2, 111.6, 145.5, 178.4, 212.4, 250.6, 292.8, 335.4, 381.9],
              [54.1, 80.5, 108.9, 146.5, 189.0, 230.5, 272.6, 316.0, 367.47]
            ]
          }
        ],
        selectValue: 0,
        options: [
          {
            value: 0,
            label: '新能源材料'
          },
          {
            value: 1,
            label: '食品加工'
          },
          {
            value: 2,
            label: '非织造布'
          },
          {
            value: 3,
            label: '服装加工'
          },
          {
            value: 4,
            label: '智能装备制造'
          }
        ],
        selectStatus: 0,
        optionsStatus: [
          {
            value: 0,
            label: '已开工'
          },
          {
            value: 1,
            label: '已完工'
          },
          {
            value: 2,
            label: '未开工'
          },
          {
            value: 3,
            label: '已终止'
          },
          {
            value: 4,
            label: '可开工'
          }
        ],
        tabPosition: 'province'
      }
    },
    methods: {
      selectChange(value) {
        this.isTypeShow = value != 4
        this.$refs['mapRef'].initChart(value, this.selectValue)
      },
      selectChangeType(value) {
        this.$refs['mapRef'].initChart(this.selectStatus, value)
      },
      refreshMap() {
        this.$refs['mapRef'].resize(this.selectStatus, this.selectValue)
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
  .main-wrap {
    .el-col-20 {
      width: 71.42%;
      flex: 0 0 71.42%;
    }
    .el-col-32 {
      width: 28.58%;
      flex: 0 0 28.58%;
    }
  }
  .first-line {
    .el-col-5 {
      width: 20%;
      flex: 0 0 20%;
    }
  }
  .second-line {
    .slider.el-col-38 {
      max-width: 44%;
      width: 40%;
      flex: 0 0 40%;
    }
    .main.el-col-48 {
      width: 60%;
      flex: 0 0 60%;
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
      font-size: 14px;
      font-weight: bold;
      margin-right: 10px;
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
    color: #000;
  }
  .select-type-show {
    transition: all 1s ease-in;
  }
  .map-select {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    width: 80%;
    justify-content: end;
    text-align: right;
    transition: all 1s ease-in;
  }
  .map-refresh {
    position: absolute;
    top: 0;
    left: 10;
    z-index: 99;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    .refresh {
      margin: 0 auto;
      line-height: 40px;
    }
  }
  .map_wrap {
    height: 475px;
  }
  .map_wrap.active {
    display: block;
  }
  .pie-bottom {
    width: 70%;
    color: #fff;
    position: absolute;
    bottom: 15px;
    left: 25px;
    text-align: center;
    span {
      display: inline-block;
      width: 30px;
      height: 16px;
      border-radius: 5px;
      margin-right: 5px;
      vertical-align: middle;
    }
    .color1 {
      background-color: #6ce0e2;
    }
    .color2 {
      background-color: #feda66;
    }
    .color3 {
      background-color: #3ea3d8;
    }
    .color4 {
      background-color: #3dc5e7;
    }
  }
  .margin-bottom {
    margin-bottom: 20px;
  }
</style>
