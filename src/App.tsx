import React, { lazy, Suspense } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import 'antd/dist/antd.less'


const App: React.FC<any> = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <div>
      Hellow World!
  </div>
  </Suspense>
)

export default App