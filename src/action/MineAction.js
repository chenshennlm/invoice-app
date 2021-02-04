import axios from 'axios';
import { baseURL } from '../router/baseURL';

/**
 * 根据账号得到“我的”页面相关信息
 * @param {*} account 
 */
export function getMineDetail(account='') {
    const param = {
        account,
    }
    return new Promise((resolve, reject) => {
        axios.post(baseURL + 'getMineDetail', param)
            .then(res => {
                //将获取数据 同个 Promise 格式传递回 Page A
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}

/**
 * 得到“我的凭证”页面凭证列表
 * @param {*} account 
 * @param {*} year 
 * @param {*} month 
 * @param {*} tabs 标签卡的位置 0：全部 1：有效 2：无效
 */
export function getInvoiceList(start=0, size=8, account='',year, month, tabs) {
    const param = {
        account,year,month,tabs
    }
    return new Promise((resolve, reject) => {
        axios.post(baseURL + 'getInvoiceList', param)
            .then(res => {
                //将获取数据 同个 Promise 格式传递回 Page A
                resolve(res.data)
            }).catch(err => {
                reject(err.data)
            })
    })
}