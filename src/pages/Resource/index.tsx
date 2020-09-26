import React, { lazy, memo, FC, Suspense, useState } from 'react'
import { Switch, Route } from 'react-router-dom'


const Role = lazy(() => import(/* webpackChunkName: 'home' */'./Role'));
const Fund = lazy(() => import(/* webpackChunkName: 'home' */'./Fund'));

interface IResource {

}

const Resource: FC<IResource> = (props) => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/app/resource/roleManage" component={Role} />
          <Route exact path="/app/resource/fundManage" component={Fund} />
        </Switch>
      </Suspense>
    </>
  )
}

export default memo(Resource);