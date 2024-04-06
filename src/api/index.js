import http from '../utils/request'

export const getStatisticalData = () => {
    return http.get('/home/table')
}

/*
    * 用户管理
 */
export const getUserList = (params) => {
    return http.get('/admin/user/list', { params })
}
export const deleteUser = (data) => {
    return http.post('/admin/user/delete', data)
}
export const updateUser = (data) => {
    return http.post('/admin/user/update', data)
}
export const createUser = (data) => {
    return http.post('/admin/user/add', data)
}
