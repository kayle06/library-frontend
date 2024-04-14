<template>
  <div class="manage">
    <div class="manage-header">
      <div class="manage-header-left">
        <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增分类</el-button>
      </div>
      <div class="margin-header-right">
        <el-input v-model="searchName" placeholder="请输入要搜索的分类名称"
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
      <el-form label-position="left" ref="form" :inline="true" :model="form" label-width="80px" :disabled="editStatus">
        <el-form-item label="类别名称" prop="categoryName">
          <el-input v-model="form.categoryName"></el-input>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" v-show="showDetail">
          <el-input v-model="form.createTime"></el-input>
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
          prop="categoryName"
          label="类别名称"/>
      <el-table-column
          prop="createTime"
          label="创建时间"/>
      <el-table-column
          label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleDetail(scope.row)">详情</el-button>
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
import {
  getCategoryData,
  getCategoryDetail,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryListByName
} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
      editStatus: true,
      pageSize: 10,
      currentPage: 1,
      total: 0,
      totalSize: 0,
      showDetail: true,
      searchName: '',
    }
  },
  methods: {
    handleCurrentChange(val) {
      const params = {
        pageNum: val,
        pageSize: this.pageSize
      }
      this.currentPage = val
      getCategoryData(params).then(({data}) => {
        const {records, total, size} = data.data
        this.tableData = records
        this.total = total
        this.totalSize = size
      }).catch(() => {
        this.$message.error('获取分类列表失败')
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            addCategory(this.form).then(({data}) => {
              this.handleCurrentChange(this.currentPage)
              this.$message({
                type: 'success',
                message: data.data
              })
            }).catch((error) => {
              this.$message.error(error.response.data.message)
            })
          } else {
            const updateParams = {
              categoryId: this.form.categoryId,
              categoryName: this.form.categoryName,
              description: this.form.description
            }
            updateCategory(updateParams).then(() => {
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
    handleDetail(id) {
      if (id && id.categoryId) {
        getCategoryDetail(id.categoryId).then(({data}) => {
          const {categoryName, description, createTime} = data.data
          this.form = {
            categoryName,
            description,
            createTime
          }
          this.dialogVisible = true
        }).catch(() => {
          this.$message.error('获取分类详情失败')
        })
        this.showDetail = true
        this.editStatus = true
      } else {
        this.$message.error('无效的分类')
      }
    },
    handleAdd() {
      this.showDetail = false
      this.editStatus = false
      this.form = {}
      this.modalType = 0
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.showDetail = false
      this.editStatus = false
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
        deleteCategory(row.categoryId).then(() => {
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
    handleSearch() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
        categoryName: this.searchName
      }
      getCategoryData(params).then(({data}) => {
        console.log(data)
        const {records, total, size} = data.data
        this.tableData = records
        this.total = total
        this.totalSize = size
      }).catch(() => {
        this.$message.error('获取分类列表失败')
      })
    },
  },
  mounted() {
    this.handleCurrentChange(this.currentPage)
  }
}
</script>

<style scoped lang="less">
.manage {
  height: 87%;
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
