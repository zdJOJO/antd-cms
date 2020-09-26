/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2020-08-30 16:32:06
 * @LastEditors: zdJOJO
 * @LastEditTime: 2020-09-26 18:42:46
 * @FilePath: \antd-cms\src\index.tsx
 */

import React from 'react'
import ReactDOM from 'react-dom';
import {
  // BrowserRouter as Router
  HashRouter as Router
} from "react-router-dom";

import App from './App';

// 当导航需要确认时执行的函数
const getUserConfirmation = (message: string, callback: any) => {
  callback(console.log(message))
}

// 用来判断本地浏览器是否支持刷新
const supportsHistory = "pushState" in window.history;




ReactDOM.render(

  <Router
    getUserConfirmation={getUserConfirmation}
  >
    <App />
  </Router>

  , document.getElementById('root')
);