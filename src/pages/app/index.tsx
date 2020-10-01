import React, { lazy, memo, Suspense, useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import {
  Header,
  Sider,
  Footer
} from '../../components';

import { menus } from '../../route/menus';

const Home = lazy(() => import(/* webpackChunkName: 'home' */'../Home'))
const Resource = lazy(() => import(/* webpackChunkName: 'resource' */'../Resource'))
const Setting = lazy(() => import(/* webpackChunkName: 'home' */'../Setting'))
const VTable = lazy(() => import(/* webpackChunkName: 'home' */'../VirtualTable'))


const { Content } = Layout

const IndexPage = () => {

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
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/app/resource" component={Resource} />
              <Route exact path="/app/vtable" component={VTable} />
              <Route exact path="/app/setting" component={Setting} />
            </Switch>
          </Suspense>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default memo(IndexPage);