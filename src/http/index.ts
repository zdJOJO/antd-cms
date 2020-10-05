/*
 * @Description: 异步请求全局设置
 * @Version: 2.0
 * @Autor: zhangding
 * @Date: 2020-08-21 22:49:22
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-10-05 15:00:43
 */

import { message } from 'antd';
import axios from 'axios';

const BASE_URL = '/api';

const instance = axios.create({
  // baseURL: BASE_URL,
  timeout: 30000
})

// 自定义拦截器
// 请求拦截器
instance.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    return config;
  },
  error => {
    return Promise.reject(error.response);
  });

// 响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) {
      return response;
    } else {
      // Toast.offline('网络出现问题');
      return
    }
  },
  error => {
    message.error(`${error} 😢`);
    console.log(`${error} 😢`);
    return;
  });




/**
 * @description: 二次封装
 * @param {type}
 * @return {type}
 * @author: zdJOJO
 */

let msg = '';
const http = {
  get: function (url: string, isForm?: boolean, isMsg?: boolean): any {
    return instance.get(url)
      .then(response => {
        console.log(22222222222);
        console.log(response);
        if (response.data.status === 0) {
          if (response.data.list.length > 0) {
            if (isMsg) {
              msg = `为您跟新${response.data.list.length} 条信息 😀`;
              message.info(msg, 2)
              console.log(msg);
            }
          } else {
            msg = '已无更多信息 🙂';
            message.info(msg, 2)
          }
          return response.data
        } else {
          msg = `${response.data.message} 😢`;
          message.error(msg);
          return
        }
      }).catch(err => {
        msg = `请求失败${err} 😢`;
        console.log(msg);
        return Promise.reject(err)
      })
  },

  post: function (url: string, param: any, isForm = false): any {
    let contentType = 'application/json;charset=UTF-8';
    if (isForm) {
      contentType = 'application/x-www-form-urlencoded';
    }
    return instance.post(
      url,
      param,
      {
        headers: {
          'Content-Type': contentType
        }
      })
      .then(response => {
        if (response.data.status === 0) {
          return {
            successful: response.data.status === 0,
            msg: response.data.message
          }
        } else {
          msg = `${response.data.message} 😢`;
          message.error(msg);
          return
        }
      }).catch(err => {
        msg = `请求失败${err} 😢`;
        console.log(msg);
        return Promise.reject(err)
      })
  },
  delete: function () {
    // todo
  },
  put: function () {
    // todo
  }
}

export default http;