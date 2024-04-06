<template>
  <el-container>
    <el-aside width="auto">
      <common-asid/>
    </el-aside>
    <el-container>
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
</style>
