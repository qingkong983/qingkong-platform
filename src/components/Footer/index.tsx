import React from 'react'
import './index.less'
import logoSvg from '../../assets/img/logo.svg'
import { Footer } from "antd/es/layout/layout";

export default () => {
  return (
    <div className={'footer'}>
      <Footer style={{ textAlign: 'center' }}>Canyon ©2021 Created by tzhangm</Footer>
    </div>
  )
}
