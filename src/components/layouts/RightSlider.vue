<template>
  <div class="slide-stack-wrapper">
    <el-icon v-if="componentStack.length" @click="pop" :style="iconStyle" class="close-icon"
      ><circle-close
    /></el-icon>
    <div class="base-content">
      <slot></slot>
    </div>
    <transition-group :name="transitionName" tag="div" class="abc">
      <div v-for="item in componentStack" :key="item" class="slide-item">
        <slot :name="item"></slot>
      </div>
    </transition-group>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { CircleClose } from '@element-plus/icons'
  export default defineComponent({
    components: { CircleClose },
    props: {
      enterFrom: {
        type: String,
        default: 'right'
      },
      iconStyle: {
        type: Object,
        default: () => {}
      }
    },
    emits: ['pop', 'card'],
    data() {
      return {
        componentStack: []
      }
    },
    computed: {
      transitionName() {
        if (this.enterFrom == 'left') {
          return 'fade-from-left'
        } else {
          return 'fade-from-right'
        }
      }
    },
    watch: {
      componentStack: function (arr) {
        if (arr.length == 0) {
          this.$emit('card', true)
        } else {
          this.$emit('card', false)
        }
      }
    },
    methods: {
      push(key) {
        const i = this.componentStack.indexOf(key)
        if (i !== -1) {
          this.componentStack.splice(i, 1)
        }
        this.componentStack.push(key)
      },

      pop() {
        const item = this.componentStack.pop()
        this.$emit('pop', item)
      }
    }
  })
</script>
<style lang="scss">
  .slide-stack-wrapper {
    position: relative;
    overflow: hidden;
    height: 100%;
    box-shadow: 0 2px 8px 0 rgba(23, 35, 61, 0.25);
    .close-icon {
      font-size: 40px;
      // color: #fff;
      position: absolute;
      right: 31px;
      top: 25px;
      z-index: 1;
      cursor: pointer;
    }
    .base-content {
      // border: solid 1px green;
      height: 100%;
      width: 100%;
      position: absolute;
      overflow-y: auto;
    }
    .slide-item {
      background-color: #f1f2f4;
      // border: solid 1px green;
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0%;
      overflow-y: auto;
    }
    .fade-from-right-enter-active,
    .fade-from-right-leave-active {
      transition: left 0.5s;
    }
    .fade-from-right-leave-active {
      animation-name: none;
    }
    .fade-from-right-enter-active {
      left: 100%;
    }
    .fade-from-right-enter-to {
      left: 0%;
    }
    .fade-from-right-leave-to {
      left: 100%;
    }

    .fade-from-left-enter-active,
    .fade-from-left-leave-active {
      transition: left 0.5s;
    }
    .fade-from-left-leave-active {
      animation-name: none;
    }
    .fade-from-left-enter-active {
      left: -100%;
    }
    .fade-from-left-enter-to {
      left: 0%;
    }
    .fade-from-left-leave-to {
      left: -100%;
    }
  }
</style>
