import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserWithId, editUserRoles } from '../../../../controller/UserController'
import { Modal, Button, Checkbox, Divider, message } from 'antd'

const CheckboxGroup = Checkbox.Group;

const ModifyUser = ({ visible, onVisible = (value) => { }, getID, refresh = () => { } }) => {
    
    const history = useHistory()
    const [Userdata, setUserdata] = useState({
        id: undefined,
        username: undefined,
        role: undefined
    })
    const plainOptions = ["Employee", "Super Admin", "Adminstrator", "Accountant", "Human Resources", "Customer Services"]
    const [Check, setCheck] = useState({
        checkedList: [],
        indeterminate: false,
        checkAll: false,
    })

    useEffect(() => {

        if (visible)
            getUserWithId(getID)
                .then(
                    result => {

                        if (result.status === 200) {
                            setUserdata((Userdata) => {
                                return {
                                    ...Userdata,
                                    id: getID,
                                    username: result.data.username,
                                    role: result.data.role
                                }
                            });
                            setCheck((Check) => {
                                return {
                                    ...Check,
                                    checkedList: result.data.role
                                }
                            })
                        }
                    }
                )
                .catch(
                    error => {
                        if (error.response) {
                            const { status } = error.response;
                            if (status === 500) history.replace('/500')
    
                        }
                    }
                )

    }, [visible, getID, history])

    const sendData = () => {

        editUserRoles({
            id: Userdata.id,
            role: Userdata.role
        }).then(
            result => {

                const data = result.data;
                message.success(data.message);
                refresh();
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

    return (
        <div>
            <Modal
                title="İstifadəçinin rolu"
                visible={visible}
                onCancel={() => onVisible(false)}
                footer={[
                    <Button key="back" onClick={() => onVisible(false)}>
                        Bağla
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => sendData()}>
                        Məlumatları yenilə
                    </Button>,
                ]}
            >
                <p style={{ fontWeight: 500 }}>İstifadəçi : {Userdata.username}</p>
                <div className="UsersRoles__checkbox" style={{ marginTop: '2rem' }}>
                    <p style={{ fontWeight: 500 }}>Rolu : </p>
                    <Checkbox
                        indeterminate={Check.indeterminate}
                        onChange={
                            (e) => {
                                setCheck({
                                    checkedList: e.target.checked ? plainOptions : [],
                                    indeterminate: false,
                                    checkAll: e.target.checked,
                                });
                                setUserdata({ ...Userdata, role: e.target.checked ? plainOptions : [] })
                            }
                        }
                        checked={Check.checkAll}
                    >
                        Hamısını seç
                    </Checkbox>
                    <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                    <CheckboxGroup
                        options={plainOptions}
                        value={Check.checkedList}
                        onChange={
                            (checkedList) => {
                                setCheck({
                                    ...Check,
                                    checkedList,
                                    indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
                                    checkAll: checkedList.length === plainOptions.length
                                });
                                setUserdata({ ...Userdata, role: checkedList })
                            }}
                    />
                </div>

            </Modal>
        </div >
    )
}

export default ModifyUser;