import React from 'react'
import { hot } from 'react-hot-loader/root';
import 'antd/dist/antd.less'


const App: React.FC<any> = () => {
  return (
    <div>
      Hellow World!
    </div>
  )
}

export default process.env.NODE_ENV === 'production' ? App : hot(App);