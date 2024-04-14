import http from '../utils/request'

// ==================== home ====================
export const getTop5Data = () => {
    return http.get("/book/top5")
}
export const getTodayData = () => {
    return http.get("/book/todayData")
}

// ==================== book-category ====================
export const getCategoryData = ( params ) => {
    return http.get("/category/list",
        { params })}
export const getCategoryDetail = ( id ) => {
    return http.get("/category/detail/" + id)
}
export const addCategory = ( data ) => {
    return http.post("/category/add", data)
}
export const updateCategory = ( data ) => {
    return http.put("/category/update", data)
}
export const deleteCategory = ( id ) => {
    return http.delete("/category/delete/" + id)
}
export const getCategoryListByName = ( name ) => {
    return http.get("/category/search/" + name)
}







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

export const getBorrowList = () => {
    return http.get('/admin/borrow/list')
}

export const getRoleList = () => {
    return http.get('/admin/role/list')
}
