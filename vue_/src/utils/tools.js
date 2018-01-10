import Cookies from 'js-cookie';
import store from '../store/index';

/*
    事件过滤；
*/
const filterDate = (date) => {
    if (!date) {
        return ;
    }
    date = new Date(date)
    let y = date.getFullYear()
    let m = date.getMonth()
    let d = date.getDate();
    m = m >= 10 ? m : `0${m}`;
    d = d >= 10 ? d : `0${d}`;
    return `${y}-${m}-${d}`;
}

//设置登录状态

const setLogin = (res) => {
    Cookies.set('Admin-Token', res.token);
    store.commit('SET_TOKEN', res.token);
    store.commit('SET_USERNAME', res.data.username);
    sessionStorage.setItem("state", JSON.stringify(store.state));
}

// 登出清除内容；
const clearLogout = () => {
        Cookies.remove('Admin-Token');
        store.commit('SET_RESETSTATE');
        window.location.reload() // 防止切换用户却拿不到路由表；
}

export default {
    filterDate,
    clearLogout,
    setLogin
}
