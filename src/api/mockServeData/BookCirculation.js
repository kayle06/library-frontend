import Mock from 'mockjs'

export default {
    generateBookCirculationData: () => {
        // 生成借阅量数据
        const borrowValues = Array.from({length: 14}, () => Mock.mock({'number|100-400': 1}).number);

        // 生成归还量数据
        const returnValues = Array.from({length: 14}, () => Mock.mock({'number|200-400': 1}).number);

        // 生成续借量数据
        const renewValues = Array.from({length: 14}, () => Mock.mock({'number|250-350': 1}).number);

        // 组装数据
        const data = [
            {
                "name": "借阅量",
                "values": borrowValues
            },
            {
                "name": "归还量",
                "values": returnValues
            },
            {
                "name": "续借量",
                "values": renewValues
            }
        ];
        return {
            code: 200,
            data: {
                "categories": ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"],
                "data": data,
            }
        }
    }
}
