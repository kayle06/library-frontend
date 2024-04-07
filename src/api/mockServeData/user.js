import Mock from 'mockjs'

function param20bj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"')
        + '"}'
    )
}

let List = []
const count = 200

for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            username: Mock.Random.cname(),
            studentId: "23001" + Mock.Random.integer(100000, 999999),
            phone : Mock.Random.integer(13000000000, 18999999999),
            addr: Mock.mock('@county(true)'), 'age|18-60': 1,
            birthday: Mock.Random.date(),
            sex: Mock.Random.integer(0, 1),
            role: Mock.Random.integer(0, 2),
            sexLabel: ''
        })
    )
}

export default {
    /**
     * 获取列表
     * 要带参数 name, page, limit; name可以不填; page,limit有默认值
     * @param {*} config
     * @returns
     */
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param20bj(config.url)
        console.log('name:' + name, 'page:' + page, '分页大小limit' + limit)
        const mockList = List.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false
            user.sexLabel = user.sex === 0 ? '女' : '男';
            return true
        })
        const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page-1))
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    /**
     * 增加用户
     * @param {*} config
     * @returns
     */
    createUser: config => {
        const { username, studentId, phone, addr, birthday, sex, role } = JSON.parse(config.body)
        console.log(JSON.parse(config.body))
        List.unshift({
            id: Mock.Random.guid(),
            username: username,
            studentId: studentId,
            phone: phone,
            addr: addr,
            birthday: birthday,
            sex: sex,
            role: role
        })
        return {
            code: 20000,
            data: {
                message: '添加成功'
            }
        }
    },

    /**
     * 删除用户
     * @param {*} config
     * @returns
     */
    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        if (!id) {
            return {
                code: -999,
                message: '参数不正确'
            }
        } else {
            List = List.filter(u => u.id !== id)
            return {
                code: 20000,
                message: '删除成功'
            }
        }
    },
    /**
     * 批量删除
     * @param {*} config
     * @returns
     */
    batchremove: config => {
        const { ids } = JSON.parse(config.url)
        ids = ids.split(',')
        List = List.filter(u => !ids.includes(u.id))
        return {
            code: 20000,
            data: {
                message: '批量删除成功'
            }
        }
    },
    updateUser: config => {
        const { id, username, studentId, phone, addr, birthday, sex, role } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u => {
            if (u.id === id) {
                u.username = username
                u.studentId = studentId
                u.phone = phone
                u.addr = addr
                u.birthday = birthday
                u.sex = sex_num
                u.role = role
                return true
            }
        })
        return {
            code: 20000,
            data: {
                message: '编辑成功'
            }
        }
    }
}
