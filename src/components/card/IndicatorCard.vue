<template>
  <div class="showCard_box">
    <CardOutside class="showcard">
      <div class="card_title">
        <el-icon
          size="16"
          style="left: 10px; margin-bottom: 4px"
          class="left_left right titleicon_left"
          ><arrow-right
        /></el-icon>
        <el-icon size="16" style="margin-bottom: 4px" class="left_right left titleicon_left"
          ><arrow-right
        /></el-icon>
        <span class="title_text">{{ title }}</span>
        <el-icon size="16" class="right_left left titleicon"><arrow-right /></el-icon>
        <el-icon size="16" class="right_right right titleicon"><arrow-right /></el-icon>
      </div>
      <div style="text-align: center; color: rgba(133, 199, 241, 100)">{{ date }}</div>
      <div class="show_card_count_flex">
        <div class="show_card_count chanzhi">
          <div class="danwei" style="font-size: 15px">{{ title1 }}</div>
          <span class="show_count"
            ><div class="yellow">{{ num1 }}</div
            >{{ unit }}</span
          >
        </div>
        <div class="show_card_count tongbi">
          <div class="danwei">{{ title2 }}</div>
          <span class="show_count"
            ><img v-if="Number(percent) != 0" :src="Number(percent) > 0 ? up : down" alt="" />{{
              handlePercent
            }}{{ unit2 }}</span
          >
        </div>
      </div>
    </CardOutside>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  import CardOutside from '@/components/card/CardOutside.vue'
  import up from '@/assets/up'
  import down from '@/assets/down'
  import { ArrowLeft, ArrowRight } from '@element-plus/icons'

  export default defineComponent({
    name: 'IndicatorCard',
    components: {
      CardOutside,
      ArrowLeft,
      ArrowRight
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      date: {
        type: String,
        default: ''
      },
      title1: {
        type: String,
        default: ''
      },
      num1: {
        type: [String, Number],
        default: ''
      },
      unit: {
        type: String,
        default: ''
      },
      unit2: {
        type: String,
        default: '%'
      },
      title2: {
        type: String,
        default: ''
      },
      percent: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        up: up,
        down: down
      }
    },
    computed: {
      handlePercent() {
        return parseFloat(this.percent).toFixed(2)
      }
      //  handlePercent(){
      //     let a = parseFloat((this.percent*100).toFixed(10))
      //     return a
      // }
    }
  })
</script>
<style lang="scss" scoped>
  .showCard_box {
    width: calc((100% - 20px) / 3);
    height: 100px;

    & + .showCard_box {
      margin-left: 10px;
    }
    .showcard {
      height: 125px;
      margin: 32px 0;
      .card_title {
        width: 100%;
        text-align: center;
        // color: rgba(133, 199, 241, 1);
        color: #fff;
        font-weight: 600;
        .title_text {
          font-size: 22px;
        }
        .titleicon {
          transform: rotate(180deg);
          margin-bottom: 5px;
        }
        .titleicon_left {
          transform: rotate(0deg);
        }
        .left {
          color: #9acef7;
        }
        .right {
          color: #2d8fdb;
          position: relative;
          right: 10px;
        }
      }
      .show_card_count_flex {
        width: 100%;
        text-align: center;
        display: flex;
        .show_card_count {
          width: 50%;
          .danwei {
            color: rgba(133, 199, 241, 100);
          }
        }
        .show_count {
          font-size: 18px;
          color: rgba(133, 199, 241, 1);
          .yellow {
            display: inline-block;
            font-size: 24px;
            color: #ffff20;
            margin: 0 10px;
            font-weight: 600;
          }
        }
      }
    }
  }
  .tongbi {
    .danwei {
      margin-bottom: 5px;
    }
    .show_count {
      font-size: 18px;
      color: rgba(133, 199, 241, 1);
      position: relative;
      left: 10px;
      img {
        position: absolute;
        left: -16px;
        top: 5px;
        height: 20px;
      }
      .yellow {
        display: inline-block;
        font-size: 24px;
        color: #ffff20;
        margin: 0 10px;
        font-weight: 600;
      }
    }
  }
</style>
