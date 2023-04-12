import request from '@/utils/request'

// 统计车辆
export function vehicleCount() {
  return request({
    url: '/count'
  })
}
