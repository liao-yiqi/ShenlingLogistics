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
    url: '/truckType/page',
    params
  })
}

// 获取车辆详情信息
export function getVehicleDetail(id) {
  return request({
    url: `/truckType/${id}`
  })
}
