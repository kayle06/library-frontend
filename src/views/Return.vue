<template>
  <div class="manage">
    <div class="manage-header">
      <div></div>
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
        <el-form-item label="类别" prop="category">
          <el-input v-model="form.category"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author"></el-input>
        </el-form-item>
        <el-form-item label="出版社" prop="publisher">
          <el-input v-model="form.publisher"></el-input>
        </el-form-item>
        <el-form-item label="出版时间" prop="publishDate">
          <el-date-picker
              v-model="form.publishDate"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD"/>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price"></el-input>
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
          label="图书名"
          width="300"/>
      <el-table-column
          prop="userName"
          label="归还者"
          width="130">
      </el-table-column>
      <el-table-column
          prop="dueDate"
          label="应还时间"/>
      <el-table-column
          prop="createTime"
          label="归还时间"/>
    </el-table>
    <el-pagination
        background
        layout="prev, pager, next"
        style="margin-top: 50px"
        :current-page="1"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange">
    </el-pagination></div>
</template>

<script>
import {getBorrowListData, getReturnListData} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
      pageNum: 1,
      pageSize: 15,
      currentPage: 1,
      total: 0,
      searchName: ''
    }
  },
  methods: {
    getReturnListData() {
        const params = {
          returnName: this.searchName,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
      getReturnListData( params ).then(({data}) => {
        console.log(data)
        this.tableData = data.data.list
      }).catch(() => {
        this.$message.error('获取数据失败')
      })
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            createUser(this.form).then(() => {
              this.getUserList()
            })
          } else {
            updateUser(this.form).then(() => {
              this.getUserList()
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
        deleteUser({id: row.id}).then(() => {
          this.getUserList()
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
    getBorrowList() {
      getBorrowList().then(({data}) => {
        this.tableData = data.data.map(item => {
          // 格式化借出时间和归还时间
          const borrowDateFormatted = item.borrowDate ? this.formatDate(item.borrowDate) : '';
          const dueDateFormatted = item.dueData ? this.formatDate(item.dueData) : '';

          return {
            ...item,
            borrowDate: borrowDateFormatted,
            dueData: dueDateFormatted,
          };
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
    handleCurrentChange(val) {
      const params = {
        returnName: this.searchName,
        pageNum: val,
        pageSize: this.pageSize
      }
      this.currentPage = val
      getReturnListData(params).then(({data}) => {
        const {list, total, pages} = data.data
        this.tableData = list
        this.total = total
        this.totalSize = pages
      }).catch(() => {
        this.$message.error('获取借阅信息失败')
      })
    },
    handleSearch() {
      const params = {
        pageNum: 1,
        pageSize: this.pageSize,
        returnName: this.searchName
      }
      getReturnListData(params).then(({data}) => {
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
    this.handleCurrentChange()
  },
  filters: {
    statusText(status) {
      const categoryMap = {
        0: '已归还',
        1: '已归还',
        2: '已归还',
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
