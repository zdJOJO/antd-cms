import React, { lazy, useState, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import {
  Header,
  Sider,
  Footer,
  Breadcrumbs
} from '@components';
import { ROOT, VTABLE, SETTING } from '@route';
import { menus } from '@route/menus';

const Home = lazy(() => import(/* webpackChunkName: 'home' */'../Home'))
const Setting = lazy(() => import(/* webpackChunkName: 'setting' */'../Setting'))
const VTable = lazy(() => import(/* webpackChunkName: 'vatable' */'../VirtualTable'))
import Resource from '../Resource';

import classes from './index.less';


const { Content } = Layout

const IndexPage = (): any => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  function handleToggle() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ height: '100vh' }}>

      <Sider
        menus={menus}
        collapsed={collapsed}
      />

      <Layout>
        <Header
          collapsed={collapsed}
          toggle={handleToggle}
        />

        <Content className={classes.content}>
          <Breadcrumbs menus={menus} />
          <div className={classes.mainContent}>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path={ROOT} component={Home} />
                <Route exact path={VTABLE} component={VTable} />
                <Route exact path={SETTING} component={Setting} />
                <Resource />
              </Switch>
            </Suspense>
          </div>
        </Content>

        <Footer />

      </Layout>
    </Layout >
  )
}

export default IndexPage;