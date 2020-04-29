import React, { useState, useEffect } from 'react'
import './register.css'
import { getStaffByFIN } from '../../../routes/StaffController'
import { addUser } from '../../../routes/UserController'
import { useHistory } from "react-router-dom"
import { Input, Button, Progress, message } from 'antd'
import { UserOutlined, IdcardOutlined, KeyOutlined } from '@ant-design/icons'
import logo from '../../../assets/black.svg'

const { Search } = Input;

const Register = () => {

    const history = useHistory()
    const [StaffData, setStaffData] = useState({
        FIN: undefined,
        first_name: undefined,
        last_name: undefined,
        patronymic: undefined
    })
    const [RegisterData, setRegisterData] = useState({
        staffID: undefined,
        username: undefined,
        password: undefined
    })
    const [FormStatus, setFormStatus] = useState(true)
    const [Password, setPassword] = useState({
        first: undefined,
        second: undefined,
        checker: 'normal'
    })

    const getStaffData = (FIN) => {
        if (FIN === "") {
            message.warn('FIN kodunuzu daxil edin')
        } else {
            getStaffByFIN(FIN).then(
                result => {
                    setStaffData({
                        ...StaffData,
                        first_name: result.data.first_name,
                        last_name: result.data.last_name,
                        patronymic: result.data.patronymic
                    });
                    setRegisterData({
                        ...RegisterData,
                        staffID: result.data.id
                    });
                    setFormStatus(false);
                }
            ).catch(
                error => {
                    message.error('Xəta baş verdi');
                    console.log(`getStaffByFIN Error => ${error}`)
                }
            )
        }
    }

    // Password Check
    useEffect(() => {
        if (Password.second && Password.first) {
            if (Password.second === Password.first) {
                setPassword((Password) => { return { ...Password, checker: 'success' } });
                setRegisterData((RegisterData) => { return { ...RegisterData, password: Password.second } })
            } else {
                setPassword((Password) => { return { ...Password, checker: 'exception' } })
            }
        } else {
            setPassword((Password) => { return { ...Password, checker: 'normal' } })
        }
    }, [Password.first, Password.second])

    const sendData = () => {
        if (
            (RegisterData.username === undefined || RegisterData.username === "")
            ||
            Password.checker === 'normal'
        ) {
            message.warning('İstifadəçi adını və ya şifrənizi daxil edin')
        } else if (Password.checker === 'exception') {
            message.warning('Şifrənizin doğruluğunu yoxlayın')
        } else {
            addUser({
                staff_id: RegisterData.staffID,
                username: RegisterData.username,
                password: RegisterData.password
            }).then(
                result => {
                    if (result.status === 201) {
                        message.success('Uğurla qeydiyyatdan keçdiniz');
                        history.replace('/Login');
                    }
                }
            ).catch(
                error => {
                    if (error.response) {
                        const { status, data } = error.response;
                        if (status === 400) {
                            message.warn(data.error)
                        }
                    } else {
                        message.error('Xəta baş verdi');
                        console.error(`addUser Error => ${error}`);
                    }
                }
            )
        }
    }

    return (
        <div className="Register">
            <img src={logo} alt="logo" />
            <Search
                placeholder="FIN kodunuzu daxil edin"
                prefix={< IdcardOutlined />}
                onSearch={value => getStaffData(value)}
                enterButton
                style={{ width: 300 }}
            />
            <Input
                className="Register_content"
                placeholder="Ad"
                style={{ width: 300 }}
                prefix={<UserOutlined />}
                value={StaffData.first_name}
                disabled={FormStatus}
            />
            <Input
                className="Register_content"
                placeholder="Soyad"
                style={{ width: 300 }}
                prefix={<UserOutlined />}
                value={StaffData.last_name}
                disabled={FormStatus}
            />
            <Input
                className="Register_content"
                placeholder="Ata adı"
                style={{ width: 300 }}
                prefix={<UserOutlined />}
                value={StaffData.patronymic}
                disabled={FormStatus}
            />
            <Input
                className="Register_content"
                placeholder="İstifadəçi adı"
                style={{ width: 300 }}
                prefix={<UserOutlined />}
                value={RegisterData.username}
                onChange={(event) => setRegisterData({ ...RegisterData, username: event.target.value })}
                disabled={FormStatus}
            />
            <Input.Password
                className="Register_content"
                placeholder="Şifrənizi daxil edin"
                style={{ width: 300 }}
                value={Password.first}
                onChange={event => setPassword({ ...Password, first: event.target.value })}
                prefix={<KeyOutlined />}
                disabled={FormStatus}
            />
            <Progress
                className="Register_content__footer"
                percent={100}
                status={Password.checker}
                showInfo={false}
                style={{ width: 300 }} size='small' />
            <Input.Password
                className="Register_content__footer"
                placeholder="Şifrənizi təkrar daxil edin"
                style={{ width: 300 }}
                value={Password.second}
                onChange={event => setPassword({ ...Password, second: event.target.value })}
                prefix={<KeyOutlined />}
                disabled={FormStatus}
            />
            <Button
                className="Register_content"
                type="primary"
                shape="round"
                size='middle'
                style={{ width: 200 }}
                onClick={() => sendData()}
                disabled={FormStatus}
            >Qeydiyyatdan keç</Button>
        </div>
    )
}

export default Register;