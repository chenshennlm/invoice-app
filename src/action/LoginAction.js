import axios from 'axios';
import { baseURL } from '../router/baseURL';

/**
 * 验证账号密码
 * @param {string} account 
 * @param {string} password 
 */
export function verifyAccount(account='', password='') {
    const param = {
        account: account,
        password: password
    }
    return new Promise((resolve, reject) => {
        axios.post(baseURL + 'verifyAccount', param)
            .then(res => {
                //将获取数据 同个 Promise 格式传递回 Page A
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}

/**
 * 根据手机号得到验证码
 * @param {*} phoneNumber 
 */
export function getCodeByPhone(phoneNumber=''){
    const param = {
        phoneNumber: phoneNumber
    }
    return new Promise((resolve, reject) => {
        axios.post(baseURL + 'getCodeByPhone',param)
            .then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}