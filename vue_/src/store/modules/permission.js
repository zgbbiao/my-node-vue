import { asyncRouterMap, constantRouterMap } from 'src/router';


/* 获取sessinoStoage中的state；
  @params: name state的 key;
*/
const getState = name => {
  let stateStorage = JSON.parse(sessionStorage.getItem('state')) || {};
  return stateStorage[name] || {}
};

const getPermissionState= () => {
  return getState('permission');
}
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

const setPermissionState = (state) => {
  setState('permission', state);
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(jurisdiction, route) {
  // 判断当前路由信息中的mate是否存在， 并且是否存在某个用户才能看见？；
  if (route.meta && route.meta.jurisdiction.length) {
    //Array.some  遍历数组；calback参数有 值， 索引， 数组， 如果找到， 则返回真， 否则返回false;
    // 遍历role中的权限者;

    return  route.meta.jurisdiction.some(role => {   
      return jurisdiction === role 
    })
  } else {
    return false 
  }
  // else {
  //   // 默认返回ture;
  //   return true
  // }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param jurisdiction  权限
 */
function filterAsyncRouter(asyncRouterMap, jurisdiction) {
  // Array.filter; 过滤数据， 并返回一个新数组；
  const accessedRouters = asyncRouterMap.filter(route => {
    // 进行过滤； 将用户名和route对象详细 传过去；
    if (hasPermission(jurisdiction, route)) { // 如果路由表内的权限内找到了用户；
      if (route.children && route.children.length) { // 如果存在路由子路由；
        route.children = filterAsyncRouter(route.children, jurisdiction) //将新的路由数组赋值给子路由；
      }
      return true;
    } else {
      return false //没找到用户则返回false;
    }
  })
  return accessedRouters // 返回行测属于数组；
}


function getNowRouter(asyncRouterMap, to) {
  // 进行路由匹配， 如果存在，路由表， 否则，进行路由表的子路由表进行再次判断；
  return asyncRouterMap.some(route => {
      if (to.path.indexOf(route.path) !== -1) {
          return true;
      } else if (route.children && route.children.length) { //如果有孩子就遍历孩子
        return getNowRouter(route.children, to)
      }
  })
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: getPermissionState().addRouters || [],
    siderbar_routers: getPermissionState().siderbar_routers
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      setPermissionState(state);
    },
    SETR_ROUTER: (state, router) => {
      state.routers = router;
      setPermissionState(state);
    },
    SET_NOW_ROUTERS: (state, to) => {
        // 递归访问 新添加的路由，找到包含to 的那个路由对象，设置给siderbar_routers 面包屑；
        state.addRouters.forEach(e => {
          if (e.children && e.children.length) {
              if (getNowRouter(e.children, to) === true)
                  state.siderbar_routers = e;
          }
        })
     }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { jurisdiction } = data;
        //判断是否存在根据 权限获取路由表；
        let accessedRouters = filterAsyncRouter(asyncRouterMap, jurisdiction)
        commit('SET_ROUTERS', accessedRouters);
        resolve(accessedRouters);
      })
    },
  getNowRoutes({ commit }, data) {
      return new Promise(resolve => {
        //data => to
        commit('SET_NOW_ROUTERS', data);
        resolve();
      })
  },
   },
};

export default permission;
