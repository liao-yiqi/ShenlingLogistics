import request from '@/utils/request'

// 获取运费列表
export function getCarriageList() {
  return request({
    url: '/manager/carriages'
  })
}

// 新增运费项
export function addCarriageList(data) {
  return request({
    url: '/manager/carriages',
    method: 'post',
    data
  })
}

// 修改运费项
export function updateCarriageList(data) {
  return request({
    url: '/manager/carriages',
    method: 'put',
    data
  })
}

// 删除运费项
export function deleteCarriageList(id) {
  return request({
    url: `/manager/carriages/${id}`,
    method: 'delete'
  })
}
