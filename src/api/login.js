import request from '@/utils/request'

export function loginByUsername(loginform) {
  return request({
    url: '/login/login',
    method: 'post',
    data: loginform
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/login/getInfo',
    method: 'get'
  })
}

