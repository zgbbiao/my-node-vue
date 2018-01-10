const api = 'http://localhost:3000/';
// const api = "http://116.196.97.115/;"
let login = `${api}login`;
let loginpost = `${api}loginpost`;
let loginput =  `${api}loginput`;
let fetGetUserinfo = `${api}getuserinfo`;
module.exports = {
    login, loginpost, loginput , fetGetUserinfo
}