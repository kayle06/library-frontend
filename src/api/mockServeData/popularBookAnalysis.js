import Mock from 'mockjs'

export default {
    getPopularBookAnalysis: () => {
        return {
            code: 200,
            data: {
                dimensions: ['bookName', 'borrowNum', 'returnNum'],
                data: [
                    ['《算法导论》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《UNIX编程艺术》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《编程珠玑》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《代码大全》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《人月神话》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《计算机网络》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《深入理解计算机系统》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《编译原理》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《计算机组成原理》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《操作系统》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《数据库系统概念》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《计算机图形学》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《计算机算法导论》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《计算机网络》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《离散数学》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《数据结构与算法》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《C程序设计语言》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《Java编程思想》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《Python编程从入门到实践》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)],
                    ['《JavaScript高级程序设计》', Mock.Random.integer(0, 400), Mock.Random.integer(0, 400)]
                ]
            }
        }
    }
}
