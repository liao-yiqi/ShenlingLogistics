<template>
  <div>
    车型管理
  </div>
</template>

<script>
import { vehiclePage } from '@/api/vehicle'
export default {
  data() {
    return {
      formData: {
        licensePlate: '',
        truckTypeId: '',
        workStatus: ''
      },
      params: {
        page: 1,
        pageSize: 10
      }
    }
  },
  async created() {
    const res = await vehiclePage(this.params)
    console.log(res)
  }

}
</script>

<style>

</style>
