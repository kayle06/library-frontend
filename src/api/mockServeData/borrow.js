import Mock from 'mockjs'

// 生成随机借阅状态
function randomStatus() {
    return Math.random() > 0.5 ? 1 : 0;
}

// 生成随机日期
function randomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date(2022, 11, 31);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// 生成随机借阅记录数据
const generateRandomBorrowRecord = () => {
    return {
        title: Mock.Random.ctitle(10, 20),
        borrower: Mock.Random.cname(),
        borrowDate: Mock.Random.date('yyyy-MM-dd'),
        dueData: Mock.Random.date('yyyy-MM-dd'),
        status: randomStatus()
    };
};

// 生成20条随机借阅记录数据
const borrowRecords = [];
for (let i = 0; i < 20; i++) {
    borrowRecords.push(generateRandomBorrowRecord());
}

export default {
    getBorrowList:() => {
        return {
            code: 200,
            data: borrowRecords
        }
    }
}
