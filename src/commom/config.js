import axios from 'axios'
import store from '../store'
import router from '../router'
const service = axios.create({
    baseURL: '/api', // api的base_url
    timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    config.isForm ?
        config.headers["content-type"] = "application/x-www-form-urlencoded" :
        config.headers["content-type"] = "application/json"
    return config
}, error => {
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => {
        if(response.data.error === '999999'){
            router.push('/login')
        }
        return response.data
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function post(url, params = {}, isForm = false) {
    return new Promise((resolve, reject) => {
        service({
            url,
            method: 'post',
            data: params,
            isForm
        }).then(response => {
            resolve(response)
        }).catch(error => {
            store.dispatch('changeloadingAsy', false);
            store.dispatch('changeshowerrorAsy');
            reject(error)
        })
    })
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns Promise
 */
export function get(url, params = {}, isForm = false) {
    return new Promise((resolve, reject) => {
        service({
            url,
            method: 'get',
            params: params,
            isForm
        }).then(response => {
            resolve(response)
        }).catch(error => {
            store.dispatch('changeloadingAsy', false)
            store.dispatch('changeshowerrorAsy')
            reject(error)
        })
    })
}