<template>
  <el-row :gutter="20" class="wrap">
    <el-col :span="16">
      <img src="../../../assets/detail_bg.jpg" class="imgBg" />
    </el-col>
    <el-col :span="8">
      <div class="main">
        <el-icon @click="pop" class="close-icon"><circle-close /></el-icon>
        <div class="main_title">{{ dataArray.project }}</div>
        <card :style="{ padding: '20px 24px', color: '#fff', fontSize: '14px' }">
          <el-row>
            <el-col :span="24">
              <div class="card-header">
                <span>项目基本信息</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="main-row">
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col><span>落户地:</span>{{ dataArray.name }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>建设性质:</span>{{ dataArray.build_type || '新建' }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>占地面积:</span>{{ dataArray.area || '-' }}亩</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>项目状态:</span>{{ dataArray.status || '可开工' }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col><span>产业类别:</span>{{ dataArray.type || '-' }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>投资额度:</span>{{ dataArray.totalInvestment }}万元</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>上会日期:</span>{{ dataArray.shTime || '-' }}</el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col><span>包联领导:</span>{{ dataArray.leader || '-' }}</el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row class="main-row">
            <el-col>
              <el-row :gutter="20">
                <el-col><span>责任单位:</span>{{ dataArray.company || '-' }}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </card>
        <card :style="{ padding: '20px 24px', color: '#fff', fontSize: '14px' }">
          <el-row>
            <el-col :span="24">
              <div class="card-header">
                <span>项目进展</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="main-row">
            <el-col :span="24">{{ dataArray.progress }}</el-col>
          </el-row>
        </card>
        <card :style="{ padding: '20px 24px', color: '#fff', fontSize: '14px' }">
          <el-row>
            <el-col :span="24">
              <div class="card-header">
                <span>项目主要建设内容</span>
              </div>
            </el-col>
          </el-row>
          <el-row class="main-row">
            <el-col :span="24">{{ dataArray.content }}</el-col>
          </el-row>
        </card>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { Card } from '@/components/echart/Charts'
  import { CircleClose } from '@element-plus/icons'
  import projectsCan from '@/components/map/xiantao_project_can.js'
  import projectsMeeting from '@/components/map/xiantao_project_meeting.js'
  export default defineComponent({
    components: { Card, CircleClose },
    // beforeRouteUpdate(to, from, next) {
    //   console.log(to.fullPath)
    //   if (to.fullPath != from.fullPath) {
    //     this.changeData(to.params.id)
    //     next()
    //   }
    // },
    data() {
      return {
        dataArray: {} as any
      }
    },
    // mounted() {
    //   this.changeData(this.$route.params.id)
    // },
    created() {
      this.changeData(this.$route.params)
    },
    methods: {
      pop() {
        this.$router.go(-1)
      },
      changeData(params) {
        let arr = []
        if (params.status == 4) {
          arr = projectsCan.details.filter(item => item.id == params.id)
        } else {
          // todo
          arr = projectsMeeting.details.filter(item => item.id == params.id)
          if (arr.length > 0) {
            arr[0].shTime = '2021.' + arr[0].shTime
            arr[0].totalInvestment = arr[0].totalInvestment * 10000
          }
        }
        if (arr.length > 0) {
          this.dataArray = arr[0]
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
  ::v-deep(.box-card-deel) {
    margin-bottom: 20px;
  }
  .wrap {
    position: relative;
    height: 100%;
    color: #fbf9f9;
    .imgBg {
      display: block;
      width: 100%;
      height: 100%;
    }
    .main {
      position: relative;
      background-color: #093068;
      padding: 30px 16px;
      height: 100%;
      .close-icon {
        font-size: 40px;
        // color: #fff;
        position: absolute;
        right: 31px;
        top: 25px;
        z-index: 1;
        cursor: pointer;
      }
      .main_title {
        text-align: left;
        font-size: 24px;
        display: block;
        line-height: 32px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .card-header {
        padding-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
      }
      .main-row {
        .el-row {
          padding: 5px 0;
          span {
            font-weight: bold;
            font-size: 16px;
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
