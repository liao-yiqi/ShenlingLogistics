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
        <el-button style="color:#fff;background-color:#e15536">
          新增车辆</el-button>
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
              >查看详情</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <!-- row.workStatus:0 表示停用了，1 表示启用了 -->
              <el-button
                size="mini"
                type="text"
                :class="{ blue: row.workStatus==0, red: row.workStatus==1 }"
                @click="setWhat('run', row.id, row.workStatus)"
              >{{ row.workStatus == 0 ? "启用" : "停用" }}</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <el-button
                size="mini"
                style="color: #409eff"
                type="text"
                @click="setWhat('setDriver', row.id)"
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
    </div>
  </div>
</template>

<script>
import { getTruck, searchTruckList } from '@/api/modules/vehicle/vehicles'
import { getVehicleList } from '@/api/modules/vehicle/model'
export default {
  data() {
    return {
      formData: {
        truckTypeId: '',
        licensePlate: '',
        truckTypeName: '',
        driverNum: '',
        // tab切换的值
        workStatus: '00',
        deviceGpsId: '',
        allowableLoad: '', // 应载重量
        allowableVolume: '' // 应载体积
      },
      vehicleTypeList: [],
      counts: [],
      listData: [],
      showEmpty: true,
      pageConfig: {
        page: 1,
        pageSize: 10
      },
      total: 0
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
      console.log(res.data)
    },
    // 切换分页
    currentChange(newPage) {
      this.pageConfig.page = newPage
      this.getTruck()
    },
    // 页面条数下拉框
    handleSizeChange(newPagesize) {
      this.pageConfig.pageSize = newPagesize
      this.getTruck()
    },
    // 获取车辆类型信息列表
    async getVehicleList() {
      const res = await getVehicleList()
      this.vehicleTypeList = res.data
    },
    // 搜索功能
    async searchBtn() {
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
    },
    // tab栏点击
    tabClick() {
      // 复用tab栏切换的方法
      this.tabData()
      console.log(this.formData.workStatus)
    },
    // tab栏点击切换数据
    async tabData() {
      // 在formData里面筛选出有值的
      const newFormData = {}
      for (const key in this.formData) {
        // 判断workStatus是否有值
        // console.log(this.formData[key])
        if (this.formData[key]) {
          if (key !== 'workStatus') {
            newFormData[key] = this.formData[key]
          } else {
            if (['0', '1'].includes(this.formData[key])) {
              newFormData[key] = this.formData[key]
              // console.log(key)
            }
          }
        }
      }
      const res = await searchTruckList({ ...this.pageConfig, ...newFormData })
      const { counts, items } = res.data
      this.listData = items
      this.total = parseInt(counts)
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
.green {
  color: #409eff;
}
::v-deep .el-dialog__body {
  padding-top: 0;
}

::v-deep .el-table__row>.el-table_1_column_3>.cell {
padding-left: 5px;
}

</style>
