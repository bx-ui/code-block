<template>
  <div class="yuanqu-main">
    <EnterpriseProfile :dataQiYe="enterpriseProfileData" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import EnterpriseProfile from '@/components/chanye/EnterpriseProfile.vue'
  import { EnterpriseList } from '@/api/big'
  // import { EnterpriseProfileData } from '@/components/demoData.js'
  // import * as api from '../../../api/buju'
  export default defineComponent({
    components: {
      EnterpriseProfile
    },
    props: {
      creditCode: {
        type: String,
        default: ''
      },
      enterpriseProfileData: {
        type: Object,
        default: {} as EnterpriseList
      }
    },
    data() {
      return {}
    }
    // watch: {
    //   enterpriseProfileData: {
    //     handler() {
    //       console.log(this.enterpriseProfileData)
    //     },
    //     immediate: true
    //   }
    // }
  })
</script>
