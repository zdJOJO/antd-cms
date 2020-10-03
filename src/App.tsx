import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

import { LOGIN } from '@route';

const IndexPage = lazy(() => import(/* webpackChunkName: 'app' */ './pages/app'));
const Login = lazy(() => import(/* webpackChunkName: 'login' */ './pages/Login'));

const App: React.FC<any> = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path={LOGIN} component={Login} />
            <Route path="/" component={IndexPage} />
            <Redirect from="/*" to={LOGIN} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  )
}

export default hot(App);