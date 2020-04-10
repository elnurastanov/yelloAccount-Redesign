import React, { useState, Suspense } from 'react';
import './App.css';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Layout, Menu, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  UploadOutlined,
  ContactsOutlined,
  TeamOutlined,
  BankOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const Organization = React.lazy(() => import('./panel/organization'));
const Salary = React.lazy(() => import('./panel/salary'));
const Staff = React.lazy(() => import('./panel/staff'));

function App() {

  const [collapsed, setCollapsed] = useState(true)
  function toggle() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="App">
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/"></Link>
              <UserOutlined />
              <span>Dashboard</span>
            </Menu.Item>
            <Menu.Item key="2" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Organization"></Link>
              <BankOutlined />
              <span>Təşkilat</span>
            </Menu.Item>
            <Menu.Item key="3" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Bank"></Link>
              <UploadOutlined />
              <span>Bank</span>
            </Menu.Item>
            <Menu.Item key="4" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Treasure"></Link>
              <UploadOutlined />
              <span>Xəzinə</span>
            </Menu.Item>
            <Menu.Item key="5" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Buy"></Link>
              <UploadOutlined />
              <span>Alış</span>
            </Menu.Item>
            <Menu.Item key="6" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Sale"></Link>
              <UploadOutlined />
              <span>Satış</span>
            </Menu.Item>
            <Menu.Item key="7" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Sale"></Link>
              <UploadOutlined />
              <span>Satış</span>
            </Menu.Item>
            <Menu.Item key="8" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/QMA"></Link>
              <UploadOutlined />
              <span>QMA</span>
            </Menu.Item>
            <Menu.Item key="9" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Salary"></Link>
              <ContactsOutlined />
              <span>Əmək haqqı</span>
            </Menu.Item>
            <Menu.Item key="10" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Staff"></Link>
              <TeamOutlined />
              <span>Kadrlar</span>
            </Menu.Item>
            <Menu.Item key="11" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Monitor"></Link>
              <UploadOutlined />
              <span>Monitor</span>
            </Menu.Item>
            <Menu.Item key="12" style={{ height: "3rem", lineHeight: "3rem" }}>
              <Link to="/Leader"></Link>
              <UploadOutlined />
              <span>Rəhbər üçün</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280
            }}
          >
            <Suspense fallback={<Spin style={{marginLeft:'50%', marginTop: '25%'}} size="large" />}>
              <Switch>
                <Route exact path="/" component={() => <h1>Dashboard</h1>} />
                <Route exact path="/Organization" component={Organization} />
                <Route exact path="/Bank" component={() => <h1>Bank</h1>} />
                <Route exact path="/Treasure" component={() => <h1>Treasure</h1>} />
                <Route exact path="/Buy" component={() => <h1>Buy</h1>} />
                <Route exact path="/Sale" component={() => <h1>Sale</h1>} />
                <Route exact path="/ADV" component={() => <h1>ADV</h1>} />
                <Route exact path="/QMA" component={() => <h1>QMA</h1>} />
                <Route exact path="/Salary" component={Salary} />
                <Route exact path="/Staff" component={Staff} />
                <Route exact path="/Monitor" component={() => <h1>Monitor</h1>} />
                <Route exact path="/Leader" component={() => <h1>Leader</h1>} />
              </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;