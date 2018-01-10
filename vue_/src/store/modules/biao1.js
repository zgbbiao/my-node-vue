import { loginByEmail, logout, getInfo } from 'api/login';
const biao1 = {
  state: {
    token: '',
    email: ''
  },
  mutations: {
    BIAO1_SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_EMAIL: (state, email) => {
      state.email = email;
    }
  },
  actions: {
    SetToken({ commit }, token) {
          commit('BIAO1_SET_TOKEN', token);  // 通过mutaion方法保存到state内；
      },
      SetEmail({ commit }, email) {
        commit('SET_EMAIL', email);
      }
    },
};

export default biao1;
