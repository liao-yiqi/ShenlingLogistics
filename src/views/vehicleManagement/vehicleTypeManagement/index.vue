<template>
  <el-table border :data="truckData">
    <el-table-column label="序号" sortable="" prop="truckTypeId" />
    <el-table-column label="姓名" sortable="" prop="truckTypeName" />
    <el-table-column label="工号" sortable="" prop="licensePlate" />
  </el-table>
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
        pageSize: 5
      },
      truckData: []
    }
  },
  async created() {
    const res = await vehiclePage(this.params)
    const result = res.data.data.items
    this.truckData = result
    console.log(res.data.data.items)
  }

}
</script>

<style>

</style>
