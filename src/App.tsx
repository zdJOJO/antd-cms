import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader/root';

const IndexPage = lazy(() => import(/* webpackChunkName: 'app' */ './pages/app'));
const Login = lazy(() => import(/* webpackChunkName: 'login' */ './pages/Login'));

const App: React.FC<any> = () => {
  return (
    <>
      <HashRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route path="/" component={IndexPage} />
            <Redirect from="/*" to="/login" />
          </Switch>
        </Suspense>
      </HashRouter>
    </>
  )
}

export default hot(App);