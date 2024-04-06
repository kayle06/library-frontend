import Mock from 'mockjs'

let List = []
export default {
    tableData: () => {
        return {
            code: 200,
            data: [
                {
                    bookName: '《算法导论》',
                    borrowNum: '100',
                    returnNum: '200'
                },
                {
                    bookName: '《UNIX编程艺术》',
                    borrowNum: '300',
                    returnNum: '400'
                },
                {
                    bookName: '《编程珠玑》',
                    borrowNum: '500',
                    returnNum: '600'
                },
                {
                    bookName: '《代码大全》',
                    borrowNum: '700',
                    returnNum: '800'
                }
            ]
        }
    },

    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            List.push(
                Mock.mock({
                    "《算法导论》": Mock.Random.integer(100, 200),
                    "《UNIX编程艺术》": Mock.Random.integer(300, 400),
                    "《编程珠玑》": Mock.Random.integer(500, 600),
                    "《代码大全》": Mock.Random.integer(700, 800),
                    "《人月神话》": Mock.Random.integer(900, 1000),
                    "《计算机网络》": Mock.Random.integer(1100, 1200)
                })
            )
        }
        return {
            code: 200,
            data: {
                // 饼图
                videoData: [
                    {
                        name: '《算法导论》',
                        value: List.map(item => item["《算法导论》"])
                    },
                    {
                        name: '《UNIX编程艺术》',
                        value: List.map(item => item["《UNIX编程艺术》"])
                    },
                    {
                        name: '《编程珠玑》',
                        value: List.map(item => item["《编程珠玑》"])
                    },
                    {
                        name: '《代码大全》',
                        value: List.map(item => item["《代码大全》"])
                    },
                    {
                        name: '《人月神话》',
                        value: List.map(item => item["《人月神话》"])
                    },
                    {
                        name: '《计算机网络》',
                        value: List.map(item => item["《计算机网络》"])
                    }
                ],
                // 柱状图
                userData: [
                    {
                        "date": "周一",
                        "borrowNum": 5,
                        "returnNum": 4
                    },
                    {
                        "date": "周二",
                        "borrowNum": 10,
                        "returnNum": 8
                    },
                    {
                        "date": "周三",
                        "borrowNum": 15,
                        "returnNum": 12
                    },
                    {
                        "date": "周四",
                        "borrowNum": 20,
                        "returnNum": 16
                    },
                    {
                        "date": "周五",
                        "borrowNum": 25,
                        "returnNum": 20
                    },
                    {
                        "date": "周六",
                        "borrowNum": 30,
                        "returnNum": 24
                    },
                    {
                        "date": "周日",
                        "borrowNum": 35,
                        "returnNum": 28
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
                    data: List
                },
                tableData: [
                    {
                        bookName: '《算法导论》',
                        borrowNum: 100,
                        returnNum: 200
                    },
                    {
                        bookName: '《UNIX编程艺术》',
                        borrowNum: 300,
                        returnNum: 400
                    },
                    {
                        bookName: '《编程珠玑》',
                        borrowNum: 500,
                        returnNum: 600
                    },
                    {
                        bookName: '《代码大全》',
                        borrowNum: 700,
                        returnNum: 800
                    },
                    {
                        bookName: '《人月神话》',
                        borrowNum: 900,
                        returnNum: 1000
                    },
                    {
                        bookName: '《计算机网络》',
                        borrowNum: 1100,
                        returnNum: 1200
                    }
                ]
            }
        }
    }
}
