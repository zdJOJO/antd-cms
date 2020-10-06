import React, { lazy, useState, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import {
  Header,
  Sider,
  Footer,
  Breadcrumbs
} from '@components';
import { ROOT, VTABLE, SETTING, RESOURCE } from '@route';
import { menus } from '@route/menus';

const Home = lazy(() => import(/* webpackChunkName: 'home' */'../Home'))
const Setting = lazy(() => import(/* webpackChunkName: 'setting' */'../Setting'))
import VTable from '../VirtualTable';
import Resource from '../Resource';
import { PageLoading } from '@components';

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
          <div id="pageContainer" className={classes.mainContent}>
            <Suspense fallback={<PageLoading />}>
              <Switch>
                <Route exact path={ROOT} component={Home} />
                <Route exact path={SETTING} component={Setting} />
                <Route path={RESOURCE} component={Resource} />
                <Route path={VTABLE} component={VTable} />
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