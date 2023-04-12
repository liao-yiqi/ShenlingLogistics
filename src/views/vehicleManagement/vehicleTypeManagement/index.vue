<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-card>
        <div>
          <el-form ref="form" :model="formData" label-width="120px">
            <el-row type="flex">
              <el-form-item label="车型编号">
                <el-input
                  v-model="formData.id"
                  placeholder="请输入车型编号"
                />
              </el-form-item>
              <el-form-item label="应载重量" placeholder="请选择应载重量">
                <el-select v-model="formData.allowableLoad">
                  <el-option />
                </el-select>
              </el-form-item>
              <el-form-item label="应载体积">
                <el-select
                  v-model="formData.allowableVolume"
                  placeholder="请选择应载体积"
                >
                  <el-option />
                </el-select>
              </el-form-item>
            </el-row>
            <el-row type="flex">
              <el-form-item label="车型类型">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入车型类型"
                />
              </el-form-item>
              <el-form-item>
                <el-button style="background-color:#e15536 ;color:#fff">搜索</el-button>
                <el-button>重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>

        </div>
      </el-card>
      <!-- 列表 -->
      <el-card style="margin-top: 20px">
        <el-button
          style="background-color:#e15536;color:#fff"
          @click="dialogVisible = true"
        >新增车型</el-button>
        <el-table
          v-loading="loading"
          :data="truckData"
          :header-cell-style="{ background: '#f8faff' }"
          style="
          width: 100%;
          font-size: 12px;
          border: 1px solid #ebeef5;
          margin-top: 20px;
        "
          stripe
        >
          <el-table-column label="序号" type="index" width="50px" />
          <el-table-column label="车型编号" prop="id" width="150px" />
          <el-table-column label="车辆类型" prop="name" width="130px" />
          <el-table-column label="车型数量" prop="num" />
          <el-table-column
            label="应载重量（吨）"
            prop="allowableLoad"
            width="140px"
          />
          <el-table-column
            label="应载体积（立方米）"
            prop="allowableVolume"
            width="170px"
          />
          <el-table-column label="长（米）" prop="measureLong" />
          <el-table-column label="宽（米）" prop="measureWidth" />
          <el-table-column label="高（米）" prop="measureHigh" />
          <el-table-column label="操作" fixed="right" width="100px">
            <template>
              <el-button
                size="mini"
                type="text"
                style="color: #409eff"
              >编辑</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <el-button
                size="mini"
                type="text"
                style="color:#e15536"
              >删除</el-button>
            </template>
          </el-table-column>
          <!-- 没数据的时候显示 插槽 -->
          <div slot="empty" class="nodata" style="width: 534px; height: 320px">
            <img
              src="https://slwl-admin.itheima.net/static/img/icon-empty.3abd3b9a.png"
              style="width: 336px; height: 232px"
            >
            <p>没有找到您要的内容哦~</p>
          </div>
        </el-table>

        <el-row type="flex" justify="center">
          <el-pagination
            style="margin-top: 20px"
            :page-size="pageConfig.pageSize"
            :total="total"
          />
        </el-row>
      </el-card>
    <!-- 弹窗部分 -->

    </div>
  </div>
</template>

<script>
import { vehiclePage } from '@/api/vehicle'
export default {
  data() {
    return {
      formData: {
        id: '',
        allowableLoad: '',
        allowableVolume: '',
        name: '',
        licensePlate: '',
        truckTypeId: '',
        workStatus: ''
      },
      pageConfig: {
        page: 1,
        pageSize: 5
      },
      truckData: [],
      total: 0
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
