import request from '@/utils/request'

export function getTruck(params) {
  return request({
    url: '/manager/truck/page',
    params
  })
}
export function searchTruckList(params) {
  return request({
    url: '/manager/truck/page',
    params
  })
}

