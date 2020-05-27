import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import appConfig from '../../../config/appconfig'
import { panelAuth } from '../../../routes/AuthController'
import { getUserWithStaffId, deleteUser, activateUser } from '../../../routes/UserController'
import ModifyUser from './modal/modifyUsers'
import EditUserPassword from './modal/editUserPassword'
import { Table, Divider, message, Tag, Tooltip, Modal } from 'antd'
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined, KeyOutlined, UpCircleOutlined } from '@ant-design/icons'

const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage)).role

const _getUsers = ({ setState, history }) => {
    getUserWithStaffId()
        .then(
            result => setState(result.data)
        )
        .catch(
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 500) history.replace('/500')

                }
            }
        )
}

const Users = () => {

    const history = useHistory()
    const [ModalVisible, setModalVisible] = useState({
        modifyUserRole: false,
        editUserPassword: false
    })
    const [IdForModal, setIdForModal] = useState(undefined)
    const [Data, setData] = useState([])
    const { confirm } = Modal

    useEffect(() => {

        panelAuth({
            panel: 'users',
            userRole: temp.split(',')
        }).then(
            result => null
        ).catch(
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 403) history.replace('/403')

                }
            }
        )

        getUserWithStaffId()
            .then(

                result => setData(result.data)

            ).catch(
                error => {
                    if (error.response) {
                        const { status } = error.response;
                        if (status === 500) history.replace('/500')

                    }
                }
            )
    }, [history])

    const columns = [
        {
            title: 'İstifadəçi adı',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Əməkdaş',
            dataIndex: 'staff_fullname',
            key: 'staff',
            render: (staff_fullname, data) =>

                <Tooltip title={data.staff_meta}>
                    <span
                        style={{ color: '#0466c8', cursor: 'pointer' }}
                    >{staff_fullname}</span>
                </Tooltip>
        },
        {
            title: 'Rolu',
            key: 'role',
            dataIndex: 'role',
            render: (role, data) => (
                <span>

                    {data.status === "Aktiv"
                        ? role.map(tag => {

                            let color = undefined;
                            if (tag === 'Super Admin') color = '#264653'
                            if (tag === 'Adminstrator') color = '#2A9D8F'
                            if (tag === 'Accountant') color = '#E9C46A'
                            if (tag === 'Human Resources') color = '#F4A261'
                            if (tag === 'Customer Services') color = '#E76F51'
                            if (tag === 'Employee') color = '#803227'

                            return (

                                <Tag color={color} key={tag} style={{ marginBottom: 5 }}>
                                    {tag.toUpperCase()}
                                </Tag>

                            );
                        })
                        : role.map(tag => {

                            let color = undefined;
                            if (tag === 'Super Admin') color = '#595959'
                            if (tag === 'Adminstrator') color = '#595959'
                            if (tag === 'Accountant') color = '#595959'
                            if (tag === 'Human Resources') color = '#595959'
                            if (tag === 'Customer Services') color = '#595959'
                            if (tag === 'Employee') color = '#595959'

                            return (

                                <Tag color={color} key={tag} style={{ marginBottom: 5 }}>
                                    {tag.toUpperCase()}
                                </Tag>

                            );
                        })
                    }



                </span>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                {
                    text: 'Aktiv',
                    value: 'Aktiv',
                },
                {
                    text: 'Deaktiv',
                    value: 'Deaktiv',
                }
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Əməliyyatlar',
            key: 'action',
            render: (data) =>

                <div>
                    {

                        data.status === "Aktiv"
                            ?
                            <div>

                                <Tooltip title="Düzəliş et">
                                    <EditOutlined
                                        style={{ color: '#0466c8', cursor: 'pointer', fontSize: 17 }}
                                        onClick={() => {
                                            setIdForModal(data.id);
                                            setModalVisible({ ...ModalVisible, modifyUserRole: true });
                                        }}
                                    />
                                </Tooltip>


                                <Divider type="vertical" />

                                <Tooltip title="Şifrəni dəyiş">

                                    <KeyOutlined
                                        style={{ color: '#eb5e28', cursor: 'pointer', fontSize: 17 }}
                                        onClick={() => {
                                            setIdForModal(data.id);
                                            setModalVisible({ ...ModalVisible, editUserPassword: true })
                                        }}
                                    />

                                </Tooltip>


                                <Divider type="vertical" />

                                <Tooltip title="İstifadəçini sil">

                                    <DeleteOutlined
                                        style={{ color: '#d62828', cursor: 'pointer', fontSize: 17 }}
                                        onClick={() => showDeleteConfirm(data.id)}
                                    />

                                </Tooltip>

                            </div>
                            :
                            <Tooltip title="Aktiv et">

                                <UpCircleOutlined
                                    style={{ color: '#00a896', cursor: 'pointer', fontSize: 17 }}
                                    onClick={() => showActivateConfirm(data.id)}
                                />

                            </Tooltip>

                    }
                </div>


        },
    ];

    const showActivateConfirm = (id) => {
        confirm({
            title: 'İstifadəçini aktivləşdirməyə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>

                    <span>Aktiv olunmuş istifadəçi yenidən sistemə giriş edə biləcək.</span>

                </div>
            ),
            okText: 'Bəli',
            okType: 'primary',
            cancelText: 'Xeyr',
            onOk() {

                activateUser({
                    id: id
                }).then(
                    result => {

                        const { status, data } = result
                        if (status === 200) {

                            message.success(data.message);
                            _getUsers({ setState: setData, history: history })

                        }

                    }
                ).catch(
                    error => {

                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/500')

                        }

                    }
                )
            },
            onCancel() { },
        });
    }

    const showDeleteConfirm = (id) => {
        confirm({
            title: 'İstifadəçini deaktiv etməyə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            content: (
                <div>
                    <span>Istifadəçi haqqında məlumatlar silinməyəcək.</span>
                    <br />
                    <span>Deaktiv olunmuş istifadəçi sistemə giriş edə bilməyəcək!</span>
                </div>
            ),
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                deleteUser({
                    id: id
                }).then(
                    result => {

                        const { status, data } = result
                        if (status === 200) {
                            message.success(data.message);
                            _getUsers({ setState: setData, history: history })
                        }

                    }
                ).catch(
                    error => {

                        if (error.response) {
                            const { status } = error.response;
                            if (status === 500) history.replace('/500')

                        }
                        if (error === 'Network Error') message.warning('Serverə qoşulma zamanı xəta baş verdi')

                    }
                )
            },
            onCancel() { },
        });
    }

    return (
        <section className="Users">
            <Table
                style={{ fontWeight: 500 }}
                columns={columns}
                size="middle"
                dataSource={Data}
                pagination={{ position: ["bottomCenter"] }}
            />
            <ModifyUser
                visible={ModalVisible.modifyUserRole}
                onVisible={(value) => setModalVisible({ ...ModalVisible, modifyUserRole: value })}
                getID={IdForModal}
                refresh={() => {
                    _getUsers({
                        setState: setData,
                        history: history
                    })
                }}
            />
            <EditUserPassword
                visible={ModalVisible.editUserPassword}
                onVisible={(value) => setModalVisible({ ...ModalVisible, editUserPassword: value })}
                getID={IdForModal}
            />
        </section>

    )
}

export default Users;