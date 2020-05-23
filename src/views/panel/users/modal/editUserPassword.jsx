import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { addNewUserPassword } from '../../../../routes/UserController'
import { Modal, Button, Input, message } from 'antd'

const NewUserPassword = ({ visible, getID, onVisible = (value) => { } }) => {

    const history = useHistory()
    const [UserPassword, setUserPassword] = useState(undefined)

    const sendData = () => {

        if (!UserPassword) message.warn("Yeni şifrə boş ola bilməz")
        if (UserPassword) {

            addNewUserPassword({
                id: getID,
                password: UserPassword
            }).then(
                result => {

                    const resultMessage = result.data.message

                    message.success(resultMessage);
                    setUserPassword(undefined);
                    onVisible(false);

                }
            ).catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/500');

                    }
                }
            )

        }

    }

    return (

        <Modal
            visible={visible}
            title="Yeni şifrə"
            onOk={() => { }}
            onCancel={() => onVisible(false)}
            footer={[
                <Button key="back" onClick={() => onVisible(false)}>
                    Bağla
            </Button>,
                <Button key="submit" type="primary" onClick={() => sendData()}>
                    Təsdiqlə
            </Button>,
            ]}
        >
            <p>Istifadəçinin yeni şifrəsi</p>
            <Input.Password
                placeholder="Yeni şifrəni daxil edin"
                style={{ width: 300 }}
                value={UserPassword}
                onChange={(event) => setUserPassword(event.target.value)}
            />
        </Modal>

    )
}

export default NewUserPassword;