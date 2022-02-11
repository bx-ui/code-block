<template>
  <div class="home">
    <router-view />
  </div>
</template>

<style lang="scss">
  .home {
    width: 100%;
    height: 100%;
    transform-origin: left top;
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
  }
</style>
