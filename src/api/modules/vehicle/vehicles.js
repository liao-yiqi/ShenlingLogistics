import request from '@/utils/request'
// 获取车辆分页数据
export function getTruck(params) {
  return request({
    url: '/manager/truck/page',
    params
  })
}
// 下拉框车辆信息
export function searchTruckList(params) {
  return request({
    url: '/manager/truck/page',
    params
  })
}
// 添加车辆
export function addTruck(data) {
  return request({
    url: '/manager/truck',
    method: 'post',
    data
  })
}
// 启用车辆
export function enableTruck(id) {
  return request({
    url: `/manager/enable/${id}`,
    method: 'put'
  })
}
// 停用车辆
export function disenableTruck(id) {
  return request({
    url: `/manager/disable/${id}`,
    method: 'put'
  })
}

// 通过id获取车辆详情
export function getTruckDetails(id) {
  return request({
    url: `/manager/truck/${id}`
  })
}

// 通过id获取行驶证详情
export function getlicenseDetails(id) {
  return request({
    url: `/manager/truck/${id}/license`
  })
}

// 获取绑定的司机
export function configDeiver(truckId) {
  return request({
    url: `/manager/bindingDrivers/${truckId}`
  })
}
