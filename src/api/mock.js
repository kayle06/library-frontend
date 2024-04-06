import Mock from 'mockjs'
import homeTable from './mockServeData/home'
import user from "@/api/mockServeData/user";

Mock.mock('/api/home/table', homeTable.getStatisticalData())

// 用户列表数据
Mock.mock('/api/admin/user/list', 'get', user.getUserList)
Mock.mock('/api/admin/user/delete', 'post', user.deleteUser)
Mock.mock('/api/admin/user/update', 'post', user.updateUser)
Mock.mock('/api/admin/user/add', 'post', user.createUser)
