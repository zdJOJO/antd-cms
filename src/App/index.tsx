import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { LOGIN, ROOT } from '@route';
import { PageLoading } from '@components';

// import './index.less';

const IndexPage = lazy(() => import(/* webpackChunkName: 'app' */ '../pages/app'));
const Login = lazy(() => import(/* webpackChunkName: 'login' */ '../pages/Login'));

const App: React.FC<any> = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path={LOGIN} component={Login} />
          <Route path={ROOT} component={IndexPage} />
          <Redirect from="/*" to={LOGIN} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}

export default hot(App);