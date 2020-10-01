import React, { lazy, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import {
  Header,
  Sider,
  Footer
} from '@components';
import { RESOURCE, VTABLE, SETTING } from '@route';
import { menus } from '@route/menus';

const Home = lazy(() => import(/* webpackChunkName: 'home' */'../Home'))
const Resource = lazy(() => import(/* webpackChunkName: 'resource' */'../Resource'))
const Setting = lazy(() => import(/* webpackChunkName: 'setting' */'../Setting'))
const VTable = lazy(() => import(/* webpackChunkName: 'vatable' */'../VirtualTable'))


const { Content } = Layout

const IndexPage = (): any => {

  const [collapsed, setCollapsed] = useState<boolean>(false);

  function handleToggle() {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider
        menus={menus}
        collapsed={collapsed}
      />
      <Layout>
        <Header
          collapsed={collapsed}
          history={history}
          toggle={handleToggle}
        />
        <Content>
          {/* <Breadcrumb /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path={RESOURCE} component={Resource} />
            <Route exact path={VTABLE} component={VTable} />
            <Route exact path={SETTING} component={Setting} />
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default IndexPage;