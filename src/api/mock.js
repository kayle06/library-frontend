import Mock from 'mockjs'
import homeTable from './mockServeData/home'
import user from "@/api/mockServeData/user";
import bookAnalysis from "@/api/mockServeData/BookAnalysis";
import bookCirculation from "@/api/mockServeData/BookCirculation";
import popularBookAnalysis from "@/api/mockServeData/popularBookAnalysis";
import book from "@/api/mockServeData/book";
import category from "@/api/mockServeData/category";
import borrow from "@/api/mockServeData/borrow";
import role from "@/api/mockServeData/role";

Mock.mock('http://localhost:1290/api/home/table', homeTable.getStatisticalData())

// 用户列表数据
Mock.mock('http://localhost:1290/api/admin/user/list', 'get', user.getUserList)
Mock.mock('http://localhost:1290/api/admin/user/delete', 'post', user.deleteUser)
Mock.mock('http://localhost:1290/api/admin/user/update', 'post', user.updateUser)
Mock.mock('http://localhost:1290/api/admin/user/add', 'post', user.createUser)
// 书籍分析数据
Mock.mock('http://localhost:1290/api/admin/analysis/book', 'get', bookAnalysis.getBarChart)
Mock.mock('http://localhost:1290/api/admin/analysis/bookCirculation', 'get', bookCirculation.generateBookCirculationData)
Mock.mock('http://localhost:1290/api/admin/analysis/popularBook', 'get', popularBookAnalysis.getPopularBookAnalysis)

// 图书管理
Mock.mock('http://localhost:1290/api/admin/book/list', 'get', book.getBookList)
Mock.mock('http://localhost:1290/api/admin/book/category', 'get', category.getCategoryList)

// 图书服务
Mock.mock('http://localhost:1290/api/admin/borrow/list', 'get', borrow.getBorrowList)

// 角色管理
Mock.mock('http://localhost:1290/api/admin/role/list', 'get', role.getRoleList)
