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
                    "《算法导论》": Mock.Random.integer(300, 1000),
                    "《UNIX编程艺术》": Mock.Random.integer(300, 1000),
                    "《编程珠玑》": Mock.Random.integer(300, 1000),
                    "《代码大全》": Mock.Random.integer(300, 1000),
                    "《人月神话》": Mock.Random.integer(300, 1000),
                    // "《计算机网络》": Mock.Random.integer(300, 1000),
                    // "《深入理解计算机系统》": Mock.Random.integer(300, 1000),
                    // "《编译原理》": Mock.Random.integer(300, 1000),
                    // "《计算机组成原理》": Mock.Random.integer(300, 1000),
                    // "《操作系统》": Mock.Random.integer(300, 1000),
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
                    // {
                    //     name: '《计算机网络》',
                    //     value: List.map(item => item["《计算机网络》"])
                    // },
                    // {
                    //     name: '《深入理解计算机系统》',
                    //     value: List.map(item => item["《深入理解计算机系统》"])
                    // },
                    // {
                    //     name: '《编译原理》',
                    //     value: List.map(item => item["《编译原理》"])
                    // },
                    // {
                    //     name: '《计算机组成原理》',
                    //     value: List.map(item => item["《计算机组成原理》"])
                    // },
                    // {
                    //     name: '《操作系统》',
                    //     value: List.map(item => item["《操作系统》"])
                    // }
                ],
                // 柱状图
                userData: [
                    {
                        "date": "周一",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周二",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周三",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周四",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周五",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周六",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    },
                    {
                        "date": "周日",
                        "borrowNum": Mock.Random.integer(300, 1000),
                        "returnNum": Mock.Random.integer(300, 1000)
                    }
                ],
                // 折线图
                orderData: {
                    date: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                    data: [
                        {
                            bookName: '《算法导论》',
                            // 数组
                            sellQuantity: List.map(item => item["《算法导论》"])
                        },
                        {
                            bookName: '《UNIX编程艺术》',
                            sellQuantity: List.map(item => item["《UNIX编程艺术》"])
                        },
                        {
                            bookName: '《编程珠玑》',
                            sellQuantity: List.map(item => item["《编程珠玑》"])
                        },
                        {
                            bookName: '《代码大全》',
                            sellQuantity: List.map(item => item["《代码大全》"])
                        },
                        {
                            bookName: '《人月神话》',
                            sellQuantity: List.map(item => item["《人月神话》"])
                        }
                    ]
                },
                tableData: [
                    {
                        bookName: '《算法导论》',
                        borrowNum: Mock.Random.integer(300, 1000),
                        returnNum: Mock.Random.integer(300, 1000)
                    },
                    {
                        bookName: '《UNIX编程艺术》',
                        borrowNum: Mock.Random.integer(300, 1000),
                        returnNum: Mock.Random.integer(300, 1000)
                    },
                    {
                        bookName: '《编程珠玑》',
                        borrowNum: Mock.Random.integer(300, 1000),
                        returnNum: Mock.Random.integer(300, 1000)
                    },
                    {
                        bookName: '《代码大全》',
                        borrowNum: Mock.Random.integer(300, 1000),
                        returnNum: Mock.Random.integer(300, 1000)
                    },
                    {
                        bookName: '《人月神话》',
                        borrowNum: Mock.Random.integer(300, 1000),
                        returnNum: Mock.Random.integer(300, 1000)
                    },
                    // {
                    //     bookName: '《计算机网络》',
                    //     borrowNum: Mock.Random.integer(300, 1000),
                    //     returnNum: Mock.Random.integer(300, 1000)
                    // },
                    // {
                    //     bookName: '《深入理解计算机系统》',
                    //     borrowNum: Mock.Random.integer(300, 1000),
                    //     returnNum: Mock.Random.integer(300, 1000)
                    // },
                    // {
                    //     bookName: '《编译原理》',
                    //     borrowNum: Mock.Random.integer(300, 1000),
                    //     returnNum: Mock.Random.integer(300, 1000)
                    // },
                    // {
                    //     bookName: '《计算机组成原理》',
                    //     borrowNum: Mock.Random.integer(300, 1000),
                    //     returnNum: Mock.Random.integer(300, 1000)
                    // },
                    // {
                    //     bookName: '《操作系统》',
                    //     borrowNum: Mock.Random.integer(300, 1000),
                    //     returnNum: Mock.Random.integer(300, 1000)
                    // }
                ]
            }
        }
    }
}
