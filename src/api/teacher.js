/* eslint-disable no-trailing-spaces */
import axios from '@/utils/request'

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-11-29 10:05:56 
 * @Desc:  获取学生信息
 */
export function fetchList() {
  return axios({
    url: '/teacher/selectOwnStudent',
    method: 'get'
  })
}

export function save(courseDto) {
  return axios({
    url: '/teacher/saveCode',
    method: 'post',
    data: courseDto
  })
}

export function commit(courseDto) {
  return axios({
    url: '/teacher/commitCode',
    method: 'post',
    data: courseDto
  })
}
