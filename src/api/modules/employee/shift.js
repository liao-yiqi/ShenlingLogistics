import request from '@/utils/request'

// 分页查询排班
export function getSchedulePages(params) {
  return request({
    url: '/manager/work-schedulings',
    params
  })
}

// 批量关联(绑定)排班
export function AssociatedSchedule(data) {
  return request({
    url: '/manager/work-schedulings',
    method: 'post',
    data
  })
}

// 工作模式列表查询
export function getWorkingPatternList() {
  return request({
    url: '/manager/work-patterns/all'
  })
}

// 工作模式分页查询
export function getWorkingPatternPages(params) {
  return request({
    url: '/manager/work-patterns/page',
    params
  })
}

// 根据工作模式id获取工作模式详情
export function getWorkingPatternDetails(id) {
  return request({
    url: `/manager/work-patterns/${id}`
  })
}

// 新增工作模式
export function addWorkingPattern(data) {
  return request({
    url: `/manager/work-patterns`,
    method: 'post',
    data
  })
}

// 修改工作模式
export function updateWorkingPattern(data) {
  return request({
    url: `/manager/work-patterns`,
    method: 'put',
    data
  })
}

// 工作模式删除
export function deleteWorkingPattern(id) {
  return request({
    url: `/manager/work-patterns/${id}`,
    method: 'delete'
  })
}
