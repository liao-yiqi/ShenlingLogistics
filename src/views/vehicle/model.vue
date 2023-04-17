<template>
  <div class="dashboard-container">
    <div class="app-container">
      <template>
        <strong>车辆管理</strong>
      </template>
      <!-- 搜索栏 -->
      <el-card>
        <el-form :model="formData" label-width="120px">
          <el-row type="flex">
            <el-form-item label="车型编号">
              <el-input
                v-model="formData.id"
                placeholder="请输入车型编号"
              />
            </el-form-item>
            <el-form-item label="应载重量">
              <el-select
                v-model="formData.allowableLoad"
                placeholder="请选择应载重量"
              >
                <el-option
                  v-for="item in vehicle.vehicleWeight"
                  :key="item.id"
                  :label="item.value"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="应载体积">
              <el-select
                v-model="formData.allowableVolume"
                placeholder="请选择应载体积"
              >
                <el-option v-for="item in vehicle.vehiclVolume" :key="item.id" :label="item.value" :value="item.id" />
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
              <el-button class="btn" style="color:#fff;background-color:#e15536" @click="searchBrn">搜索</el-button>
              <el-button class="btn" @click="resetBtn">重置</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
      <!-- 列表 -->
      <el-card style="margin-top: 20px">
        <el-button
          type="warning"
          style="color:#fff;background-color:#e15536"
          @click="addBtn"
        >
          新增车型
        </el-button>
        <el-table
          :data="truckData"
          :header-cell-style="{ background: '#f8faff' }"
          style="
          width: 100%;
          font-size: 12px;
          border: 1px solid #ebeef5;
          margin-top: 20px;"
          stripe
        >
          <el-table-column label="序号" type="index" width="50px" padding-right="10px" />
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
            <template v-slot="{row}">
              <el-button
                size="mini"
                type="text"
                style="color: #409eff"
                @click="editBtn(row.id)"
              >编辑</el-button>
              <span style="margin: 0 10px; color: #dcdfe6">|</span>
              <el-button
                size="mini"
                type="text"
                style="color:#f56c6c"
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
        <!-- 分页组件 -->
        <el-row type="flex" justify="center">
          <el-pagination
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="currentChange"
          />
        </el-row>
      </el-card>
      <!-- 弹窗 -->
      <el-dialog
        :title="dialogFrom.id?'编辑车型':'新增车型'"
        :visible="isShowDialog"
        custom-class="dialog"
        @close="btnCancel"
      >
        <el-form ref="addRef" :model="dialogFrom" label-width="120px">
          <el-form-item label="车辆类型" prop="name">
            <el-input
              v-model="dialogFrom.name"
              placeholder="请输入车辆类型"
            />
          </el-form-item>
          <el-form-item label="应载重量" prop="allowableLoad">
            <el-input
              v-model.number="dialogFrom.allowableLoad"
              placeholder="请输入车型载重"
            >
              <span
                slot="suffix"
                style="color: black; margin-right: 5px"
              >吨</span>
            </el-input>
          </el-form-item>
          <el-form-item label="应载体积" prop="allowableVolume">
            <el-input
              v-model.number="dialogFrom.allowableVolume"
              placeholder="请输入车型体积"
            >
              <span
                slot="suffix"
                style="color: black; margin-right: 5px"
              >立方</span>
            </el-input>
          </el-form-item>
          <el-form-item label="长" prop="measureLong">
            <el-input v-model.number="dialogFrom.measureLong">
              <span
                slot="suffix"
                style="color: black; margin-right: 5px"
              >米</span>
            </el-input>
          </el-form-item>
          <el-form-item label="宽" prop="measureWidth">
            <el-input v-model.number="dialogFrom.measureWidth">
              <span
                slot="suffix"
                style="color: black; margin-right: 5px"
              >米</span>
            </el-input>
          </el-form-item>
          <el-form-item label="高" prop="measureHigh">
            <el-input v-model.number="dialogFrom.measureHigh">
              <span
                slot="suffix"
                style="color: black; margin-right: 5px"
              >米</span>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-row type="flex" justify="center">
            <el-button type="primary" @click="btnOK">确 定</el-button>
            <el-button @click="btnCancel">取 消</el-button>
          </el-row>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// 请求接口引入
import { getVehiclePages, getVehicleDetails, updateVehicleDetails, addVehicle } from '@/api/modules/vehicle/model'
// 引入枚举数据
import vehicle from '@/constant/vehicle'
export default {
  data() {
    return {
      // 使用枚举
      vehicle,
      // 表单数据
      formData: {
        id: '',
        allowableLoad: '', // 应载重量
        allowableVolume: '', // 应载体积
        name: '',
        licensePlate: '',
        truckTypeId: '',
        workStatus: '',
        measureLong: '',
        measureWidth: '',
        measureHigh: ''
      },
      pageConfig: {
        page: 1,
        pageSize: 5
      },
      truckData: [
        { id: Date.now(),
          name: '6.8厢式货车',
          num: 6,
          allowableLoad: 2.8,
          allowableVolume: 4.5,
          measureLong: 6,
          measureWidth: 7,
          measureHigh: 8
        },
        { id: Date.now(),
          name: '6.8厢式货车',
          num: 6,
          allowableLoad: 2.8,
          allowableVolume: 4.5,
          measureLong: 6,
          measureWidth: 7,
          measureHigh: 8
        },
        { id: Date.now(),
          name: '6.8厢式货车',
          num: 6,
          allowableLoad: 2.8,
          allowableVolume: 4.5,
          measureLong: 6,
          measureWidth: 7,
          measureHigh: 8
        },
        { id: Date.now(),
          name: '6.8厢式货车',
          num: 6,
          allowableLoad: 2.8,
          allowableVolume: 4.5,
          measureLong: 6,
          measureWidth: 7,
          measureHigh: 8
        }
      ],
      total: 0,
      isShowDialog: false,
      // 弹窗组件默认为空
      // 弹窗表单
      dialogFrom: {},
      // 发送请求表单
      list: {
        measureWidth: 0.0,
        measureLong: 0.0,
        measureHigh: 0.0,
        name: '',
        allowableVolume: null,
        allowableLoad: null
      }
    }
  },
  async created() {
    this.dialogData()
  },

  methods: {
    // 获取分页数据
    async dialogData() {
      // 获取分页数据
      /* const res = await getVehiclePages(this.pageConfig)
      console.log(res) */

    /*   const { items, counts, pages } = res.data
      this.pageConfig.pageSize = parseInt(pages)
      this.total = parseInt(counts)
      // console.log(typeof this.total)
      this.truckData = items */
    },
    // 切换分页
    currentChange(newPage) {
      this.pageConfig.page = newPage
      this.dialogData()
    },
    // 页面条数下拉框
    handleSizeChange(newPagesize) {
      this.pageConfig.pageSize = newPagesize
      this.dialogData()
    },
    // 编辑按钮
    async editBtn(id) {
      // 发送请求获取车辆数据
      const res = await getVehicleDetails(id)
      this.dialogFrom = res.data
      console.log(this.dialogFrom)
      // 显示弹窗
      this.isShowDialog = true
    },
    // 确认按钮
    async btnOK() {
      /* const res = await updateVehicleDetails({
        ...this.dialogFrom,
        ...this.list
      }) */
      console.log({
        ...this.dialogFrom,
        ...this.list
      })
      // console.log(res)
      this.formData.id ? await updateVehicleDetails({
        ...this.dialogFrom,
        ...this.list
      }) : await addVehicle({
        ...this.dialogFrom,
        ...this.list
      })
    },
    // 取消按钮
    btnCancel() {
      this.dialogFrom = {
        id: '',
        name: '',
        allowableLoad: '', // 车载重量
        allowableVolume: '' // 车载体积
      }
      this.isShowDialog = false
    },
    // 新增按钮
    addBtn() {
      // 显示弹窗
      this.isShowDialog = true
    },
    // 搜索功能
    async searchBrn() {
      // 在formData中筛选所需要的值
      const newForData = {}
      for (const key in this.formData) {
        if (this.formData[key]) {
          newForData[key] = this.formData[key]
        }
      }
      // console.log(newForData)
      // 复用获取车辆分页数据接口
      // 这里需要将进行展开将两个对象合并
      const { data } = await getVehiclePages({ ...this.pageConfig, ...newForData })
      this.truckData = data.items
      this.total = +data.counts
      console.log(data)
    },
    // 重置功能
    async resetBtn() {
      this.$loading = true
      this.pageConfig = {
        page: 1,
        pageSize: 5
      }
      const res = await getVehiclePages(this.pageConfig)
      const { items } = res.data
      this.truckData = items
      this.formData = {
        id: '',
        allowableLoad: '', // 应载重量
        allowableVolume: '', // 应载体积
        name: '',
        licensePlate: '',
        truckTypeId: '',
        workStatus: '',
        measureLong: '',
        measureWidth: '',
        measureHigh: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 90px;
  height: 40px;
  padding: 10px 20px!important;
  border-radius: 5px!important;
  font-weight: 400;
}

</style>

<style lang="scss">
.dialog {
border-radius: 10px;
width: 600px;
}
.el-dialog__header {
background-color: #f3f4f7;
border-radius: 10px;
}
.el-input__inner {
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  width: 100%;
  border-radius: 5px;
}
.el-table_1_column_1 {
  .cell {
    font-size: 14px;
  }
}
.customer-list-box .table-card-box .el-card__body {
    padding: 28px 28px 28px 28px;
}
</style>
