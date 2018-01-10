import fetch from 'utils/fetch';
import store from '../store/index'
// import router from '../router/index';

const getStore = (name) => {
  return store.state[name]
}

const userStore = getStore('user');

//登录；
const login = obj => {
  const data = {
    username: obj.username,
    password: obj.password,
    jurisdiction: obj.jurisdiction
  };
  return fetch({
    url: '/loginpost',
    method: 'post',
    data
  });
};

const register = obj => {
  return fetch({
    url: '/login/register',
    method: 'post',
    data: obj
  });
}


// 拉取用户信息；
const postUserinfo = token => {
  return fetch({
    url: '/userinfo',
    method: 'post',
    data: token,
    Authorization: true
  })
}

// 登出；
const logout = data => {
  return fetch({
    url: '/login/logout',
    method: 'get',
    data
  });
}

//  添加用户；
const addMerber = data => {
  return fetch({
    url: '/merber/add',
    method: 'post',
    data
  })
}
// 查询用户列表；
const merberList = (data = {}) => {
  data.token = userStore.token;
  return fetch({
    url: '/merber/list',
    method: 'post',
    data
  })
}
// 删除用户
const merberRemove = (data) => {
  return fetch({
    url: '/merber/remove',
    method: 'post',
    data
  })
}
// 修改用户；
const merberEdit = (data) => {
  return fetch({
    url: '/merber/edit',
    method: 'post',
    data
  })
}
// 查询用户信息；
const merberInfo = (data = {}) => {
  data.token = userStore.token;
  return fetch({
    url: '/merber/info',
    method: 'post',
    data
  })
}

const getInfo = (token) => {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

const booksAdd = (data) => {
  var data = data;
  data.token = userStore.token;
  return fetch({
    url: '/books/add',
    method: 'post',
    data
  });
}

const booksGet = (data) => {
  var data = data;
  data.token = userStore.token;
  return fetch({
    url: '/books/get',
    method: 'post',
    data
  });
}


const bookGetId = (data) => {
  var data = data;
  data.token = userStore.token;
  return fetch({
    url: '/books/getID',
    method: 'post',
    data
  });
}
const bookDelete = (data) => {
  var data = data;
  data.token = userStore.token;
  return fetch({
    url: '/books/delete',
    method: 'post',
    data
  });
}

export default {
  login,
  logout,
  getInfo,
  postUserinfo,
  register,
  addMerber,
  merberList,
  merberRemove,
  merberEdit,
  merberInfo,
  booksGet,
  booksAdd,
  bookGetId,
  bookDelete
}