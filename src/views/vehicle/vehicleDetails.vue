<template>
  <div class="dashboard-container appmain">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <basicInfoVue />
          </el-tab-pane>
          <el-tab-pane label="行驶证信息" name="second">
            <driverLicenseInfoVue />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import basicInfoVue from './components/basic-info.vue'
import driverLicenseInfoVue from './components/driverLicense-info.vue'
export default {
  components: { basicInfoVue, driverLicenseInfoVue },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
