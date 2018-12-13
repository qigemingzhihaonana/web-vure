/* eslint-disable no-trailing-spaces */
import axios from '@/utils/request'

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-11-29 10:25:37 
 * @Desc: 管理员开启/关闭选课 
 */
export function startClass() {
  return axios({
    url: '/admin/openClass',
    method: 'get'
  })
}

export function closeClass() {
  return axios({
    url: '/admin/closeClass',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-11-29 10:26:43 
 * @Desc: 管理员开启/关闭打分 
 */
export function startCode() {
  return axios({
    url: '/admin/openCode',
    method: 'get'
  })
}

export function closeCode() {
  return axios({
    url: '/admin/closeCode',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-03 23:12:27 
 * @Desc: 获取到全部用户信息 
 */
export function fetchUser() {
  return axios({
    url: '/admin/selectAllUser',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-03 23:19:09 
 * @Desc: 新增用户 
 */
export function addUser(user) {
  return axios({
    url: '/admin/addUser',
    method: 'post',
    data: user
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-03 23:26:14 
 * @Desc: 删除人员 
 */
export function delectUser(id, roleId) {
  return axios({
    url: '/admin/deleteUser/' + id + '/' + roleId,
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-03 23:26:14 
 * @Desc: 查看系统状态 
 */
export function sysState() {
  return axios({
    url: '/admin/state',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: flydreame 
 * @Date: 2018-12-04 14:29:07 
 * @Desc: 为教师分配课程 
 */
export function getTeacher() {
  return axios({
    url: '/admin/getAllTeacgerMessage',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-04 20:15:03 
 * @Desc: 管理员获取全部课程 
 */
export function getAllClass() {
  return axios({
    url: '/admin/getAllclass',
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-12-05 16:44:00 
 * @Desc: 修改密码 
 */
export function changepassword(newPassword) {
  const data = {
    newPassword
  }
  return axios({
    url: '/student/editPassword',
    method: 'post',
    params: data
  })
}

/**
 * 添加课程
 * @param {*} course 
 */
export function addCourse(course) {
  return axios({
    url: '/course/addCourse',
    method: 'post',
    data: course
  })
}
