<template>
  <el-container style="height: 100vh;">
    <el-aside class="fixed-aside" width="200px">
      <common-asid/>
    </el-aside>
    <el-container class="right-container">
      <el-header>
        <common-header/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAsid from "@/components/CommonAsid.vue";
import CommonHeader from "@/components/CommonHeader.vue";
export default {
  name: "Main",
  components: {
    CommonAsid,
    CommonHeader
  }
}
</script>

<style scoped lang="less">
.el-header {
  padding: 0;
}
.el-menu {
  border-right: none;
}
.fixed-aside {
  position: fixed;  /* 固定位置 */
  top: 0;          /* 与顶部对齐 */
  bottom: 0;       /* 与底部对齐 */
  overflow-y: auto; /* 如果内容超过高度，则允许滚动 */
  height: 100vh;   /* 视口的完整高度 */
}

/* 确保右侧容器的内容不会与固定定位的侧边栏重叠 */
.right-container {
  margin-left: 200px; /* 和侧边栏宽度一致 */
  height: 100vh; /* 可选，如果你希望el-main填满剩余高度 */
  overflow-y: auto; /* 如果内容超过视口高度，允许滚动 */
}
</style>
