import React, { FC, memo, useState } from 'react'

interface IHome {

}

const Home: FC<IHome> = (props) => {
  return (
    <>
      首页
    </>
  )
}

export default memo(Home);