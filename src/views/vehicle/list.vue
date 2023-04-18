<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 搜索栏 -->
      <el-card>
        <el-form ref="form" label-width="120px">
          <el-row type="flex">
            <el-form-item label="车辆类型">
              <el-select
                v-model="formData.truckTypeId"
                clearable
              >
                <el-option
                  v-for="item in vehicleTypeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="车牌号码">
              <el-input
                v-model="formData.licensePlate"
                clearable
                placeholder="请输入车牌号码"
              />
            </el-form-item>
            <el-form-item>
              <el-button style="color:#fff;background-color:#e15536">搜索</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <!-- tab栏 -->
      <el-tabs
        ref="tab"
        v-model="formData.workStatus"
        style="margin: 20px 0;backgroundColor='red'"
        type="border-card"
        @tab-click="tabClick"
      >
        <el-tab-pane name="1">
          <template #label>全部</template>
        </el-tab-pane>
        <el-tab-pane name="2">
          <template #label>可用</template>
        </el-tab-pane>
        <el-tab-pane name="3">
          <template #label>停用</template>
        </el-tab-pane>
      </el-tabs>
      <!-- 列表 -->
      <el-card style="margin-top: 20px">
        <el-button style="color:#fff;background-color:#e15536">
          新增车辆</el-button>
        <el-table
          :data="tableData"
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
          <el-table-column label="车牌号码" prop="licensePlate" width="150px" />
          <el-table-column label="车辆类型" prop="truckTypeName" width="100px" />
          <el-table-column label="司机数量" prop="driverNum" width="80px" />
          <el-table-column label="车辆状态" prop="workStatus">
            <template #default="{ row }">
              <span
                v-if="row.workStatus"
                style="
                background: #1dc779;
                display: inline-block;
                width: 5px;
                height: 5px;
                border-radius: 50%;
              "
              />
              <span
                v-else
                style="
                background: red;
                display: inline-block;
                width: 5px;
                height: 5px;
                border-radius: 50%;
              "
              />
              {{ row.workStatus == 0 ? "停用" : "正常" }}
            </template>
          </el-table-column>
          <el-table-column label="GPS设备ID" prop="deviceGpsId" />
          <el-table-column label="实载重量（T）" prop="allowableLoad" />
          <el-table-column label="实载体积（方）" prop="allowableVolume" />
          <el-table-column label="操作" width="200px">
            <template>
              <el-button
                size="mini"
                type="text"
                style="color: #409eff"
              >查看详情</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <!-- row.workStatus:0 表示停用了，1 表示启用了 -->
              <el-button
                size="mini"
                type="text"
              >启用</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <el-button
                size="mini"
                style="color: #409eff"
                type="text"
              >配置司机</el-button>
            </template>
          </el-table-column>
          <!-- 没数据的时候显示 插槽 -->
          <!-- 一开始什么都没有，显示的是空空如也,后面搜索显示的是没有找到…… -->
          <div slot="empty" class="nodata" style="width: 534px; height: 320px">
            <div v-if="!showEmpty" class="empty1">
              <img
                src="https://slwl-admin.itheima.net/static/img/icon-empty.3abd3b9a.png"
                style="width: 336px; height: 232px"
              >
              <p>没有找到您要的内容哦~</p>
            </div>
            <div v-else class="empty2">
              <img
                src="https://slwl-admin.itheima.net/static/img/pic-kong.742d3899.png"
                style="width: 260px"
              >
              <p>这里空空如也</p>
            </div>
          </div>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getTruck } from '@/api/modules/vehicle/vehicles'
export default {
  data() {
    return {
      formData: {
        truckTypeId: '',
        licensePlate: '',
        truckTypeName: '',
        driverNum: '',
        // tab切换的值
        workStatus: '1',
        deviceGpsId: '',
        allowableLoad: '', // 应载重量
        allowableVolume: '' // 应载体积
      },
      vehicleTypeList: [],
      counts: [],
      tableData: [],
      showEmpty: true,
      pageConfig: {
        page: '1',
        pageSize: '5'
      }
    }
  },
  created() {
    this.getTruck()
  },
  methods: {
    tabClick() {
      console.log('tab被点击')
      console.log(this.formData.workStatus)
    },
    async getTruck() {
      console.log('调用分页接口前')
      const res = await getTruck(this.pageConfig)
      console.log(res)
      console.log('调用分页接口后')
    }
  }

}
</script>

<style lang="scss">
.el-tabs--border-card {
  background: #FFF;
  border: none;
.el-tabs__header {
    background-color: #ffffff;
    border-bottom: 1px solid #ffffff;
    margin: 0;
  }
}
.active {
  background-color: #ffeeeb;
  color: #e15536;
}
</style>>

