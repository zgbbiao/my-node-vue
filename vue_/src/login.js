import router from './router'
import store from './store'
import vue from 'vue'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import vFetch from './api/login'
import Cookies from 'js-cookie';
import  tools from './utils/tools'
let clearLogout = tools.clearLogout;
// register global progress.
const whiteList = ['/login', '/authredirect']// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start() // 开启Progress
  let isRouter = 0;
  if (store.getters.token) { // 判断是否有token
    if (to.path === '/login') {
      clearLogout();
      next({ path: '/' })
    } else if (from.path === '/login') {
      vFetch.postUserinfo({ token: store.state.user.token, username: store.state.user.username }).then(res => {
        if (res.status === 200) {
          store.state.routers = {};
          // 保存用户信息；
          store.commit('SET_USERINFO', res.res);
          const jurisdiction = res.res.jurisdiction;
          // 进行权限验证；
          store.dispatch('GenerateRoutes', { 'jurisdiction': jurisdiction }).then(res2 => { // 生成可访问的路由表
            router.addRoutes(res2) // 动态添加可访问路由表
            next() // hack方法 确保addRoutes已完成
          })
        } else if (res.status === 0) {
          // 请求失败， 返回登录页；
          clearLogout();
          router.push({ path: '/login' })
        }
      }).catch(err => {
        if (err) {
          clearLogout()
          router.push({ path: '/login' })
        }
      })
    } else {
      if (!isRouter) {
        var jurisdiction = store.state.user.userinfo.jurisdiction;
        // 进行权限验证；
        store.dispatch('GenerateRoutes', { 'jurisdiction': jurisdiction }).then(res2 => { // 生成可访问的路由表
          router.addRoutes(res2) // 动态添加可访问路由表
          next(to.path) // hack方法 确保addRoutes已完成
        })
        isRouter++;
      }

      // 当已经存在路由表， 便对路由表进行控制， 返回侧边栏的目录；
      store.dispatch('getNowRoutes', to);
    }
    
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      clearLogout()
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
