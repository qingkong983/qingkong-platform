import { useEffect, useState } from 'react'
import { QuestionCircleOutlined } from '@ant-design/icons'
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom'
import { Button } from 'antd'
import defaultProps from './_defaultProps'
import logoPng from '../../assets/img/logo.png'
// import docsPng from '../../assets/img/docs.svg'

import './index.less'
import HelpButton from "../HelpButton";

const menuFooterRender = () => {
  return <div />
}

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  })
  const [pathname, setPathname] = useState('/coverage')
  const history = useNavigate()
  const rrLocation = useLocation()

  const menuItemRender = (item: any, dom: any) => {
    // console.log(item,1)
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
  }

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
    <div id="main-box">
      <ProLayout
        title="qingkong"
        logo={logoPng}
        route={defaultProps.route}
        location={{
          pathname,
        }}
        breadcrumbProps={{
          itemRender,
        }}
        menuFooterRender={menuFooterRender}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={menuItemRender}
        {...settings}
      >
        <PageContainer>
          <div>
            <Outlet />
              <HelpButton></HelpButton>
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
