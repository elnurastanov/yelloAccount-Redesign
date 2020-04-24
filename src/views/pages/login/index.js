import React, { Suspense } from 'react'
import './login.css'
import {
    Link, Route, Switch
} from "react-router-dom"
import { Layout, Input, Button, Spin } from 'antd'
import logo from '../../../assets/black.svg'

const { Content } = Layout;

const Register = React.lazy(() => import('../register'))

const Login = () => {
    return (
        <Layout className="Login__layout" style={{ height: "100vh" }}>
            <Content className="Login__layout__content" >
                <Suspense fallback={<Spin style={{ marginLeft: '50%', marginTop: '25%' }} size="large" />}>
                    <Switch>
                        <Route path="/Login">
                            <img src={logo} alt="logo" />
                            <Input className="layout__content" placeholder="İstifadəçi adı" style={{ width: 300 }} />
                            <Input.Password className="layout__content" placeholder="Şifrə" style={{ width: 300 }} />
                            <Button className="layout__content" type="primary" shape="round" size='middle' style={{ width: 200 }}>Daxil ol</Button>
                            <Link className="layout__content" to="/Register">Qeydiyyatdan keç</Link>
                        </Route>
                        <Route exact path="/Register" component={Register}>
                        </Route>
                    </Switch>
                </Suspense>
            </Content>
        </Layout>
    )
}

export default Login;