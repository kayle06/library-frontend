<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增角色</el-button>
    </div>

    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-cloce="handleClose"
        width="50%">
      <el-form label-position="left" ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="角色名称" prop="title">
          <el-input v-model="form.roleDescription"></el-input>
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
          prop="roleDescription"
          label="角色名称"
          width="250"/>
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
        :current-page="1"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import {getRolesData, addRole, deleteRole, updateRole, getBorrowListData} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
      pageSize: 10,
      total: 0,
      currentPage: 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      const params = {
        pageNum: val,
        pageSize: this.pageSize
      }
      this.currentPage = val
      getRolesData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取角色列表失败')
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            addRole(this.form).then(() => {
              this.handleCurrentChange(this.currentPage)
            })
          } else {
            updateRole(this.form).then(() => {
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
        deleteRole(row.roleId).then(() => {
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
  },
  filters: {
    // 将类别数字转换为中文
    categoryText(category) {
      const categoryMap = {
        1: '编程',
        2: '文学',
        // 添加更多类别的映射
      };
      return categoryMap[category];
    }
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
</style>
