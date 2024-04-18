import http from '../utils/request'

// ==================== home ====================
export const getTop5Data = () => {
    return http.get("/book/top5")
}
export const getTodayData = () => {
    return http.get("/book/todayData")
}
export const getBorrowAndReturnData = () => {
    return http.get("/book/borrowAndReturn")
}
export const getBorrowTopFive =() => {
    return http.get("/book/borrowTopFive")
}
export const getPopularBooks = () => {
    return http.get("/book/popularBooks")
}
export const getCategoryAnalyse = () => {
    return http.get("/book/categoryAnalyse")
}
export const getBookCirculation = () => {
    return http.get("/book/bookCirculation")
}



// ==================== book-category ====================
export const getCategoryData = ( params ) => {
    return http.get("/category/list",
        { params })}
export const getAllCategory = () => {
    return http.get("/category/listAll")
}
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

// ==================== book-info ====================
export const getBookListData = ( params ) => {
    return http.get("/book/list", { params })}
export const getAllBooksData = () => {
    return http.get("/book/listAll")
}
export const addBook = ( data ) => {
    return http.post("/book/add", data)
}
export const updateBook = ( data ) => {
    return http.put("/book/update", data)
}
export const deleteBook = ( id ) => {
    return http.delete("/book/del/" + id)
}

// ==================== borrow ====================
export const getBorrowListData = ( params ) => {
    return http.get("/borrow/list", { params })
}
export const addBorrow = ( data ) => {
    return http.post("/borrow/add", data)
}
export const returnBook = ( data ) => {
    return http.put("/borrow/return/" + data)
}
export const updateBorrow = ( data ) => {
    return http.put("/borrow/update", data)
}


// ==================== return ====================
export const getReturnListData = ( params ) => {
    return http.get("/restitution/list", { params })
}


// ==================== reservation ====================
export const getReservationListData = ( params ) => {
    return http.get("/reservation/list", { params })
}
export const agreeReservation = ( data ) => {
    return http.put("/reservation/agree/" + data)
}



// ==================== user ====================
export const getAllUsersData = () => {
    return http.get("/user/listAll")
}
export const getUsersData = ( params ) => {
    return http.get("/user/list", { params })
}
export const addUser = ( data ) => {
    return http.post("/user/add", data)
}
export const updateUser = ( data ) => {
    return http.put("/user/update", data)
}
export const deleteUser = ( id ) => {
    return http.delete("/user/delete/" + id)
}



// ==================== role ====================
export const getRolesData = ( params ) => {
    return http.get("/role/list", { params })
}
export const getAllRolesData = () => {
    return http.get("/role/listAll")
}
export const addRole = ( data ) => {
    return http.post("/role/add", data)
}
export const updateRole = ( data ) => {
    return http.put("/role/update", data)
}
export const deleteRole = ( id ) => {
    return http.delete("/role/delete/" + id)
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
// export const deleteUser = (data) => {
//     return http.post('/admin/user/delete', data)
// }
// export const updateUser = (data) => {
//     return http.post('/admin/user/update', data)
// }
export const createUser = (data) => {
    return http.post('/admin/user/add', data)
}

export const getBookAnalysis = () => {
    return http.get('/admin/analysis/book')
}
// export const getBookCirculation = () => {
//     return http.get('/admin/analysis/bookCirculation')
// }

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
