import axios from 'axios';
import { baseURL } from '../router/baseURL';

/**
 * 检查该账号是否存在
 * @param {*} account 
 */
export function checkAccount(account='') {
    const param = {
        account,
    }
    return new Promise((resolve, reject) => {
        axios.post(baseURL + 'checkAccount', param)
            .then(res => {
                //将获取数据 同个 Promise 格式传递回 Page A
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}