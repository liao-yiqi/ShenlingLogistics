import request from '@/utils/request'

// 获取订单分页数据
export function getOrderPages(data) {
  return request({
    url: '/manager/order-manager/order/page',
    method: 'post',
    data
  })
}

// 获取订单详情
export function getOrderDetails(id) {
  return request({
    url: `/manager/order-manager/order/${id}`
  })
}

// 更新订单
export function updateOrderDetails(data) {
  return request({
    url: `/manager/order-manager/order/${data.id}`,
    method: 'post',
    data
  })
}
