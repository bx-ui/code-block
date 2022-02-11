<template>
  <div class="header-wrapper">
    <div class="ivu-menu ivu-menu-light ivu-menu-horizontal clearfix">
      <div class="munesLeft">
        <div class="menu"></div>
        <div class="menu" @click="goToIndex">整体概况</div>
        <div class="menu" @click="goToChanye">产业全景</div>
      </div>
      <div class="menusRight">
        <div class="menu">
          <div class="menu" @click="goToXiantao">主要经济指标</div>
        </div>
      </div>
    </div>
    <div class="logo-title" @click="tab_change_shouye">
      <div class="pointBox pointBox1">
        <span class="point point1"></span>
        <span class="point point2"></span>
        <span class="point point3"></span>
      </div>
      <span @click="goToIndex">沔古脑.经济大脑</span>
      <div class="pointBox pointBox2">
        <span class="point point3"></span>
        <span class="point point2"></span>
        <span class="point point1"></span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'Header',
    props: [],
    emits: ['ToShouYe'],
    data() {
      return {}
    },
    methods: {
      tab_change_shouye() {
        this.$emit('ToShouYe')
      },
      goToIndex() {
        this.$router.push({ name: 'cockpit' })
      },
      goToChanye() {
        this.$router.push({ name: 'chanye' })
      },
      goToXiantao() {
        this.$router.push({ name: 'xiantao' })
      }
    }
  })
</script>
<style lang="scss" scoped>
  a {
    color: #fff;
  }
  .header-wrapper {
    width: 100%;
    background: url('../../assets/header.png') no-repeat;
    background-size: 100%100%;
    height: 90px;
    padding-left: 2px;
    position: absolute;
    z-index: 101;
    width: 100%;
    .menusRight {
      float: right;
      width: 45%;
      padding-left: 220px;
      padding-right: 40px;
      display: flex;
      cursor: pointer;
    }
    .munesLeft {
      width: 40%;
      padding-right: 90px;
      display: flex;
      float: left;
      .menu {
        flex: auto;
        cursor: pointer;
      }
    }
    .logo-title {
      line-height: 90px;
      width: 520px;
      text-align: center;
      margin: auto;
      font-size: 30px;
      color: #fff;
      letter-spacing: 2px;
      // line-height: 40px;
      font-weight: 600;
      position: absolute;
      top: -6px;
      cursor: pointer;
      right: calc(50% - 220px);
      pointer-events: all;
    }
    .menu-list {
      font-size: 18px;
      color: #ffffff;
      opacity: 0.9;
      pointer-events: all;
      list-style: none;
      height: 70px;
      .menu-item {
        margin: 0 22px;
        display: inline-block;
        height: 70px;
        text-align: center;
        line-height: 70px;
        font-weight: bold;
        position: relative;
        cursor: pointer;
        .title {
          position: relative;
          z-index: 2;
          opacity: 0.9;
        }
        &.current {
          .title {
            position: relative;
            z-index: 2;
            opacity: 1;
          }
          opacity: 1;
          &:before {
            position: absolute;
            content: '';
            left: calc(50% - 20px);
            top: 53px;
            height: 2px;
            width: 40px;
            background: #fff;
          }
        }
      }
    }
    .btn {
      height: 30px;
      line-height: 30px;
      width: 70px;
      border: 1px solid rgba(255, 255, 255, 0.9);
      border-radius: 30px;
      color: rgba(255, 255, 255, 0.9);
      margin-right: 24px;
      position: absolute;
      right: 0px;
      top: calc(50% - 27px);
      text-align: center;
      pointer-events: all;
      cursor: pointer;
      transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear,
        box-shadow 0.2s linear;
    }
    .btn:hover {
      color: rgba(255, 255, 255, 1);
      // color: #5cadff;
      // background-color: #fff;
      border-color: rgba(255, 255, 255, 1);
    }
  }
  .menu {
    flex: auto;
    color: #fff;
  }
  .pointBox2,
  .pointBox1 {
    // right: 12px;
    right: 80px;
    bottom: 40px;
    pointer-events: none;
  }
  .pointBox1 {
    // left: 12px;
    left: 80px;
  }
  .pointBox {
    position: absolute;
    display: flex;
    align-items: center;
    height: 8px;
    .point {
      // background: red;
      background: rgb(113, 128, 162);
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin: 0 5px;
    }
    .point2 {
      width: 6px;
      margin-bottom: 2px;
      height: 6px;
    }
    .point1 {
      width: 4px;
      height: 3px;
      margin-bottom: 2px;
      border-radius: 4px;
    }
  }
</style>
<style lang="scss">
  .header-wrapper {
    // pointer-events: all;
    .ivu-menu-light {
      background: transparent;
    }
    .ivu-menu {
      font-size: 18px;
    }
    .ivu-menu-item {
      pointer-events: all;
      color: #fff !important;
      padding: 0px !important;
      font-size: 18px !important;
      margin: 5px 3px;
    }
    .ivu-menu-light:after {
      height: 0px !important;
    }
    .ivu-menu-horizontal {
      line-height: 55px;
    }
    .ivu-menu-item-selected {
      border-bottom: 3px solid #fff !important;
    }
    .ivu-menu-item:hover {
      border-bottom: 3px solid #fff !important;
    }
    .ivu-menu-submenu:hover {
      border-bottom: 3px solid #fff !important;
    }
    .ivu-select-dropdown {
      background: #333;
      text-align: center;
      padding: 0 5px;
      padding-top: 10px;
      .ivu-menu-item {
        font-size: 18px !important;
      }
    }
    .ivu-menu-item-group-title {
      height: 0px;
    }

    .ivu-menu-item-group {
      .ivu-menu-item {
        border-bottom: 0px solid #fff !important;
        background: #333 !important;
      }
      .ivu-menu-item-active {
        border: 0px !important;
      }
    }
  }
  .submenu {
    .ivu-menu-item {
      height: 35px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .header-wrapper {
    .ivu-menu-horizontal {
      //line-height: 55px;
      .ivu-menu-submenu {
        .ivu-menu-item {
          font-size: 18px !important;
        }
      }
    }
  }
</style>
