/* eslint-disable no-trailing-spaces */
import axios from '@/utils/request'

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-11-29 10:10:26 
 * @Desc:  学生选课
 */
export function select(id) {
  return axios({
    url: '/student/insertClass/' + id,
    method: 'get'
  })
}

/** 
 * javascript comment 
 * @Author: md 
 * @Date: 2018-11-29 10:12:19 
 * @Desc:  学生退课
 */
export function unselect(id) {
  return axios({
    url: '/student/unsertClass/' + id,
    method: 'get'
  })
}

/**
 * javascript comment
 * @Author: md
 * @Date: 2018-11-28 08:47:42
 * @Desc:  获取学生选课信息
 */
export function fetchMessage() {
  return axios({
    url: '/student/fetchAllClass',
    methods: 'get'
  })
}
