<template>
  <div>
    <el-card>
      <div>头部</div>
    </el-card>

    <el-card>
      <el-table border :data="truckData">
        <el-table-column label="序号" />
        <el-table-column label="车型编号" prop="id" />
        <el-table-column label="车辆类型" prop="name" />
        <el-table-column label="车型数量" prop="num" />
        <el-table-column label="应载重量(吨)" prop="allowableLoad" />
        <el-table-column label="应载体积(立方米)" prop="allowableVolume" />
        <el-table-column label="长(米)" prop="measureLong" />
        <el-table-column label="宽(米)" prop="measureWidth" />
        <el-table-column label="高(米)" prop="measureHigh" />
        <el-table-column label="操作" fixed="right" width="280">
          <template>
            <el-button type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
      pageConfig: {
        page: 1,
        pageSize: 5
      },
      truckData: []
    }
  },
  async created() {
    const res = await vehiclePage(this.pageConfig)
    const result = res.data.data.items
    this.truckData = result
    console.log(res.data.data.items)
  }

}
</script>

<style>

</style>
