import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserWithStaffId } from '../../../routes/UserController'
import { Table, Divider, message, Tag, Tooltip } from 'antd'


const Users = () => {

    const history = useHistory()
    const [ModalVisible, setModalVisible] = useState({
        staffMeta: false,
        modifyUser: false
    })
    const [IdForModal, setIdForModal] = useState(undefined)
    const [Data, setData] = useState([])

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
                        onClick={() => setModalVisible({ ...ModalVisible, staffMeta: true })}

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
            title: 'Əməliyyatlar',
            key: 'action',
            render: () =>
                <div>
                    <span style={{ color: '#0466c8' }}>Düzəliş et</span>
                    <Divider type="vertical" />
                    <span style={{ color: '#d62828' }}>İstifadəçini sil</span>
                </div>

        },
    ];

    return (
        <section className="Users">
            <Table
                style={{ fontWeight: 500 }}
                columns={columns}
                size="middle"
                dataSource={Data}
                pagination={{ position: ["bottomCenter"] }}
            />
        </section>

    )
}

export default Users;