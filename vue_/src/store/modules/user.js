import { loginByEmail, logout } from '../../api/login';
import Cookies from 'js-cookie';
/* 获取sessinoStoage中的state；
  @params: name state的 key;
*/
const getState = name => {
  let stateStorage = JSON.parse(sessionStorage.getItem('state')) || {};
  return stateStorage[name] || {}
};
// 保存数据
/*
  功能： 保存state到本地；
  @params: name state的key
  @params: state  state[key] 的value;
*/
const setState = (name, state) => {
  let stateStorage = JSON.parse(sessionStorage.getItem('state')) || {};
  stateStorage[name] = state;
  sessionStorage.setItem('state', JSON.stringify(stateStorage));
}

const clearState = (state) => {
  sessionStorage.setItem('state', JSON.stringify(state));
}

const setUserState = (state) => {
  setState('user', state);
}

let resetState = {
  user: '',
  status: '',
  email: '',
  username: '',
  password: '',
  code: '',
  uid: '',
  auth_type: '',
  token: '',
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userinfo: {},
  setting: {
    articlePlatform: []
  }
}

const user = {
  state: {
    user: getState('user').user || '',
    status: getState('user').status || '',
    email: getState('user').email || '',
    username: getState('user').username || '',
    password: getState('user').password || '',
    code: getState('user').code || '',
    uid: getState('user').uid || '',
    auth_type: getState('user').auth_type || '',
    token: getState('user').token || '',
    name: getState('user').name || '',
    avatar: getState('user').avatar || '',
    introduction: getState('user').introduction || '',
    roles: getState('user').roles || [],
    userinfo: getState('user').userinfo || {},
    setting: {
      articlePlatform: getState('user').setting && getState('user').setting.articlePlatform || []
    }
  },
  mutations: {
    SET_AUTH_TYPE: (state, type) => {
      state.auth_type = type;
      setUserState(state);
    },
    SET_CODE: (state, code) => {
      state.code = code;
      setUserState(state);
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
      setUserState(state);
    },
    SET_UID: (state, uid) => {
      state.uid = uid;
      setUserState(state);
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
      setUserState(state);
    },
    SET_USERNAME: (state, username) => {
      state.username = username;
      setUserState(state);
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
      setUserState(state);
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
      setUserState(state);
    },
    SET_STATUS: (state, status) => {
      state.status = status;
      setUserState(state);
    },
    SET_NAME: (state, name) => {
      state.name = name;
      setUserState(state);
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
      setUserState(state);
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
      setUserState(state);
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
      setUserState(state);
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
      setUserState(state);
    },
    SET_RESETSTATE: state => {
      state = Object.assign(state, resetState);
      clearState(state);
    }
  },

  actions: {
    // 邮箱登录
    // LoginByEmail({ commit }, userInfo) {
    //   const email = userInfo.email.trim();
    //   return new Promise((resolve, reject) => {
    //     loginByEmail(email, userInfo.password).then(response => {
    //       const data = response.data;
    //       Cookies.set('Admin-Token', response.data.token);
    //       commit('SET_TOKEN', data.token);
    //       commit('SET_EMAIL', email);
    //       resolve();
    //     }).catch(error => {
    //       reject(error);
    //     });
    //   });
    // },

    // 第三方验证登录
    LoginByThirdparty({ commit, state }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
          commit('SET_TOKEN', response.data.token);
          Cookies.set('Admin-Token', response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        Cookies.remove('Admin-Token');
        alert("has logout");
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        Cookies.set('Admin-Token', role);
        resolve();
      })
    }
  }
};

export default user;
