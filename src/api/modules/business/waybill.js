import request from '@/utils/request'

// 统计运单
export function getWaybillsCount() {
  return request({
    url: '/manager/transport-order-manager/count'
  })
}

// 获取运单分页数据
export function getWaybillsPages(data) {
  return request({
    url: '/manager/transport-order-manager/page',
    method: 'post',
    data
  })
}

// 获取运单详情
export function getWaybillsDetails(id) {
  return request({
    url: `/manager/transport-order-manager/${id}`
  })
}
