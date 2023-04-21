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
              <el-button style="color:#fff;background-color:#e15536" @click="searchBtn">搜索</el-button>
              <el-button @click="resetBtn">重置</el-button>
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
        <el-tab-pane name="00">
          <template #label>全部</template>
        </el-tab-pane>
        <el-tab-pane name="1">
          <template #label>可用</template>
        </el-tab-pane>
        <el-tab-pane name="0">
          <template #label>停用</template>
        </el-tab-pane>
      </el-tabs>
      <!-- 列表 -->
      <el-card style="margin-top: 20px">
        <el-button
          style="color:#fff;
          background-color:#e15536"
          @click="isShowDialog=true"
        >
          新增车辆
        </el-button>
        <el-table
          :data="listData"
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
              {{ row.workStatus == 0 ? "停用" : "可用" }}
            </template>
          </el-table-column>
          <el-table-column label="GPS设备ID" prop="deviceGpsId" />
          <el-table-column label="实载重量（T）" prop="allowableLoad" />
          <el-table-column label="实载体积（方）" prop="allowableVolume" />
          <el-table-column label="操作" width="200px">
            <template #default="{ row }">
              <el-button
                size="mini"
                type="text"
                style="color: #409eff"
                @click="$router.push(`/vehicleDetails/${row.id}`)"
              >查看详情</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <!-- row.workStatus:0 表示停用了，1 表示启用了 -->
              <el-button
                size="mini"
                type="text"
                :class="{ blue: row.workStatus==0, red: row.workStatus==1 }"
                @click="setWhat(row.id, row.workStatus)"
              >{{ row.workStatus == 0 ? "启用" : "停用" }}</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <el-button
                size="mini"
                style="color: #409eff"
                type="text"
                @click="configDeiver(row.id)"
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
        <el-row type="flex" justify="center">
          <el-pagination
            style="margin-top: 20px"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="pageConfig.pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
      <!-- 添加车辆弹窗 -->
      <el-dialog
        title="新增车辆"
        :visible="isShowDialog"
        custom-class="dialog"
        @close="btnCancel"
      >
        <el-form ref="addRef" :model="addform" label-width="120px" :rules="rules">
          <el-form-item label="车辆类型" prop="truckTypeId">
            <el-select
              v-model="addform.truckTypeId"
              style="width: 100%"
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
          <el-form-item label="车牌号码" prop="licensePlate">
            <el-input
              v-model.number="addform.licensePlate"
              placeholder="请输入车牌号码"
            />
          </el-form-item>
          <el-form-item label="GPS设备ID" prop="deviceGpsId">
            <el-input
              v-model.number="addform.deviceGpsId"
              placeholder="请输入GPS设备ID"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button class="btn" style="color:#fff;background-color:#e15536" @click="btnOk">确 定</el-button>
            <el-button class="btn" @click="btnCancel">取 消</el-button>
          </el-row>
        </span>
      </el-dialog>
      <!-- 配置司机提示弹窗 -->
    </div>
  </div>
</template>

<script>
import { getTruck, searchTruckList, addTruck, enableTruck, configDeiver } from '@/api/modules/vehicle/vehicles'
import { getVehicleList } from '@/api/modules/vehicle/model'
export default {
  data() {
    return {
      formData: {
        truckTypeId: '',
        licensePlate: '',
        truckTypeName: '',
        id: '',
        status: '',
        // tab切换的值
        workStatus: '00',
        deviceGpsId: '',
        allowableLoad: '', // 应载重量
        allowableVolume: '' // 应载体积
      },
      addform: {
        allowableLoad: '',
        allowableVolume: '',
        brand: '',
        deviceGpsId: '',
        driverName: '',
        driverNum: '',
        id: '',
        licensePlate: '',
        loadingRatio: '',
        picture: '',
        runStatus: '',
        status: '',
        transportLineName: '',
        truckLicenseId: '',
        truckTypeId: '',
        truckTypeName: '',
        workStatus: '00'
      },
      // 存放下拉框值的数组
      vehicleTypeList: [],
      counts: [],
      listData: [],
      showEmpty: true,
      pageConfig: {
        page: 1,
        pageSize: 10
      },
      total: 0,
      isShowDialog: false,
      rules: {
        truckTypeId: [{ required: true, message: '请输入车辆类型' }],
        licensePlate: [{ required: true, message: '请输入车牌号码' }],
        deviceGpsId: [{ required: true, message: '请输入GPS设备ID' }]
      }
    }
  },

  created() {
    this.getTruck()
    this.getVehicleList()
  },
  methods: {
    // 获取车辆详情
    async getTruck() {
      const res = await getTruck(this.pageConfig)
      const { items, counts } = res.data
      this.listData = items
      this.total = parseInt(counts)
      // console.log(res.data)
    },

    // 获取车辆类型信息列表
    async getVehicleList() {
      const res = await getVehicleList()
      this.vehicleTypeList = res.data
    },
    // 搜索功能
    async searchBtn() {
      // 通过id查找可以复用tab栏切换的方法
      this.tabData()
    },
    // 重置功能
    async resetBtn() {
      this.$loading = true
      this.pageConfig = {
        page: 1,
        pageSize: 10
      }
      const res = await getTruck(this.pageConfig)
      const { items } = res.data
      this.listData = items
      // 因为select下拉框绑定的是truckTypeId,所以只需要将这个值改为空值就可以清空表单
      this.formData = {
        truckTypeId: '',
        licensePlate: ''
      }
      this.formData.workStatus = '00'
    },
    // tab栏点击
    tabClick() {
      this.tabData()
    },
    // tab栏点击切换数据
    async tabData() {
      const newFormData = {}
      // 遍历formData的值
      for (const key in this.formData) {
        // 判断key值是否存在
        if (this.formData[key]) {
          // 搜索复用的话 需要加上这个判断
          if (key !== 'workStatus') {
            newFormData[key] = this.formData[key]
          } else {
            // 当点击全部的时候也能渲染页面
            if (['0', '1'].includes(this.formData[key])) {
              newFormData[key] = this.formData[key]
            }
          }
        }
      }
      const res = await searchTruckList({ ...this.pageConfig, ...newFormData })
      const { counts, items } = res.data
      this.listData = items
      this.total = parseInt(counts)
      console.log(res.data)
    },
    // 切换分页
    currentChange(newPage) {
      this.pageConfig.page = newPage
      // this.getTruck()
      this.searchBtn()
    },
    // 页面条数下拉框
    handleSizeChange(newPagesize) {
      this.pageConfig.pageSize = newPagesize
      // this.getTruck()
      this.searchBtn()
    },
    // 弹窗确定按钮
    async btnOk() {
      await this.$refs.addRef.validate()
      const res = await addTruck(this.addform)
      this.$message.success('新增成功')
      this.btnCancel()
      this.getTruck()
      console.log(res)
    },
    // 弹窗取消按钮
    btnCancel() {
      this.addform = {
        truckTypeId: '',
        licensePlate: '',
        truckTypeName: '',
        deviceGpsId: '',
        // tab切换的值
        workStatus: '00'
      }
      // 清空表单校验报错
      this.$refs.addRef.resetFields()
      this.isShowDialog = false
    },
    // 启动停用
    async setWhat(id) {
      const res = await enableTruck(id)
      console.log(res)
    },
    // 配置司机
    async configDeiver(id) {
      const res = await configDeiver(id)
      console.log(res)
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
.dialog {
border-radius: 10px;
width: 600px;
}
.el-dialog__header {
background-color: #f3f4f7;
border-radius: 10px;
}
}
.btn {
  width: 90px;
  height: 40px;
  padding: 10px 20px!important;
  border-radius: 5px!important;
  font-weight: 400;
  text-align: center;
}
.el-dialog__body {
    padding: 40px 50px 0 20px!important;
}
::v-deep .el-dialog__body {
  margin-right: 40px;
}

</style>>

<style lang="scss" scoped>
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
::v-deep .el-tabs__nav-scroll {
  background-color: #fff;
}
::v-deep .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #ffeeeb;
  border: none;
}
::v-deep .el-tabs__item {
  width: 120px;
  text-align: center;
  // border-radius: 50%;
}
::v-deep .el-dialog__body {
  margin-right: 40px;
}
::v-deep .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color:#e15536
}
.red {
  color: red;
}
::v-deep .el-dialog__body {
  padding-top: 0;
}

::v-deep .el-table__row>.el-table_1_column_3>.cell {
padding-left: 5px;
}
::v-deep .el-table__row>.el-table_6_column_48>.cell {
  padding-left: 5px;
}
::v-deep .el-form {
  top: 10px;
}
</style>

