import request from '@/utils/request'

// 添加线路
export function addTransportLine(data) {
  return request({
    url: '/manager/transportLine',
    method: 'post',
    data
  })
}

// 获取线路分页数据
export function getTransportLinePages(data) {
  return request({
    url: '/manager/transportLine/page',
    method: 'post',
    data
  })
}

// 获取线路详情
export function getTransportLineDetails(id) {
  return request({
    url: `/manager/transportLine/${id}`
  })
}

// 更新线路
export function updateTransportLine(data) {
  return request({
    url: `/manager/transportLine/${data.id}`,
    method: 'put',
    data
  })
}

// 删除线路
export function deleteTransportLine(id) {
  return request({
    url: `/manager/transportLine/${id}`,
    method: 'delete'
  })
}

// 查询成本配置
export function getCostConfig() {
  return request({
    url: `/manager/cost-configuration-manager`
  })
}

// 保存成本配置
export function saveCostConfig(data) {
  return request({
    url: `/manager/cost-configuration-manager`,
    method: 'post',
    data
  })
}

