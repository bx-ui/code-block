<template>
  <el-card class="box-card-deel" shadow="hover" :body-style="style" :bordered="false">
    <slot></slot>
    <el-icon size="20" class="left_top bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="left_bottom bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="right_top bordericon"><arrow-left /></el-icon>
    <el-icon size="20" class="right_bottom bordericon"><arrow-left /></el-icon>
  </el-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'ChartCardIcon',
    props: {
      title: {
        type: String,
        default: ''
      },
      style: {
        type: Object,
        default: () => {
          return { padding: '20px 24px 8px' }
        }
      },
      description: {
        type: String,
        default: ''
      }
    },
    methods: {}
  })
</script>

<style lang="scss" scoped></style>
