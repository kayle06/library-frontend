export default {
    getRoleList:() => {
        return {
            code: 200,
            data: [
                {
                    id: 1,
                    roleName: '超级管理员',
                },
                {
                    id: 2,
                    roleName: '管理员',
                },
                {
                    id: 3,
                    roleName: '学生',
                },
                {
                    id: 4,
                    roleName: '教师',
                }
            ]
        }
    }
}
