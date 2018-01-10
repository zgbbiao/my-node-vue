import axios from 'axios';
// import store from '../store';
// import vue from 'vue';
// import router from '../router';
console.log('process.env.BASE_API');
console.log(process.env.BASE_API);
import store from '../store/modules/user';


// process.env.BASE_API = 'http://127.0.0.1:3000/login';
// let headers = new Headers();   
// headers.append('Accept', 'application/json');
// headers.append('Content-Type', 'application/json;charset=UTF-8')


// const service = (obj = {}) => {
//     console.log(obj);
//     let url = `${process.env.BASE_API}${obj.url}`;
//     return window.fetch(url, {
//       method: obj.method,
//       headers,
//       credentials: 'include',
//       body: JSON.stringify(obj.data)
//     })
// }

// const service = (obj = {}) => {
//   console.log(obj);
//   let url = `${process.env.BASE_API}${obj.url}`;
//   return axios({
//     url,
//     method: obj.method,
//     data: obj.data,
//     timeout: 5000,
//     auth: {
//       username: obj.data.username
//     }
//   })
// }

const service = (obj = {}) => {
  let url = `${process.env.BASE_API}${obj.url}`;
  let options = {};
  if (obj.method === 'post') {
    options = {
      url,
      method: obj.method,
      data: obj.data,
      timeout: 5000,
      auth: {
        username: obj.data.username
      }
    }
  } else if (obj.method === 'get'){
    options = {
      url,
      method: obj.method,
      timeout: 5000,
      params: obj.data || {}
    }
  }
  return axios(options)
}
axios.interceptors.response.use(response => {
  var obj = {};
  for (var key in response) {
    if (key !== 'config' && key !== 'headers' && key !== 'request') {
      obj[key] = response[key]
    }
  }
  return obj.data;
}, err => {
  return Promise.reject(err);
})



// 创建axios实例
// const service = axios.create({
//   // baseURL: process.env.BASE_API, // api的base_url
//   baseURL: '127.0.0.1:3000',
//   timeout: 5000                  // 请求超时时间
// });

// // request拦截器
// service.interceptors.request.use(config => {
//   console.log(config);
//   // Do something before request is sent
//   if (store.getters.token) {
//     // config.headers['X-Token'] = store.getters.token;  让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
//     config.headers.authorization = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key  ; 
//   }
//   return config;
// }, error => {
//   // Do something with request error
//   console.log(error); // for debug
//   Promise.reject(error);
// })

// // respone拦截器
// service.interceptors.response.use(
//   response => response,
//   /**
//   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//   */
// //  const res = response.data;
// //     if (res.code !== 20000) {
// //       Message({
// //         message: res.message,
// //         type: 'error',
// //         duration: 5 * 1000
// //       });
// //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
// //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
// //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
// //           confirmButtonText: '重新登录',
// //           cancelButtonText: '取消',
// //           type: 'warning'
// //         }).then(() => {
// //           store.dispatch('FedLogOut').then(() => {
// //             location.reload();// 为了重新实例化vue-router对象 避免bug
// //           });
// //         })
// //       }
// //       return Promise.reject(error);
// //     } else {
// //       return response.data;
// //     }
//   error => {
//     console.log('err' + error);// for debug
//     vue.$Message.error({
//                     message: error.message,
//                     duration: 5 * 1000,
//                     closable: true
//                 });
//     return Promise.reject(error);
//   }
// )

export default service;
