/*
 * @Description: file content
 * @Autor: zdJOJO
 * @Date: 2021-07-24 13:18:16
 * @LastEditors: zdJOJO
 * @LastEditTime: 2021-07-24 21:01:21
 * @FilePath: \antd-cms\src\App.tsx
 */
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect, HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { LOGIN } from '@route';

const IndexPage = lazy(() => import(/* webpackChunkName: 'app' */ './pages/app'));
const Login = lazy(() => import(/* webpackChunkName: 'login' */ './pages/Login'));

const App: React.FC<any> = () => {
  return (
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route path="/" component={IndexPage} />
          <Redirect from="/*" to={LOGIN} />
        </Switch>
      </Suspense>
    </HashRouter >
  )
}

export default hot(App);