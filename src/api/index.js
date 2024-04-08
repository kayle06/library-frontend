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

export const getBookAnalysis = () => {
    return http.get('/admin/analysis/book')
}
export const getBookCirculation = () => {
    return http.get('/admin/analysis/bookCirculation')
}

export const getPopularBookAnalysis = () => {
    return http.get('/admin/analysis/popularBook')
}

export const getBookList = (params) => {
    return http.get('/admin/book/list', { params })
}

export const getCategoryList = () => {
    return http.get('/admin/book/category')
}
