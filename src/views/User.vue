<template>
  <div class="manage">
    <div class="manage-header">
      <div class="manage-header-left">
        <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增用户</el-button>
      </div>
      <div class="margin-header-right">
        <el-input v-model="searchStudentNo" placeholder="请输入要搜索的分类名称"
                  style="width: 200px; margin-right: 10px"></el-input>
        <el-row>
          <el-button icon="el-icon-search" circle @click="handleSearch"></el-button>
        </el-row>
      </div>
    </div>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-cloce="handleClose"
        width="50%">
      <el-form label-position="left" ref="form" :rules="rule" :inline="true" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="form.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.status" placeholder="请选择">
                <el-option
                    v-for="item in roles"
                    :key="item.roleId"
                    :label="item.roleDescription"
                    :value="item.roleId">
                </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
        :data="tableData"
        height="90%">
      <el-table-column
          prop="studentNo"
          label="学号"
          width="150"/>
      <el-table-column
          prop="username"
          label="姓名"
          width="150"/>
      <el-table-column
          prop="phone"
          label="电话"/>
      <el-table-column
          prop="status"
          label="角色">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
              scope.row.status === 1 ? '管理员' : scope.row.status === 2 ? '学生' : '未知'
            }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        style="margin-top: 50px"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import {updateUser, deleteUser, getUsersData, addUser, getAllRolesData} from "@/api";

export default {
  name: "User",
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
      pageSize: 10,
      total: 0,
      searchStudentNo: '',
      currentPage: 1,
      rule: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        studentNo: [
          {required: true, message: '请输入学号', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入电话', trigger: 'blur'}
        ],
        status: [
          {required: true, message: '请选择角色', trigger: 'blur'}
        ]
      },
      roles: []
    }
  },
  methods: {
    handleSearch() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
        studentNo: this.searchStudentNo
      }
      getUsersData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取用户信息失败')
      })
    },
    handleCurrentChange(val) {
      const params = {
        pageNum: val,
        pageSize: this.pageSize,
        studentNo: this.searchStudentNo,
      }
      this.currentPage = val
      getUsersData(params).then(({data}) => {
        console.log(data)
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取用户信息失败')
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            console.log(this.form)
            addUser(this.form).then(() => {
              this.handleCurrentChange(this.currentPage)
            })
          } else {
            updateUser(this.form).then(() => {
              this.handleCurrentChange(this.currentPage)
            })
          }
          this.dialogVisible = false;
          this.$refs.form.resetFields()
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.form.resetFields()
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose()
    },
    handleAdd() {
      this.form = {}
      this.modalType = 0
      this.dialogVisible = true
      getAllRolesData().then(({data}) => {
        console.log(data)
        this.roles = data.data
      }).catch(() => {
        this.$message.error('获取角色信息失败')
      })
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('确认删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser(row.userId).then(() => {
          this.handleCurrentChange(this.currentPage)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        })
      })
    },
  },
  mounted() {
    this.handleCurrentChange(1)
  }
}
</script>

<style scoped lang="less">
.manage {
  height: 90%;
}

.manage-header {
  text-align: left;
}

.manage-header {
  display: flex;
  justify-content: space-between;

  .margin-header-right {
    display: flex;
    justify-content: space-between;
    margin-right: 20px;
  }
}
</style>
