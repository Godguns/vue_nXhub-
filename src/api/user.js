import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/auth/login',
    method: 'get',
    params:{username:data.username,password:data.password}
  })
}

export function getInfo(token) {
  return request({
    url: '/auth',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
