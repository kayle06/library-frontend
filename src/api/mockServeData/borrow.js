import Mock from 'mockjs'

// 生成随机借阅状态
function randomStatus() {
    return Math.random() > 0.5 ? 1 : 0;
}

// 生成随机日期
function randomDate() {
    const start = new Date(2024, 3, 1);
    const end = new Date(2024, 4, 14);
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateRandomDate(startDate, endDate) {
    const startTimestamp = new Date(startDate).getTime();
    const endTimestamp = new Date(endDate).getTime();
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);
    const randomDate = new Date(randomTimestamp);
    return randomDate.toISOString().slice(0, 10);
}

function addOneMonth(date) {
    const dateObj = new Date(date);
    dateObj.setMonth(dateObj.getMonth() + 1);
    return dateObj.toISOString().slice(0, 10);
}

// 生成随机借阅记录数据
const generateRandomBorrowRecord = () => {
    const borrowDate = generateRandomDate('2024-03-01', '2024-04-14')
    const dueDate = addOneMonth(borrowDate)

    return {
        title: Mock.Random.ctitle(10, 20),
        borrower: Mock.Random.cname(),
        borrowDate: borrowDate,
        dueData: dueDate,
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
