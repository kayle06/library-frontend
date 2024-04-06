<template>
  <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <h3>图书馆管理系统</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" :index="subItem.name">
        <el-menu-item :index="subItem.name">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      menuData: [
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'home/home'
        },
        {
          path: '/book',
          name: 'book',
          label: '图书管理',
          icon: 's-home',
          url: 'book/book'
        },
        {
          path: '/borrow',
          name: 'borrow',
          label: '借阅管理',
          icon: 's-home',
          url: 'borrow/borrow'
        },
        {
          path: '/analysis',
          name: 'analysis',
          label: '数据分析',
          icon: 's-home',
          url: 'analysis/analysis'
        },
        {
          path: '/system',
          name: 'system',
          label: '系统管理',
          icon: 's-home',
          url: 'system/system'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/about',
              name: 'about',
              label: '关于我们',
              icon: 's-home',
              url: 'about/about'
            },
            {
              path: '/contact',
              name: 'contact',
              label: '联系我们',
              icon: 's-home',
              url: 'contact/contact'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item)
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
        this.$router.push(item.path);
      }
    }
  },
  computed: {
    noChildren() {
      return this.menuData.filter(item => !item.children);
    },
    hasChildren() {
      return this.menuData.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }
}
.el-menu-item {
  text-align: left;
}
.el-submenu {
  text-align: left;
}
</style>
