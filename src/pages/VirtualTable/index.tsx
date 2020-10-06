import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { VTABLE_BIGDATA, VTABLE_DRAGDROP } from '@route';
import { PageLoading } from '@components';

const BigData = lazy(() => import(/* webpackChunkName: 'bigdata' */'./BigData'));
const DropDrag = lazy(() => import(/* webpackChunkName: 'dragdrop' */'./DropDrag'));

const VirtualTable = (): any => {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path={VTABLE_BIGDATA} component={BigData} />
          <Route exact path={VTABLE_DRAGDROP} component={DropDrag} />
        </Switch>
      </Suspense>
    </>
  )
}

export default VirtualTable;