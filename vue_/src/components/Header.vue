<template>
  <navbar>
    <!-- 小屏幕的三横button -->
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <!-- 采用媒体查询，做成响应式的图标； -->
    <a class="navbar-brand" ></a>
        <!-- 大屏幕的三横button -->
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler"  @click="sidebarMinimize">&#9776;</a>
      </li>
    </ul>

    <ul class="nav navbar-nav d-md-down-none" style='display: none;'>
      <li class="nav-item header-item">
          <router-link tag="div" to='/'  style="height:55px;" class="nav-link">
            <p><Icon type="compose" size='30' color="#2d8cf0"></Icon></p>
            <p  style="color:white"> 留言管理 </p>
        </router-link> 
      </li>
      <li class="nav-item header-item">
        <router-link tag="div" to='/home1'  style="height:55px;" class="nav-link">
            <p><Icon type="stats-bars" size='30' color="#2d8cf0"></Icon></p>
            <p  style="color:white"> 浏览排行 </p>
        </router-link> 
      </li>

   <li class="nav-item header-item">
      <!-- dropdown是鼠标移入出现下拉列表事件；  -->
      <Dropdown>
      <router-link tag="div" to='/'  style="height:55px;" class="nav-link">
            <p><Icon type="android-cloud" size='30' color="#2d8cf0"></Icon></p>
            <p  style="color:white"> 云服务器 </p>
        </router-link>
        <DropdownMenu slot="list">
            <DropdownItem>Linux</DropdownItem>
            <DropdownItem>Mac OS X</DropdownItem>
            <DropdownItem>Windows</DropdownItem>
            
            <DropdownItem>Core OS</DropdownItem>
        </DropdownMenu>
    </Dropdown>

      </li>
      <li class="nav-item header-item">
         <router-link tag="div" to='/home1'  style="height:55px;" class="nav-link">
            <p><Icon type="trophy" size='30' color="#2d8cf0"></Icon></p>
            <p  style="color:white"> 销量排行 </p>
        </router-link> 
      </li>
    </ul>


    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item d-md-down-none">
        <a class="nav-link" ><Icon type="android-notifications" size="20"></Icon><span class="badge badge-pill badge-danger"></span></a>
      </li>
      <!-- 鼠标移入出现下拉， 个人头像事件； -->
      <Dropdown class="nav-item">
        <a href="javascript:void(0)">
           <span slot="button">
          <img :src="avatar" class="img-avatar" alt="o" style='width: 50px; height: 50px;'>
          <span class="d-md-down-none">{{username}}</span>
          </span>
        </a>
        <Dropdown-menu slot="list">
            <Dropdown-item >
                <router-link :to="{ path: '/merber/details', query: { username: $store.state.user.userinfo.username } }">
                  <p  class="dropdown-itemp"><Icon type="power"></Icon>setting</p>
                </router-link>
            </Dropdown-item>
        </Dropdown-menu>
        <Dropdown-menu slot="list">
            <Dropdown-item > <a href="" @click="Logout"  ><p  class="dropdown-itemp"><Icon type="power"></Icon>Logout</p></a></Dropdown-item>
        </Dropdown-menu>
    </Dropdown>

 
      <li class="nav-item d-md-down-none" style='display: none;'>
        <a class="nav-link navbar-toggler aside-menu-toggler"  @click="asideToggle">&#9776;</a>
      </li>
    </ul>
  </navbar>
</template>
<script>

import navbar from './Navbar'
import login from "../api/login";
import Cookies from 'js-cookie'
import tools from '../utils/tools'
import { mapState } from 'vuex'
let clearLogout = tools.clearLogout;
export default {
  name: 'header',
  components: {
    navbar,
  },
  methods: {
    Logout(e){
        // 登出
        this.vFetch.logout({ token: this.$store.state.user.token }).then(res => {
            if (res.status == 200) {
              clearLogout();
              this.$router.push({ path: '/login' });
            }
        }).catch(err => {
          if (err) {
            this.$Message.error(err)
          }
        });
      e.preventDefault();
    },
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()

      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    }
  },
  computed: mapState({
    avatar: state =>  {
      return state.user.userinfo.avatar;
    },
    username: state =>  {
      return state.user.userinfo.username;
    }
  })
}
</script>

<style type="text/css" scoped>
  .dropdown-itemp{
    text-align: left;
    font-size: 15px;
    padding: 10px;
  }
 .header-item .ivu-dropdown-item{
  padding: 15px;
}
  .header-item{
    width: 130px;
    /*background-color: #20a8d8;*/
    /*background-color: white;*/

    height: 55px;
    
    
  }
  .header-item a{
        color:white !important;

  }

</style>
