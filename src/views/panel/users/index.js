import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserWithStaffId, deleteUser } from '../../../routes/UserController'
import ModifyUser from './modal/modifyUsers'
import { Table, Divider, message, Tag, Tooltip, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'

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
                if (error === 'Network Error') message.warning('Serverə qoşulma zamanı xəta baş verdi')
            }
        )
}

const Users = () => {

    const history = useHistory()
    const [ModalVisible, setModalVisible] = useState(false)
    const [IdForModal, setIdForModal] = useState(undefined)
    const [Data, setData] = useState([])
    const { confirm } = Modal

    useEffect(() => {
        getUserWithStaffId()
            .then(

                result => setData(result.data)

            ).catch(
                error => {
                    if (error.response) {
                        const { status } = error.response;
                        if (status === 500) history.replace('/500')

                    }
                    if (error === 'Network Error') message.warning('Serverə qoşulma zamanı xəta baş verdi')
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
            render: role => (
                <span>

                    {role.map(tag => {

                        let color = undefined;
                        if (tag === 'Super Admin') color = '#264653'
                        if (tag === 'Adminstrator') color = '#2A9D8F'
                        if (tag === 'Accountant') color = '#E9C46A'
                        if (tag === 'Human Resources') color = '#F4A261'
                        if (tag === 'Customer Services') color = '#E76F51'
                        if (tag === 'Employee') color = '#803227'

                        return (

                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>

                        );
                    })}

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
            ]
        },
        {
            title: 'Əməliyyatlar',
            key: 'action',
            render: (data) =>
                
                <div>
                    <span
                        style={{ color: '#0466c8', cursor: 'pointer' }}
                        onClick={() => {
                            setIdForModal(data.id);
                            setModalVisible(true);
                        }}
                    >

                        Düzəliş et

                    </span>

                    <Divider type="vertical" />

                    <span
                        style={{ color: '#d62828', cursor: 'pointer' }}
                        onClick={() => showDeleteConfirm(data.id)}
                    >

                        İstifadəçini sil

                    </span>
                </div>

        },
    ];

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
                visible={ModalVisible}
                onVisible={(value) => setModalVisible(value)}
                getID={IdForModal}
                refresh={() => {
                    _getUsers({
                        setState: setData,
                        history: history
                    })
                }}
            />
        </section>

    )
}

export default Users;