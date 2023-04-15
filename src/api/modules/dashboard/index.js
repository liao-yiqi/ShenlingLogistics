import request from '@/utils/request'
// 查询 接口
export function getDashboardInfo() {
  return request({
    url: '/manager/workspace'
  })
}

// 新增数据 接口
export function addDashboardInfo(data) {
  return request({
    url: '/manager/workspace',
    method: 'post',
    data
  })
}

// 删除所有数据 接口
export function deleteAllDashboardInfo() {
  return request({
    url: '/manager/workspace/deleteAll',
    method: 'delete'
  })
}

// 新增订单总量数据 接口
export function addOrderNumber(data) {
  return request({
    url: '/manager/workspace/saveOrderNumber',
    method: 'post',
    data
  })
}

