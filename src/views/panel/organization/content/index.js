import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getDepartments, deleteDepartments, getPositions, deletePositions, getOrganizationCounts } from '../../../../controller/OrganizationController'
import AddDeapartmentModal from '../modal/department/addDepartment'
import ModifyDeapartmentModal from '../modal/department/modifyDepartment'
import AddPositionModal from '../modal/position/addPosition'
import ModifyPositionModal from '../modal/position/modifyPositions'
import { List, Button, Descriptions, Modal, message } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;


const _getdepartments = (setState, history) => {
    getDepartments()
        .then(result => setState(result.data))
        .catch(
            error => {
                if (error.response) {

                    const { status } = error.response;
                    if (status === 500) history.replace('/500')

                }
            }
        )
}

const _getpositions = (setState, history) => {
    getPositions()
        .then(result => setState(result.data))
        .catch(
            error => {
                if (error.response) {

                    const { status } = error.response;
                    if (status === 500) history.replace('/500')

                }
            }
        )
}

const _getorganizationCounts = (setstate, history) => {
    getOrganizationCounts()
        .then(result => setstate(result.data))
        .catch(
            error => {
                if (error.response) {

                    const { status } = error.response;
                    if (status === 500) history.replace('/500')

                }
            }
        )
}

function Content() {

    const history = useHistory()
    const [ContentModalVisible, setContentModalVisible] = useState({
        addDepartment: false,
        modifyDepartment: false,
        addPosition: false,
        modifyPosition: false
    })
    const [departmentData, setdepartmentData] = useState([])
    const [IdForModal, setIdForModal] = useState('')
    const [positionData, setpositionData] = useState([])
    const [OrganizationCount, setOrganizationCount] = useState({})

    useEffect(() => {

        getDepartments()
            .then(result => setdepartmentData(result.data))
            .catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/')

                    }
                }
            );

        getPositions()
            .then(result => setpositionData(result.data))
            .catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/')

                    }
                }
            )

        getOrganizationCounts()
            .then(result => setOrganizationCount(result.data))
            .catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/')

                    }
                }
            )
    }, [history])

    function showDepartmentDeleteConfirm(id) {
        confirm({
            title: 'Bu departamenti silməyinizə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            content: 'Şirkətlə bağlı bütün məlumatlar silinəcək!',
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                deleteDepartments(id).then(result => {
                    if (result.status === 200) {
                        message.success('Şirkət uğurla silindi');
                        _getdepartments(setdepartmentData, history);
                        _getorganizationCounts(setOrganizationCount, history)
                    }
                })
            },
            onCancel() { },
        });
    }

    function showPositionDeleteConfirm(id) {
        confirm({
            title: 'Bu vəzifənii silməyinizə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            content: 'Vəzifə ilə bağlı bütün məlumatlar silinəcək!',
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                deletePositions(id)
                    .then(
                        result => {
                            if (result.status === 200) {
                                message.success('Vəzifə uğurla silindi');
                                _getpositions(setpositionData, history);
                                _getorganizationCounts(setOrganizationCount, history)
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
        <div className="Organization__content">

            <div className="Organization__column">

                <Button
                    type="primary"
                    // style={{ width: 300 }}
                    icon={<PlusCircleOutlined />}
                    onClick={() => { setContentModalVisible({ ...ContentModalVisible, addDepartment: true }) }} block>
                    Departament əlavə et
                    </Button>

                <div className="Organization__scroll">

                    <List
                        dataSource={departmentData}
                        renderItem={(item, index) => (
                            <List.Item
                                key={index}
                                actions={
                                    [<p
                                        style={{ color: '#0466c8' }}
                                        key="list-edit"
                                        onClick={() => {
                                            setIdForModal(item.id);
                                            setContentModalVisible({ ...ContentModalVisible, modifyDepartment: true });
                                        }}
                                    >Edit</p>,

                                    <p
                                        style={{ color: '#d62828' }}
                                        key="list-remove"
                                        onClick={() => showDepartmentDeleteConfirm(item.id)}
                                    >Remove</p>]
                                }
                            >
                                <List.Item.Meta

                                    title={<p>{item.department_name}</p>}
                                    description={item.company_name}

                                />
                            </List.Item>
                        )}
                    >
                    </List>

                </div>

                <AddDeapartmentModal
                    AddDepartmentVisible={ContentModalVisible.addDepartment}
                    onAddDepartmentVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, addDepartment: value })}
                    refresh={() => {
                        _getdepartments(setdepartmentData, history);
                        _getorganizationCounts(setOrganizationCount, history)
                    }}
                />

                <ModifyDeapartmentModal
                    ModifyDepartmentVisible={ContentModalVisible.modifyDepartment}
                    onModifyDepartmentVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, modifyDepartment: value })}
                    getID={IdForModal}
                    refresh={() => {
                        _getdepartments(setdepartmentData, history);
                        _getorganizationCounts(setOrganizationCount, history)
                    }}
                />

            </div>

            <div className="Organization__column">

                <Button
                    type="primary"
                    // style={{ width: 300 }}
                    icon={<PlusCircleOutlined />}
                    onClick={() => { setContentModalVisible({ ...ContentModalVisible, addPosition: true }) }} block>
                    Vəzifə əlavə et
                    </Button>

                <div className="Organization__scroll">
                    <List
                        dataSource={positionData}
                        renderItem={item => (
                            <List.Item
                                key={item.id}
                                actions={
                                    [<p
                                        style={{ color: '#0466c8' }}
                                        key="list-edit"
                                        onClick={() => {
                                            setIdForModal(item.id);
                                            setContentModalVisible({ ...ContentModalVisible, modifyPosition: true })
                                        }}
                                    >Edit</p>,

                                    <p
                                        style={{ color: '#d62828' }}
                                        key="list-remove"
                                        onClick={() => showPositionDeleteConfirm(item.id)}
                                    >Remove</p>]
                                }
                            >
                                <List.Item.Meta
                                    title={<p>{item.position_name}</p>}
                                    description={item.fullMeta}
                                />
                            </List.Item>
                        )}
                    >
                    </List>
                </div>

                <AddPositionModal
                    AddPositionVisible={ContentModalVisible.addPosition}
                    onAddPositionVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, addPosition: value })}
                    refresh={() => {
                        _getpositions(setpositionData, history);
                        _getorganizationCounts(setOrganizationCount, history)
                    }}
                />

                <ModifyPositionModal
                    ModifyPositionVisible={ContentModalVisible.modifyPosition}
                    onModifyPositionVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, modifyPosition: value })}
                    refresh={() => {
                        _getpositions(setpositionData, history);
                        _getorganizationCounts(setOrganizationCount, history)
                    }}
                    getID={IdForModal}
                />

            </div>

            <div className="Organization__column">
                <Descriptions title="Ümumu məlumat" column={1}>
                    <Descriptions.Item label="Şirkət sayı">{OrganizationCount.company_count && OrganizationCount.company_count}</Descriptions.Item>
                    <Descriptions.Item label="Departament sayı">{OrganizationCount.department_count && OrganizationCount.department_count}</Descriptions.Item>
                    <Descriptions.Item label="Vəzifə sayı">{OrganizationCount.position_count && OrganizationCount.position_count}</Descriptions.Item>
                    <Descriptions.Item label="Ümumi işçi sayı">{OrganizationCount.staff_count && OrganizationCount.staff_count}</Descriptions.Item>
                </Descriptions>,
            </div>

        </div>
    )
}

export default Content;