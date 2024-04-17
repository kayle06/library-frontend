<template>
  <div class="manage">
    <div class="manage-header">
      <div class="manage-header-left">
        <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增借阅</el-button>
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
          <el-select v-model="bookId" placeholder="请选择">
            <el-option
                v-for="item in allBooks"
                :key="item.bookId"
                :label="item.title"
                :value="item.bookId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借阅者" prop="author">
          <el-select v-model="userId" placeholder="请选择">
            <el-option
                v-for="item in allUsers"
                :key="item.userId"
                :label="item.username"
                :value="item.userId">
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
          prop="title"
          label="图书名"
          width="300"/>
      <el-table-column
          prop="userName"
          label="借阅者"
          width="100">
      </el-table-column>
      <el-table-column
          prop="borrowDate"
          label="借出时间"/>
      <el-table-column
          prop="dueDate"
          label="应还时间"/>
<!--      居中-->
      <el-table-column
          label="操作"
          align="center">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="handleReturn(scope.row)">归还</el-button>
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
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
  getBorrowListData,
  getAllBooksData,
  getAllUsersData,
  addBorrow,
  returnBook,
  updateBorrow,
  getBookListData
} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
      pageNum: 1,
      allBooks: [],
      allUsers: [],
      bookId: '',
      userId: '',
      borrowId: '',
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
      getBorrowListData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取借阅信息失败')
      })
    },
    getBorrowList() {
      const params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: '',
        borrowerName: ''
      }
      getBorrowListData(params).then(({ data} ) => {
        console.log(data)
        const  { list, pageNum, pageSize, total} = data.data
        this.tableData = list
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.total = total
      }).catch( (error) => {
        console.log(error)
      })
    },
    getAllBooksData() {
      getAllBooksData().then(({ data }) => {
        console.log(data)
        this.allBooks = data.data
      }).catch( (error) => {
        console.log(error)
      })
    },
    getAllUsersData() {
      getAllUsersData().then(({ data }) => {
        console.log(data)
        this.allUsers = data.data
      }).catch( (error) => {
        console.log(error)
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            const params = {
              bookId: this.bookId,
              userId: this.userId,
            }
            addBorrow(params).then(() => {
              this.getBorrowList()
            }).catch( (error) => {
              this.$message.error(error.message)
            })
          } else {
            const params = {
              borrowId: this.borrowId,
              bookId: this.bookId,
              userId: this.userId,
            }
            console.log(params)
            updateBorrow(params).then(() => {
              this.getBorrowList()
            }).catch( (error) => {
              this.$message.error(error.message)
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
      this.bookId = ''
      this.userId = ''
      this.modalType = 0
      this.dialogVisible = true
      this.getAllBooksData()
      this.getAllUsersData()
    },
    handleEdit(row) {
      this.getAllBooksData()
      this.getAllUsersData()
      this.modalType = 1
      this.dialogVisible = true
      this.bookId = row.bookId
      this.userId = row.userId
      this.borrowId = row.borrowId
    },
    handleReturn(row) {
      this.$confirm('确认归还该书?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        returnBook(row.borrowId).then(() => {
          this.getBorrowList()
          this.$message.success("归还成功")
        }).catch( (error) => {
          console.log(error)
          this.$message.error(error.message)
        })
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    handleSearch() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
        title: this.searchName
      }
      getBorrowListData(params).then(({data}) => {
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
    this.getBorrowList();
  },
  filters: {
    statusText(status) {
        const categoryMap = {
          0: '借阅中',
          1: '已归还',
          2: '已逾期',
        };
        return categoryMap[status];
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
