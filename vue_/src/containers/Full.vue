<template>
  <div class="app">
    <!-- 顶部导航 -->
    <AppHeader/>
    <div class="app-body">
      <!-- 侧边栏 -->
      <Sidebar/>
      <main class="main">
        <!-- 面包屑 -->
        <breadcrumb :list="list"/>
        <!-- 内容 -->
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <!-- 侧边栏内容 -->
      <AppAside/>
    </div>
    <!-- 底部版权内容 -->
    <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '../components/Header'
import Sidebar from '../components/Sidebar'
import AppAside from '../components/Aside'
import AppFooter from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  computed: {
    name () {
      //当前路由的名字；
      console.log('this.$route.name');
      alert(this.$route.name);
      // return this.$route.name
      return "name"
    },
    list () {
      // 一个数组，包含当前路由的所有嵌套路径片段的 路由记录
      return this.$route.matched
    }
  }
}
</script>
