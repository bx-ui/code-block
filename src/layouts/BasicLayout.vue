<template>
  <div class="industry-map custom-iview" ref="appRef">
    <div class="tab-header">
      <Header />
    </div>
    <router-view />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from 'vue'
  import useDraw from '@/utils/useDraw'
  import { formatTime } from '@/utils/index'
  import { WEEK } from '@/constant/index'
  import Header from '@/components/header/Header.vue'

  export default defineComponent({
    name: 'BasicLayout',
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

      // return
      return {
        loading,
        timeInfo,
        appRef
      }
    },
    data() {
      return {}
    },
    methods: {}
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
</style>
