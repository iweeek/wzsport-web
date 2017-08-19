/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import { Loading, Message } from 'element-ui'
import resources from './resources'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (resources.token) {  
        config.headers.Authorization = resources.token;
    }
    // element ui Loading方法
    console.log('http请求拦截器', config);
    return config
}, error => {
    Message.error({
        message: '加载超时'
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    console.log('http响应拦截器:', data)
    return data
}, error => {
    // if (error.response) {
    //     switch (error.response.status) {
    //         case 401:
    //             // 返回 401 清除token信息并跳转到登录页面
    //             sessionStorage.removeItem('token');
    //             router.replace({
    //                 path: 'login',
    //                 query: {redirect: router.currentRoute.fullPath}
    //             })
    //     }
    // }
    Message.error({
        message: `响应加载失败`
    })
    return Promise.reject(error);
})

export default axios