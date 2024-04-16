<template>
  <div class="manage">
    <div class="manage-header">
      <div class="manage-header-left">
        <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增图书</el-button>
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
      <el-form label-position="left" ref="form" :inline="true" :model="form" label-width="80px">
        <el-form-item label="书名" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="categoryName">
          <el-select v-model="form.categoryId" placeholder="请选择">
            <el-option
                v-for="item in categoryList"
                :key="item.categoryId"
                :label="item.categoryName"
                :value="item.categoryId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="form.publisher"></el-input>
        </el-form-item>
        <el-form-item label="库存" prop="stock">
          <el-input v-model="form.stock"></el-input>
        </el-form-item>
        <el-form-item label="书架位置" prop="shelfLocation">
          <el-input v-model="form.shelfLocation"></el-input>
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
          prop="title"
          label="书名"
          width="250"/>
      <el-table-column
          prop="categoryName"
          label="类别"
          width="100">
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
      width="350"/>
      <el-table-column
          prop="stock"
          label="库存"/>
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
import {getBookListData, getAllCategory, addBook, updateBook, deleteBook, getCategoryData} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑,
      categoryList: [],
      categoryValue: '',
      pageSize: 10,
      currentPage: 1,
      total: 0,
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
      getBookListData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取图书信息失败')
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
              addBook(this.form).then(() => {
                this.handleCurrentChange(this.currentPage)
                this.dialogVisible = false
                this.$refs.form.resetFields()
              }).catch(err => {
                this.$message.error(err.message)
              })
          } else {
            updateBook(this.form).then(() => {
              this.getBookList()
              this.dialogVisible = false
              this.$refs.form.resetFields()
            }).catch(err => {
              this.$message.error(err.message)
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
      this.getAllCategory()
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
      this.$confirm('确认删除该图书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteBook(row.bookId).then(() => {
          this.handleCurrentChange(this.currentPage)
          this.$message.success('删除成功')
        }).catch(err => {
          this.$message.error(err.message)
        })
      })
    },
    getBookList() {
      const params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        title: ''
      }
      getBookListData(params).then(({data}) => {
        console.log(data)
        this.tableData = data.data
      }).catch(err => {
        console.log(err)
      })
    },
    getAllCategory() {
      getAllCategory().then(({data}) => {
        console.log(data)
        this.categoryList = data.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleSearch() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
        title: this.searchName
      }
      getBookListData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取图书信息失败')
      })
    },
  },
  mounted() {
    // this.getBookList();
    this.handleCurrentChange(this.currentPage)
  },
}
</script>

<style scoped lang="less">
.manage {
  height: 87%;
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
