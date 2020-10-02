import React, { lazy, memo, FC, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { RESOURCE_ROLE, RESOURCE_FUND } from '@route';

const Role = lazy(() => import(/* webpackChunkName: 'role' */'./Role'));
const Fund = lazy(() => import(/* webpackChunkName: 'fund' */'./Fund'));

interface IResource {

}

const Resource: FC<IResource> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={RESOURCE_ROLE} component={Role} />
          <Route exact path={RESOURCE_FUND} component={Fund} />
        </Switch>
      </Suspense>
    </>
  )
}

export default memo(Resource);