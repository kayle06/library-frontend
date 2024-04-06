import http from '../utils/request'

export const getStatisticalData = () => {
    return http.get('/home/table')
}
