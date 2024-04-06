<template>
  <div class="header-content">
    <div class="left-content">
      <el-button @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
    </div>
    <div class="right-content">
      <el-dropdown>
      <span class="el-dropdown-link">
            <img class="user" src="../assets/images/disdain.jpg" alt="">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
      </el-dropdown>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleMenu() {
      this.$store.commit('collapseMenu')
    }
  }
}
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
}

.header-content {
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .right-content {
    .user {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }
}
</style>
