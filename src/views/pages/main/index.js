import React, { useState, Suspense, useEffect } from 'react';
import './main.css'
import { Switch, Route, Link, Redirect } from "react-router-dom";
import appConfig from '../../../config/appconfig'
import { Layout, Menu, Spin, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  ContactsOutlined,
  TeamOutlined,
  BankOutlined,
  UserSwitchOutlined,
  DownOutlined,
  LogoutOutlined,
  PartitionOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const Organization = React.lazy(() => import('../../panel/organization'));
const Salary = React.lazy(() => import('../../panel/salary'));
const Staff = React.lazy(() => import('../../panel/staff'));
const Contact = React.lazy(() => import('../../panel/contact'))
const Users = React.lazy(() => import('../../panel/users'))



function Main() {

  const [collapsed, setCollapsed] = useState(true)
  const [Userdata, setUserdata] = useState({
    staff: undefined
  })
  const [userRole, setuserRole] = useState({
    sa: false,
    admin: false,
    account: false,
    hr: false,
    cs: false,
    employee: false
  })
  const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage))
  const roles = temp.role.split(",")


  function toggle() {
    setCollapsed(!collapsed)
  }


  useEffect(() => {


    setUserdata((Userdata) => {
      return {
        ...Userdata,
        staff: temp.staff,
        role: temp.role.split(",")
      }
    });

    roles.map(data => {
      if (data === "Super Admin") setuserRole((userRole) => { return { ...userRole, sa: true } })
      if (data === "Adminstrator") setuserRole((userRole) => { return { ...userRole, admin: true } })
      if (data === "Accountant") setuserRole((userRole) => { return { ...userRole, account: true } })
      if (data === "Human Resources") setuserRole((userRole) => { return { ...userRole, hr: true } })
      if (data === "Customer Services") setuserRole((userRole) => { return { ...userRole, cs: true } })
      if (data === "Employee") setuserRole((userRole) => { return { ...userRole, employee: true } })
    })

  }, [])

  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            {
              userRole.employee ?

                <Menu.Item key="1" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/"></Link>
                  <UserOutlined />
                  <span>Dashboard</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin ?

                <Menu.Item key="2" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Organization"></Link>
                  <BankOutlined />
                  <span>Təşkilat</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="3" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Bank"></Link>
                  <UploadOutlined />
                  <span>Bank</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="4" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Treasure"></Link>
                  <UploadOutlined />
                  <span>Xəzinə</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="5" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Buy"></Link>
                  <UploadOutlined />
                  <span>Alış</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="6" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Sale"></Link>
                  <UploadOutlined />
                  <span>Satış</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="7" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/ADV"></Link>
                  <UploadOutlined />
                  <span>ƏDV</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="8" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/QMA"></Link>
                  <UploadOutlined />
                  <span>QMA</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.account ?

                <Menu.Item key="9" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Salary"></Link>
                  <ContactsOutlined />
                  <span>Əmək haqqı</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.hr ?

                <Menu.Item key="10" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Staff"></Link>
                  <TeamOutlined />
                  <span>Kadrlar</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin || userRole.cs ?

                <Menu.Item key="11" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Contact"></Link>
                  <UserSwitchOutlined />
                  <span>Kontakt</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin ?

                <Menu.Item key="12" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Monitor"></Link>
                  <UploadOutlined />
                  <span>Monitor</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa || userRole.admin ?

                <Menu.Item key="13" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Leader"></Link>
                  <UploadOutlined />
                  <span>Rəhbər üçün</span>
                </Menu.Item> :

                null
            }
            {
              userRole.sa ?

                <Menu.Item key="14" style={{ height: "3rem", lineHeight: "3rem" }}>
                  <Link to="/Users"></Link>
                  <PartitionOutlined />
                  <span>İstifadəçilər</span>
                </Menu.Item> :

                null

            }


          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: 0, display: 'flex', justifyContent: 'space-between' }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <Dropdown
              placement='bottomCenter'
              trigger='click'
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() => {

                      window.location.href = '/';
                      window.sessionStorage.removeItem(appConfig.sessionStorage)

                    }}>
                    <span >

                      <LogoutOutlined />&nbsp;Çıxış

                  </span>
                  </Menu.Item>
                </Menu>
              }
            >
              <span
                className="ant-dropdown-link"
                onClick={e => e.preventDefault()}
                style={{ fontWeight: 500, cursor: 'pointer', paddingRight: 24 }}
              >

                {Userdata.staff} <DownOutlined />

              </span>
            </Dropdown>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <Suspense fallback={<Spin style={{ marginLeft: '50%', marginTop: '25%' }} size="large" />}>
              <Switch>
                <Redirect exact from='/' to='/Dashboard' />

                <Route exact path="/Dashboard" component={() => <h1>Dashboard</h1>} />
                <Route exact path="/Organization" component={Organization} />
                <Route exact path="/Bank" component={() => <h1>Bank</h1>} />
                <Route exact path="/Treasure" component={() => <h1>Treasure</h1>} />
                <Route exact path="/Buy" component={() => <h1>Buy</h1>} />
                <Route exact path="/Sale" component={() => <h1>Sale</h1>} />
                <Route exact path="/ADV" component={() => <h1>ADV</h1>} />
                <Route exact path="/QMA" component={() => <h1>QMA</h1>} />
                <Route exact path="/Salary" component={Salary} />
                <Route exact path="/Staff" component={Staff} />
                <Route path="/Contact" component={Contact} />
                <Route exact path="/Monitor" component={() => <h1>Monitor</h1>} />
                <Route exact path="/Leader" component={() => <h1>Leader</h1>} />
                <Route exact path="/Users" component={Users} />

                <Redirect from='*' to='/404' />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Main;