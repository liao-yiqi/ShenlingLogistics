<template>
  <div class="dashboard-container appmain">
    <div class="app-container">
      <!-- 头部 -->
      <el-card class="header">
        <template>
          <i
            class="el-icon-back"
            style="cursor: pointer"
            @click="$router.back()"
          /><span
            style="
            font-weight: 400;
            margin-left: 5px;
            cursor: pointer;
            font-size: 16px;
          "
            @click="$router.back()"
          >返回</span>
          <span style="color: grey; margin: 0 20px">|</span>
          <span>车辆详情</span>
        </template>
      </el-card>

      <!-- 底部 -->
      <el-card class="elbody">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 基本信息 -->
          <el-tab-pane label="基本信息" name="baseInfo">
            <!-- form表单！ -->
            <el-form :rules="rules" :data="baseInfoData" label-width="110px">
              <el-row type="flex">
                <el-form-item
                  required
                  label="车辆编号："
                  prop="id"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.id" disabled />
                  <span v-else>{{ baseInfoData.id }}</span>
                </el-form-item>
                <el-form-item
                  label="车牌号码："
                  prop="licensePlate"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.licensePlate" />
                  <span v-else>{{ baseInfoData.licensePlate || "--" }}</span>
                </el-form-item>
                <el-form-item
                  label="车辆名称："
                  prop="truckTypeName"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.truckTypeName" />
                  <span v-else>{{ baseInfoData.truckTypeName || "--" }}</span>
                </el-form-item>
              </el-row>
              <el-row type="flex">
                <el-form-item
                  label="车辆体积："
                  prop="allowableVolume"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.allowableVolume">
                    <span
                      slot="suffix"
                      style="color: black; margin-right: 5px"
                    >m³</span>
                  </el-input>
                  <span v-else>{{ baseInfoData.allowableVolume || "0" }}m³</span>
                </el-form-item>
                <el-form-item
                  label="车辆载重："
                  prop="allowableLoad"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.allowableLoad">
                    <span
                      slot="suffix"
                      style="color: black; margin-right: 5px"
                    >吨</span>
                  </el-input>
                  <span v-else>{{ baseInfoData.allowableLoad || "0" }}吨</span>
                </el-form-item>
                <el-form-item
                  label="GPSID："
                  prop="deviceGpsId"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="baseInfoData.deviceGpsId" />
                  <span v-else>{{ baseInfoData.deviceGpsId || "--" }}</span>
                </el-form-item>
              </el-row>
              <el-form-item label="图片信息：">
                <!-- 没有编辑的时候展示这个 -->
                <el-row v-if="!flag" class="noEdit">
                  <!-- 无图片 -->
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px"
                    src="data:image/png;base64,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"
                  >
                  <!-- 有图片 -->
                  <div v-else class="imgs">
                    <img
                      style="width: 212px; height: 159px"
                      :src="fileList[0].url"
                    >
                    <img
                      v-if="fileList[1]"
                      style="width: 212px; height: 159px; margin-left: 20px"
                      :src="fileList[1].url"
                    >
                  </div>
                </el-row>
                <!-- 上传图片编辑的样子 -->
                <el-row v-else type="flex" class="upload">
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px"
                    src="https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/2a6cbcb0-93d0-41a3-ae18-248ee68c1def.png"
                  >
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px; margin: 0 20px"
                    src="https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/95f1ad63-c8f0-4be3-a5e9-c3c9320de30f.png"
                    alt=""
                  >
                  <!-- 图片上传 -->
                  <el-upload
                    list-type="picture-card"
                    :on-preview="previewPic"
                    action="#"
                    :http-request="upload"
                    :file-list="fileList"
                    :on-change="changePic"
                    :before-upload="beforeUpload"
                    :on-remove="removePic"
                  >
                    <i class="el-icon-upload" />
                  </el-upload>
                </el-row>
                <div
                  v-if="flag"
                  class="text"
                  style="font-size: 12px; color: #bac0cd"
                >
                  注：图片大小不超过5M；仅能上传 PNG JPEG
                  JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <!-- 行驶证信息 -->
          <el-tab-pane label="行驶证信息" name="license">
            <!-- form表单！ -->
            <el-form
              :rules="rules"
              :license-data="licenseData"
              label-width="120px"
            >
              <el-row type="flex">
                <el-form-item
                  required
                  label="行驶证号码："
                  prop="id"
                  style="width: 366px"
                >
                  <el-input v-if="flag" v-model="licenseData.id" />
                  <span v-else>{{ licenseData.id || "--" }}</span>
                </el-form-item>
                <el-form-item
                  required
                  label="发动机号码："
                  prop="engineNumber"
                  style="width: 366px"
                >
                  <el-input v-if="flag" v-model="licenseData.engineNumber" />
                  <span v-else>{{ licenseData.engineNumber || "--" }}</span>
                </el-form-item>
                <el-form-item
                  required
                  label="注册时间："
                  prop="registrationDate"
                  style="width: 366px"
                >
                  <el-date-picker
                    v-if="flag"
                    v-model="licenseData.registrationDate"
                    type="date"
                    placeholder="选择日期"
                  />
                  <span v-else>{{ licenseData.registrationDate || "--" }}</span>
                </el-form-item>
              </el-row>
              <el-row type="flex">
                <el-form-item
                  required
                  label="强制报废日期："
                  prop="mandatoryScrap"
                  style="width: 320px"
                >
                  <el-date-picker
                    v-if="flag"
                    v-model="licenseData.mandatoryScrap"
                    type="date"
                    placeholder="选择日期"
                  />
                  <span v-else>{{ licenseData.mandatoryScrap || "--" }}</span>
                </el-form-item>
                <el-form-item
                  required
                  label="整备质量："
                  prop="overallQuality"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="licenseData.overallQuality">
                    <span
                      slot="suffix"
                      style="color: black; margin-right: 5px"
                    >吨</span>
                  </el-input>
                  <span v-else>{{ licenseData.overallQuality || "0" }}吨</span>
                </el-form-item>
                <el-form-item
                  required
                  label="检测有效期："
                  prop="expirationDate"
                  style="width: 320px"
                >
                  <el-date-picker
                    v-if="flag"
                    v-model="licenseData.expirationDate"
                    type="date"
                    placeholder="选择日期"
                  />
                  <span v-else>{{ licenseData.expirationDate || "--" }}</span>
                </el-form-item>
              </el-row>
              <el-row type="flex">
                <el-form-item
                  required
                  label="核定载质量："
                  prop="allowableWeight"
                  style="width: 320px"
                >
                  <el-input v-if="flag" v-model="licenseData.allowableWeight">
                    <span
                      slot="suffix"
                      style="color: black; margin-right: 5px"
                    >吨</span>
                  </el-input>
                  <span v-else>{{ licenseData.allowableWeight || "0" }}吨</span>
                </el-form-item>
                <el-form-item
                  required
                  label="有效期："
                  prop="validityPeriod"
                  style="width: 320px"
                >
                  <el-date-picker
                    v-if="flag"
                    v-model="licenseData.validityPeriod"
                    type="date"
                    placeholder="选择日期"
                  />
                  <span v-else>{{ licenseData.validityPeriod || "--" }}</span>
                </el-form-item>
              </el-row>
              <el-form-item label="图片信息：">
                <el-row v-if="!flag" class="noEdit">
                  <!-- 无图片 -->
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px"
                    src="data:image/png;base64,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"
                  >
                  <!-- 有图片 -->
                  <div v-else class="imgs">
                    <img
                      style="width: 212px; height: 159px"
                      :src="fileList[0].url"
                    >
                    <img
                      v-if="fileList[1]"
                      style="width: 212px; height: 159px; margin-left: 20px"
                      :src="fileList[1].url"
                    >
                  </div>
                </el-row>
                <el-row v-else type="flex" class="upload">
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px"
                    src="https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/086942c3-6c43-432d-80f1-64f53b424be9.png"
                  >
                  <img
                    v-if="!fileList.length"
                    style="width: 212px; height: 159px; margin: 0 20px"
                    src="https://yjy-slwl-oss.oss-cn-hangzhou.aliyuncs.com/4002ebba-8a62-4a5c-b64c-358189456eb6.png"
                    alt=""
                  >
                  <!-- 图片上传 -->
                  <el-upload
                    list-type="picture-card"
                    :on-preview="previewPic"
                    action="#"
                    :http-request="upload"
                    :file-list="fileList"
                    :on-change="changePic"
                    :before-upload="beforeUpload"
                    :on-remove="removePic"
                  >
                    <i class="el-icon-upload" />
                  </el-upload>
                </el-row>
                <div
                  v-if="flag"
                  class="text"
                  style="font-size: 12px; color: #bac0cd"
                >
                  注：图片大小不超过5M；仅能上传 PNG JPEG
                  JPG类型图片；建议上传400*300尺寸的图片；最多上传2张
                </div>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <!-- 公共按钮 -->

        <div class="PublicBtn">
          <el-divider />
          <el-row v-if="!flag" type="flex" justify="center">
            <el-button
              style="color:#fff;
          background-color:#e15536"
              class="editBtn"
            >编辑</el-button>
          </el-row>
          <el-row v-else type="flex" justify="center">
            <el-button type="primary">保存</el-button>
            <el-button @click="flag = false">取消</el-button>
          </el-row>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'baseInfo',
      baseInfoData: {},
      licenseData: {},
      id: this.$route.query.id,
      rules: {
        allowableLoad: [{ required: true, message: '请输入车辆载重' }],
        licensePlate: [{ required: true, message: '请输入车牌号码' }],
        deviceGpsId: [{ required: true, message: '请输入GPS设备ID' }],
        truckTypeName: [{ required: true, message: '请输入车辆名称' }],
        allowableVolume: [{ required: true, message: '请输入车牌体积' }]
      },
      // 用于判断是展示input还是文字
      flag: false,
      fileList: []
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" scoped>
.header {
  background-color: #f3f5f9;
  border: none;
  box-shadow:none
}
.elbody {
  height: 750px;
}
.PublicBtn {
  margin-top: 280px;
}
.editBtn {
  width: 110px;
  height: 40px;
  border-radius: 5px;
}

::v-deep .el-form-item__label {
  text-align: left;
}
::v-deep .el-form {
  padding-left: 30px;
}
::v-deep .el-input {
  width: 200px;
}

</style>
