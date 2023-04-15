import request from '@/utils/request'

// 获取车辆类型分页数据
export function getTrucktypePages(params) {
  return request({
    url: `/manager/truckType/page`,
    params
  })
}

// 获取车辆类型信息列表
export function getTrucktypeList() {
  return request({
    url: `/manager/truckType/simple`
  })
}

// 获取车辆类型详情 用于数据回显
export function getTrucktypeDetails(id) {
  return request({
    url: `/manager/truckType/${id}`
  })
}

// 添加车辆类型
export function addTrucktype(data) {
  return request({
    url: `/manager/truckType`,
    method: 'post',
    data
  })
}

// 更新车辆信息
export function updateTrucktypeDetails(data) {
  return request({
    url: `/manager/truckType/${data.id}`,
    method: 'put',
    data
  })
}

// 删除车辆类型
export function deleteTrucktype(id) {
  return request({
    url: `/manager/truckType/${id}`,
    method: 'delete'
  })
}
