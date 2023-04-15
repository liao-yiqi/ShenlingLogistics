import request from '@/utils/request'

// 统计车辆
export function vehicleCount(data) {
  return request({
    url: '/count',
    data
  })
}
// 获取车辆分页数据
export function vehiclePage(params) {
  return request({
    url: '/manager/truckType/page',
    params
  })
}

// 获取车辆详情信息
export function getVehicleDetail(id) {
  return request({
    url: `/manager/truckType/${id}`
  })
}

// 更新车辆信息
export function updateVehicleInfo(data) {
  return request({
    url: `/manager/truckType/${data.id}`,
    method: 'put',
    data
  })
}

// 删除车辆类型
export function deleteVehicle(id) {
  return request({
    url: `/manager/truckType/${id}`,
    method: 'delete'
  })
}

// 添加车辆类型
export function addVehicle(data) {
  return request({
    url: `/manager/truckType`,
    method: 'post',
    data
  })
}
