import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getStaff, deleteStaff } from '../../../../controller/StaffController'
import { List, Avatar, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import StaffModal from '../modal/modal'

const { confirm } = Modal;
const _getStaff = (setState, history) => {
    getStaff()
        .then(
            result => {
                setState(result.data)
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
}

function StaffLIst({ reload }) {

    const history = useHistory()
    //Staff modal
    const [visible, setVisible] = useState(false)
    const [idForModal, setidForModal] = useState(undefined)
    const [ListData, setListData] = useState([])

    useEffect(() => {
        if (reload) {
            _getStaff(setListData)
        }
    }, [reload])


    useEffect(() => {
        getStaff()
            .then(
                result => {
                    setListData(result.data)
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
    }, [history])

    function showConfirm(id) {
        confirm({
            title: 'Əmakdaşı azad etməyə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                deleteStaff(id)
                    .then(
                        result => {
                            if (result.status === 200) {
                                message.success('Əməkdaş işdən azad edildi');
                                _getStaff(setListData, history)
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
            },
            onCancel() { },
        });
    }

    return (
        <section className="StaffList">
            <List

                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}

                // style={{ width: 400, height: 396 }}
                dataSource={ListData}
                renderItem={item => (
                    <List.Item
                        key={item.id}
                        style={{ height: 50, paddingTop: 0, paddingBottom: 0, paddingLeft: 16, paddingRight: 16 }}
                        actions={
                            [
                                <span
                                    style={{ color: '#0466c8' }}
                                    key="list-loadmore-edit"
                                    onClick={() => {
                                        setVisible(true);
                                        setidForModal(item.id)
                                    }}
                                >Düzəliş et</span>,
                                <span
                                    style={{ color: '#d62828' }}
                                    key="list-loadmore-more"
                                    onClick={() => showConfirm(item.id)}
                                >İşdən azad et</span>
                            ]
                        }
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                            title={<span>{item.fullName}</span>}
                            description={item.fullMeta}
                        />
                    </List.Item>
                )}
            />
            <StaffModal
                visible={visible}
                onVisibleChange={(value) => setVisible(value)}
                getID={idForModal}
                refresh={() => _getStaff(setListData, history)}
            />
        </section>

    )
}

export default StaffLIst