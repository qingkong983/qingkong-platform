import React, { Suspense } from 'react'
import { Layout, Menu, Spin } from "antd";
import './index.less'
import { TableOutlined, CodepenOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Footer from './../Footer'
const { Content, Sider, Header } = Layout
import { ApartmentOutlined } from '@ant-design/icons'
import { useNavigate,Outlet } from "react-router-dom";
import logoPng from "../../assets/img/logo.png";


export default (props: any) => {
  const history = useNavigate()
  return (
    <div id="main-box">
      <Layout className={'layout-wrap'}>
        <Sider width={208} theme={'light'} className={'left-sider'}>
          <div className={'logo'} onClick={()=>history('/')}>
            <img src={logoPng} alt="" />
            <span>Canyon</span>
          </div>
          {/*导航栏*/}
          <Menu
            theme="light"
            defaultSelectedKeys={['1']}
            mode="inline"
            onSelect={(val) => {
              history('/' + val.keyPath.reverse().join('/'))
            }}
          >
            <Menu.Item key="project" icon={<TableOutlined />}>
              项目列表
            </Menu.Item>
            <Menu.Item key="code-house" icon={<CodepenOutlined />}>
              Git Source
            </Menu.Item>
            <Menu.Item key="admin" icon={<ApartmentOutlined />}>
              个人中心
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{height:'48px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div className={'l'}></div>
            <div className={'r'}>
              <div className={'right-content-index-action'} onClick={()=>{}}>
                <QuestionCircleOutlined style={{color:'#fff',fontSize:'16px'}} />
              </div>
            </div>

          </Header>
          <Content style={{ margin: '16px 16px' }}>
            <div className="site-layout-background" style={{}}>
              <Outlet />
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </div>
  )
}
