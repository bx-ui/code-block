<template>
  <el-card class="box-card-deel" shadow="hover" :body-style="{ padding: '20px 24px 8px' }">
    <el-row>
      <el-col :span="8" class="icon-wrap">
        <el-icon :size="size" color="#85c7f1"><component :is="icon" /></el-icon>
      </el-col>
      <el-col :span="16">
        <div class="chart-card-header">
          <div class="meta">
            <span class="chart-card-title">
              <slot name="title">
                {{ title }}
              </slot>
            </span>
            <span class="chart-card-action">
              <slot name="action"></slot>
            </span>
          </div>
          <div class="total">
            <slot name="total">
              <div data-v-cc71486e="" class="el-statistic">
                <div class="el-statistic-content">
                  <span v-if="isRMB" class="el-statistic-content-prefix">
                    <span>￥</span>
                  </span>
                  <span class="el-statistic-content-value">
                    <span class="el-statistic-content-value-int">{{ data.totalPre }}</span>
                    <span v-if="precision" class="el-statistic-content-value-decimal">{{
                      data.dec
                    }}</span>
                    <span v-if="isRatio" class="el-statistic-content-value-decimal">%</span>
                    <span v-if="description !== ''" class="el-statistic-content-value-des">{{
                      description
                    }}</span>
                  </span>
                </div>
              </div>
            </slot>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="chart-card-content">
      <div class="content-fix">
        <slot></slot>
      </div>
    </div>
    <div class="chart-card-footer">
      <div class="field">
        <slot name="footer"></slot>
      </div>
    </div>
    <el-icon size="20" class="left_top bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="left_bottom bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="right_top bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="right_bottom bordericon"><arrow-left /></el-icon>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent, reactive, onMounted } from 'vue'
  export default defineComponent({
    name: 'ChartCardIcon',
    props: {
      title: {
        type: String,
        default: ''
      },
      total: {
        type: Number,
        required: false,
        default: 0
      },
      loading: {
        type: Boolean,
        default: false
      },
      isRMB: {
        type: Boolean,
        default: false
      },
      isRatio: {
        type: Boolean,
        default: false
      },
      precision: {
        type: Number,
        default: 0
      },
      description: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 55
      }
    },
    setup(props) {
      const data = reactive({
        totalPre: '',
        dec: ''
      })
      onMounted(() => {
        const n = props.total.toFixed(props.precision)
        const r = n.split('.')
        data.totalPre = r[0]
        data.dec = '.' + r[1]
      })

      return { data }
    },
    methods: {}
  })
</script>

<style lang="scss" scoped>
  .chart-card-header {
    position: relative;
    overflow: hidden;
    width: 100%;

    .meta {
      position: relative;
      overflow: hidden;
      width: 100%;
      color: #8daac2;
      font-size: 16px;
      line-height: 22px;
      .chart-card-title {
        color: #fff;
        font-weight: 600;
      }
    }
  }
  .chart-card-action {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  .chart-card-footer {
    border-top: 1px solid #e8e8e8;
    padding-top: 9px;
    margin-top: 8px;

    > * {
      position: relative;
    }

    .field {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0;
      font-size: 14px;
    }
  }

  .chart-card-content {
    margin-bottom: 12px;
    position: relative;
    max-height: 46px;
    min-height: 18px;
    width: 100%;

    .content-fix {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .total {
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    white-space: nowrap;
    color: #000;
    margin-top: 4px;
    margin-bottom: 0;
    font-size: 30px;
    line-height: 38px;
    height: 38px;
  }
  .el-statistic {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #ffff20;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';

    .el-statistic-content {
      color: #ffff20;
      font-size: 26px;
    }
    .el-statistic-content-value-int {
      font-weight: 700;
    }
    .el-statistic-content-prefix {
      display: inline-block;
      margin-right: 4px;
    }
    .el-statistic-content-value-decimal {
      font-size: 16px;
    }
    .el-statistic-content-value-des {
      font-size: 14px;
      margin-left: 5px;
    }
  }
  .icon-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    .el-icon {
      font-size: 55px;
    }
  }
</style>
