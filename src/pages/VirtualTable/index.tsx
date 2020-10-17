import React, { lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { VTABLE_BIGDATA, VTABLE_DRAGDROP, VTABLE_EDITABLE, VTABLE_SELF } from '@route';
import { PageLoading } from '@components';

const BigData = lazy(() => import(/* webpackChunkName: 'bigdata' */'./BigData'));
const DropDrag = lazy(() => import(/* webpackChunkName: 'dragdrop' */'./DropDrag'));
const Editable = lazy(() => import(/* webpackChunkName: 'editable' */'./Editable'));
const SelfTable = lazy(() => import(/* webpackChunkName: 'selftable' */'./SlefTable'));

const VirtualTable = (): any => {
  return (
    <>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route exact path={VTABLE_BIGDATA} component={BigData} />
          <Route exact path={VTABLE_DRAGDROP} component={DropDrag} />
          <Route exact path={VTABLE_EDITABLE} component={Editable} />
          <Route exact path={VTABLE_SELF} component={SelfTable} />
        </Switch>
      </Suspense>
    </>
  )
}

export default VirtualTable;