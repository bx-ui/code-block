<template>
  <div class="industry-map custom-iview" ref="appRef">
    <div class="tab-header">
      <Header />
    </div>
    <el-row class="menu_wrap">
      <el-col style="height: 100%">
        <div class="menu-box" :class="{ open: isOpen }">
          <div class="menuList">
            <div
              class="menuLi"
              v-for="(item, i) in menus"
              @click="openMenuItem(i, item.name)"
              :class="{ active: currentIndex == i }"
              :key="item.menusName"
            >
              {{ item.menusName }}
            </div>
          </div>
        </div>
        <div
          class="menuBtn defelement"
          droppable="true"
          wid="elem"
          @click="openMenu()"
          :class="{ open: isOpen }"
        ></div>
      </el-col>
    </el-row>
    <div class="tab-content">
      <div class="slide-stack-wrapper">
        <div class="base-content">
          <el-row class="tac">
            <el-col :span="4" style="height: 100%">
              <el-row>
                <el-col :span="23">
                  <el-input
                    class="menu-input"
                    v-model="filterText"
                    placeholder="指标检索"
                    prefix-icon="search"
                    clearable
                    @input="handleInput"
                  />
                </el-col>
              </el-row>
              <el-scrollbar class="menu-wrap left" :always="false">
                <el-menu
                  class="el-menu-vertical"
                  background-color="none"
                  text-color="#fff"
                  :default-openeds="['1000']"
                  :default-active="cruMenu"
                  @select="handleSelect"
                >
                  <el-menu-item index="0">
                    <el-icon><wind-power /></el-icon>
                    <span>数据总览</span>
                  </el-menu-item>
                  <el-sub-menu index="1000">
                    <template #title>
                      <el-icon><help-filled /></el-icon>
                      <span>主要经济指标</span>
                    </template>
                    <el-menu-item v-for="(item, index) in menu" :index="item.id" :key="index">
                      <el-icon><component :is="item.icon" /></el-icon>
                      <span>{{ item.name }}</span>
                    </el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="2000">
                    <template #title>
                      <el-icon><list /></el-icon>
                      <span>产业指标</span>
                    </template>
                  </el-sub-menu>
                </el-menu>
              </el-scrollbar>
            </el-col>
            <el-col :span="20" style="height: 100%">
              <el-scrollbar class="menu-wrap content-right"><router-view /> </el-scrollbar>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  import useDraw from '@/utils/useDraw'
  import { formatTime } from '@/utils/index'
  import { WEEK } from '@/constant/index'
  import Header from '@/components/header/HeaderXiantao.vue'

  export default defineComponent({
    name: 'BasicMenuLayout',
    components: { Header },
    setup() {
      // * 加载标识
      const loading = ref<boolean>(true)
      // * 时间内容
      const timeInfo = reactive({
        setInterval: 0,
        dateDay: '',
        dateYear: '',
        dateWeek: ''
      })
      // * 适配处理
      const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw()
      // 生命周期
      onMounted(() => {
        handleTime()
        // todo 屏幕适应
        windowDraw()
        calcRate()
      })

      onBeforeUnmount(() => {
        unWindowDraw()
        clearInterval(timeInfo.setInterval)
      })

      // todo 处理时间监听
      const handleTime = () => {
        timeInfo.setInterval = window.setInterval(() => {
          const date = new Date()
          timeInfo.dateDay = formatTime(date, 'HH: mm: ss')
          timeInfo.dateYear = formatTime(date, 'yyyy-MM-dd')
          timeInfo.dateWeek = WEEK[date.getDay()]
        }, 1000)
      }

      const handleOpen = (key, keyPath) => {
        console.log(key, keyPath)
      }
      const handleClose = (key, keyPath) => {
        console.log(key, keyPath)
      }

      // return
      return {
        loading,
        timeInfo,
        appRef,
        handleOpen,
        handleClose
      }
    },
    data() {
      return {
        isOpen: false,
        currentIndex: 1,
        menus: [
          { menusName: '驾驶舱', name: 'cockpit' },
          { menusName: '经济运行', name: 'run' },
          { menusName: '重点项目', name: 'project' }
          // { menusName: '市州比对', name: 'compare' },
          // { menusName: '数据上传', name: 'upload' }
        ],
        cruMenu: '0',
        filterText: '',
        menuBak: [],
        menu: [
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
        ]
      }
    },
    // computed: {
    //   key() {
    //     return this.$route.fullPath
    //   }
    // },
    mounted() {
      if (this.$route.params.id) {
        this.cruMenu = this.$route.params.id
      }
      this.menuBak = JSON.parse(JSON.stringify(this.menu))
    },
    methods: {
      handleSelect(key) {
        if (key === '0') {
          this.$router.push({ name: 'run' })
        } else {
          // this.$router.push(`/jinji/detail/${key}`)
          this.$router.push({ name: 'xiantaoDetail', params: { id: key } })
        }
      },
      handleInput(value) {
        console.log('input', typeof value, value, value === '')
        if (value === '') {
          this.menu = this.menuBak
          return false
        }
        this.menu = this.menu.filter(item => {
          console.log(item, item.name.indexOf(value))
          return item.name.indexOf(value) >= 0
        })
      },
      openMenu: function () {
        this.isOpen = !this.isOpen
      },
      openMenuItem: function (i, index) {
        this.currentIndex = i
        this.isOpen = !this.isOpen
        this.$router.push({ name: index })
      }
    }
  })
</script>
<style lang="scss" scoped>
  .tab-header {
    flex-basis: 51px;
    flex-grow: 0;
    min-height: 51px;
  }
  .industry-map {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #f1f2f4;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: rgba(23, 35, 61, 0.75);
    letter-spacing: 0.86px;
  }
  ::v-deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
    height: 100%;
  }
  .content-right ::v-deep(.el-scrollbar__view) {
    height: 100%;
  }
  ::v-deep(.is-horizontal) {
    display: none !important;
  }
  .tab-content {
    overflow: hidden;
    background-color: #093068;
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
    border: none;
  }
  .el-menu-vertical {
    .el-menu-item {
      font-size: 16px !important;
    }
  }
  .menu-wrap.left {
    height: calc(100% - 20px);
    // background-color: #00c6e0;
  }
  .content-right {
    padding: 20px 30px 0 20px;
    height: calc(100% - 0px);
  }
  .menu-input {
    input {
      background-color: transparent;
      color: #fff;
      font-size: 16px;
      border-bottom: 1px solid #2480b4;
      height: 35px;
      line-height: 35px;
    }
  }
  ::v-deep(.el-input__inner) {
    background-color: transparent !important;
    border: none;
    color: #fff;
    font-size: 16px;
    border-bottom: 1px solid #2480b4;
    height: 35px;
    line-height: 35px;
  }
  ::v-deep(.el-scrollbar__view) {
    height: 100%;
  }

  .menu_wrap {
    position: absolute;
    top: 0;
    left: 0;
    background-repeat: no-repeat;
    height: calc(100%);
    .defelement {
      position: absolute;
      padding: 0;
      margin: 0;
      overflow: hidden;
    }
    .menuBtn {
      border-radius: 50%;
      z-index: 9998;
      cursor: pointer;
      background: transparent url('../assets/xiantaoImg/button.png') no-repeat 50% 50%;
      top: 10px;
      width: 42px;
      height: 45px;
      left: 8px;
      transition: 0.5s;
      &.open {
        transform: rotate(180deg);
      }
    }
    .menu-box {
      width: 260px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: url('../assets/xiantaoImg/menu.png') no-repeat;
      transform: translate(-100%, 0);
      transition: 0.5s;
      z-index: 9997;
      &.open {
        transform: translate(0, 0);
      }
      & > .menuList {
        text-align: right;
        width: 68%;
        color: white;
        height: 60%;
        top: 20%;
        position: absolute;
        & > div {
          height: 60px;
          margin-bottom: 30px;
          line-height: 60px;
          font-size: 22px;
          padding-right: 20px;
          cursor: pointer;
          &.active {
            border: 3px solid red;
            border-image: linear-gradient(270deg, rgb(105, 211, 251), rgb(9, 111, 221)) 1 1 round;
            background: linear-gradient(45deg, #064d9d, #458fb6);
            border-left: none;
          }
        }
      }
    }
  }
</style>
