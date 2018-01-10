import api from './api'
let token = '';
// 不带认证头的头部；
let headers = new  Headers();   
//带认证头的头部
let headers2 = new Headers();   
// 添加到不带认证头的头部；
headers.append('Accept', 'application/json');
headers.append('Content-Type',  "application/json;charset=UTF-8");
//添加到带认证头的头部；
headers2.append('Accept', 'application/json');
headers2.append('Content-Type',  "application/json;charset=UTF-8");
headers2.append('authorization', token);

export const loginPost = ( data = {}, callback = () => {} ) => {


        //  window.fetch( api.login+ "?" + JSON.stringify(data) , { method: 'GET', headers: {
        //     // 'Accept': 'application/json',
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        //     'Content-Type': 'application/json',
        //     // 'mode': 'no-cors',  //跨域时使用，
        //     // 'cache': 'default', 
        // }, 

       window.fetch( api.loginpost,
            { 
                method: 'post',
                headers: headers, 
                //跨域请求需要带cookie时， 添加该性， 并设置值为Include; same-origin 表示同源； same-origin: 表示cookie只能同域发送，不能跨域发送
                credentials: 'include',
                body:  JSON.stringify(data), 
            }
        ).then( res => res.json())  //需要两次then才能拿到返回的数据； 转换为json；
        .then(function(res){
            　　callback( null, res );
            })
        .catch( (err)=> {
            callback(err);
        } )
};

export const register = ( data, callback = () => {} ) => {
    if(!data) return;
    window.fetch( api.loginput, {method: "PUT", 
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
        }, 
        credentials: 'include',
        body: JSON.stringify(data),
    } )
    .then(res => res.json())
    .then((res) => {
        callback(null, res);
    })
    .catch(err => {
        callback(err);
    }) 
}
