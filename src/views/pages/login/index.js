import React, { Suspense, useState } from 'react'
import './login.css'
import { Link, Route, Switch } from "react-router-dom"
import { loginUser } from '../../../controller/AuthController'
import appConfig from '../../../config/appconfig'
import { useHistory } from 'react-router-dom'
import { Layout, Input, Button, Spin, message } from 'antd'
import { UserOutlined, KeyOutlined } from '@ant-design/icons'
import logo from '../../../assets/black.svg'

const { Content } = Layout;

const Register = React.lazy(() => import('../register'))

const Login = () => {

    const history = useHistory()

    const [LoginData, setLoginData] = useState({
        username: undefined,
        password: undefined
    })

    const sendData = () => {
        if (LoginData.username && LoginData.password) {
            loginUser({
                username: LoginData.username,
                password: LoginData.password
            }).then(
                result => {
                    const userdata = JSON.stringify(result.data)
                    window.sessionStorage.setItem(appConfig.sessionStorage, userdata)
                    history.replace('/')
                }
            ).catch(
                error => {
                    if (error.response) {
                        const { data, status } = error.response;
                        if (status === 401) message.error(data.message)
                        if (status === 404) message.warn(data.message)
                        if (status === 500) history.replace('/500')

                    }
                    console.log(`Login Error => ${error}`)
                }
            )
        } else {
            message.warn('İstifadəçi adınızı və şifrənizi daxil edin')
        }
    }

    return (
        <Layout className="Login__layout" style={{ height: "100vh" }}>
            <Content className="Login__layout__content" >
                <Suspense fallback={<Spin style={{ marginLeft: '50%', marginTop: '25%' }} size="large" />}>
                    <Switch>
                        <Route path="/Login">
                            <img src={logo} alt="logo" />
                            <Input
                                className="layout__content"
                                placeholder="İstifadəçi adı"
                                style={{ width: 300 }}
                                prefix={<UserOutlined />}
                                value={LoginData.username}
                                onChange={event => setLoginData({ ...LoginData, username: event.target.value })}
                            />
                            <Input.Password
                                className="layout__content"
                                placeholder="Şifrə"
                                style={{ width: 300 }}
                                prefix={<KeyOutlined />}
                                value={LoginData.password}
                                onChange={event => setLoginData({ ...LoginData, password: event.target.value })}
                            />
                            <Button
                                className="layout__content"
                                type="primary"
                                shape="round"
                                size='middle'
                                style={{ width: 200 }}
                                onClick={() => sendData()}
                            >Daxil ol</Button>
                            <Link
                                className="layout__content"
                                to="/Register">Qeydiyyatdan keç</Link>
                        </Route>
                        <Route path="/Register" component={Register} ></Route>
                    </Switch>
                </Suspense>
            </Content>
        </Layout>
    )
}

export default Login;