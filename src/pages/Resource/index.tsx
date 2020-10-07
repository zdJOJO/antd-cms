import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { RESOURCE_ROLE, RESOURCE_FUND } from '@route';
import { PageLoading } from '@components';

const Role = lazy(() => import(/* webpackChunkName: 'role' */'./Role'));
const Fund = lazy(() => import(/* webpackChunkName: 'fund' */'./Fund'));

const Resource = (): any => {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path={RESOURCE_ROLE} component={Role} />
          <Route exact path={RESOURCE_FUND} component={Fund} />
        </Switch>
      </Suspense>
    </>
  )
}

export default Resource;