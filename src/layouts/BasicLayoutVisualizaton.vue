<template>
  <div
    class="industry-map custom-iview"
    ref="appRef"
  >
    <div class="tab-header">
      <Header />
    </div>
    <div
      class="screen-full"
      @click="toFullScreen"
    >
      <el-icon v-if="!isFull">
        <full-screen size="60" />
      </el-icon>
      <el-icon v-else>
        <rank size="60" />
      </el-icon>
    </div>
    <el-row class="menu_wrap">
      <el-col style="height: 100%">
        <div
          class="menu-box"
          :class="{ open: isOpen }"
        >
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
            <el-col
              :span="24"
              style="height: 100%"
            >
              <RouterView>
                <template #default="{ Component, route }">
                  <keep-alive>
                    <component
                      :is="Component"
                      :key="route.fullPath"
                    />
                  </keep-alive>
                </template>
              </RouterView>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  import useDraw from '@/utils/useDraw'
  import { formatTime } from '@/utils/index'
  import { WEEK } from '@/constant/index'
  import Header from '@/components/header/HeaderXiantao.vue'
  import screenfull from 'screenfull'

  export default defineComponent({
    name: 'BasicLayoutVisualizaton',
    components: { Header },
    setup() {
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

      // return
      return {
        timeInfo,
        appRef
      }
    },
    data() {
      return {
        isFull: false,
        isOpen: false,
        currentIndex: 0,
        menus: [
          { menusName: '驾驶舱', name: 'cockpit' },
          { menusName: '经济运行', name: 'run' },
          { menusName: '重点项目', name: 'project' }
          // { menusName: '园区', name: 'part' },
          // { menusName: '楼宇', name: 'building' },
          // { menusName: '土地', name: 'land' }
          // { menusName: '市州比对', name: 'compare' },
          // { menusName: '数据上传', name: 'upload' }
        ]
      }
    },
    mounted() {},
    methods: {
      openMenu: function () {
        this.isOpen = !this.isOpen
      },
      openMenuItem: function (i, index) {
        this.currentIndex = i
        this.isOpen = !this.isOpen
        this.$router.push({ name: index })
      },
      toFullScreen() {
        if (screenfull.isEnabled) {
          screenfull.toggle()
          screenfull.on('change', () => {
            if (screenfull.isFullscreen) {
              //全屏时，要执行的操作
              this.isFull = true
            } else {
              //取消全屏时，要执行的操作
              this.isFull = false
            }
          })
        }
      }
    }
  })
</script>
<style lang="scss" scoped>
.tab-header {
  flex-basis: 51px;
  flex-grow: 0;
  min-height: 51px;
  position: relative;
}
.industry-map {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: rgba(23, 35, 61, 0.75);
  letter-spacing: 0.86px;
  background-image: url('../assets/xiantaoImg/bgNone.png');
  background-size: cover;
  background-position: center center;
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
  // background-color: #093068;
}
.slide-stack-wrapper {
  height: 100%;
}
.base-content {
  height: 100%;
  padding: 0px 0 0 0;
}
.el-menu,
.tac {
  height: 100%;
  padding: 0 0px;
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
.screen-full {
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 9999;
  color: #60c5f2;
  width: 50px;
  height: 60px;
  text-align: center;
  .el-icon {
    font-size: 25px;
    font-weight: bold;
    vertical-align: middle;
    margin-top: 20px;
  }
}
</style>
