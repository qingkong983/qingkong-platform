import React, { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from "@ant-design/icons";
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import defaultProps from './_defaultProps'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import logoPng from "../../assets/img/logo.png";
import docsPng from "../../assets/img/docs.svg";

import './index.less'

export default () => {

  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  })
  const [pathname, setPathname] = useState('/coverage')
  const history = useNavigate()
  const rrLocation = useLocation()

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    )
  }

  useEffect(() => {
    setPathname(rrLocation.pathname)
  }, [rrLocation.pathname])
  return (
    <div
      id="main-box">
      <ProLayout
        title={'Canyon'}
        logo={logoPng}
        {...defaultProps}
        location={{
          pathname,
        }}
        breadcrumbProps={{
          itemRender,
        }}
        menuFooterRender={(props) => {
          return (
            <a
              style={{
                lineHeight: '48rpx',
                display: 'flex',
                height: 48,
                color: 'rgba(255, 255, 255, 0.65)',
                alignItems: 'center',
              }}
              href=""
              target="_blank"
              rel="noreferrer"
            >
              <img
                alt="pro-logo"
                src={docsPng}
                style={{
                  width: 16,
                  height: 16,
                  margin: '0 16px',
                  marginRight: 10,
                }}
              />
              {!props?.collapsed && '使用文档'}
            </a>
          )
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item: any, dom) => {
          console.log(item,1)
          return (
            <a
              onClick={() => {
                setPathname(item.path || '/coverage')
                history(item.path)
              }}
            >
              {dom}
            </a>
          )
        }}
        rightContentRender={() => (
          <div>
            <span className={'right-content-index-action'} onClick={()=>{}}>
              <QuestionCircleOutlined style={{color:'#000',fontSize:'16px'}} />
            </span>
          </div>
        )}
        {...settings}
      >
        <PageContainer
        >
          <div>
            <Outlet />
          </div>
        </PageContainer>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting)
        }}
        disableUrlParams
      />
    </div>
  )
}
