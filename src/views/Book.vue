<template>
  <div class="manage">
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd" style="text-align: left">+ 新增图书</el-button>
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
          label="书名"
          width="250"/>
      <el-table-column
          prop="category"
          label="类别"
          width="100">
        <template slot-scope="scope">
          {{ scope.row.category | categoryText }}
        </template>
      </el-table-column>
      <el-table-column
          prop="author"
          label="作者"
      width="350"/>
      <el-table-column
          prop="price"
          label="价格"/>
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
  </div>
</template>

<script>
import {getBookList} from "@/api";

export default {
  data() {
    return {
      dialogVisible: false,
      form: {},
      tableData: [],
      modalType: 0, // 0 新增，1 编辑
    }
  },
  methods: {
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
    getBookList() {
      getBookList().then(({data}) => {
        console.log(data)
        this.tableData = data.data
      })
    }
  },
  mounted() {
    this.getBookList()
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
