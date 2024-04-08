<template>
  <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
    <h3 v-if="this.$store.state.tab.isCollapse === false">图书馆后台管理系统</h3>
    <h3 v-else>图书馆</h3>

    <!-- 无子菜单 -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="subItem in item.children" :key="subItem.name" :index="subItem.name">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.name">{{ subItem.label }}</el-menu-item>
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
          label: '图书管理',
          icon: 's-home',
          children: [
            {
              path: '/book',
              name: 'book',
              label: '图书管理',
              icon: 's-home',
              url: 'book/book'
            },
            {
              path: '/category',
              name: 'category',
              label: '分类管理',
              icon: 's-home',
              url: 'category/category'
            },
          ]
        },
        {
          label: '图书服务',
          icon: 's-home',
          children: [
            {
              path: '/borrow',
              name: 'borrow',
              label: '借阅管理',
              icon: 's-home',
              url: 'borrow/borrow'
            },
            {
              path: '/return',
              name: 'return',
              label: '归还管理',
              icon: 's-home',
              url: 'return/return'
            },
            {
              path: '/renew',
              name: 'renew',
              label: '续借管理',
              icon: 's-home',
              url: 'renew/renew'
            }
          ]
        },
        {
          label: '数据分析',
          icon: 's-home',
          children: [
            {
              path: '/popularBookAnalysis',
              name: 'popularBookAnalysis',
              label: '热门图书分析',
              icon: 's-home',
              url: 'popularBookAnalysis/popularBookAnalysis'
            },
            // {
            //   path: '/borrowAnalysis',
            //   name: 'borrowAnalysis',
            //   label: '借阅统计分析',
            //   icon: 's-home',
            //   url: 'borrowAnalysis/borrowAnalysis'
            // },
            {
              path: '/bookAnalysis',
              name: 'bookAnalysis',
              label: '图书分类统计',
              icon: 's-home',
              url: 'bookAnalysis/bookAnalysis'
            },
            {
              path: '/bookCirculation',
              name: 'bookCirculation',
              label: '图书流通统计',
              icon: 's-home',
              url: 'bookCirculation/bookCirculation'
            }
          ]
        },
        {
          label: '系统管理',
          icon: 's-home',
          children: [
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 's-home',
              url: 'user/user'
            },
            {
              path: '/role',
              name: 'role',
              label: '角色管理',
              icon: 's-home',
              url: 'role/role'
            }
          ]
        },
        // {
        //   label: '其他',
        //   icon: 'location',
        //   children: [
        //     {
        //       path: '/about',
        //       name: 'about',
        //       label: '关于我们',
        //       icon: 's-home',
        //       url: 'about/about'
        //     },
        //     {
        //       path: '/contact',
        //       name: 'contact',
        //       label: '联系我们',
        //       icon: 's-home',
        //       url: 'contact/contact'
        //     }
        //   ]
        // }
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
