import Mock from 'mockjs'
import homeTable from './mockServeData/home'

Mock.mock('/api/home/table', homeTable.getStatisticalData())
