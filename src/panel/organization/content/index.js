import React, { useState, useEffect } from 'react'
import { getDepartments, deleteDepartments } from '../../../routes/OrganizationController'
import AddDeapartmentModal from '../modal/department/addDepartment'
import ModifyDeapartmentModal from '../modal/department/modifyDepartment'
import PositionModal from '../modal/position'
import { List, Button, Descriptions, Modal, message } from 'antd';
import { PlusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import '../organization.css'

const { confirm } = Modal;


const _getdepartments = (setState) => {
    getDepartments().then(
        result => setState(result.data)
    )
}

function Content() {

    const [ContentModalVisible, setContentModalVisible] = useState({
        addDepartment: false,
        modifyDepartment: false,
        addPosition: false
    })
    const [departmentData, setdepartmentData] = useState([])
    const [IdForModal, setIdForModal] = useState('')

    useEffect(() => {
        getDepartments().then(
            result => setdepartmentData(result.data)
        )
    }, [])

    function showDeleteConfirm(id) {
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
                        _getdepartments(setdepartmentData);
                    }
                })
            },
            onCancel() { },
        });
    }

    return (
        <div className="Organization__content">

            <div className="Organization__column">

                <Button
                    type="primary"
                    style={{ width: 300 }}
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
                                        className="list--actions"
                                        key="list-edit"
                                        onClick={() => {
                                            setIdForModal(item.id);
                                            setContentModalVisible({ ...ContentModalVisible, modifyDepartment: true });
                                        }}
                                        href="#"
                                    >Edit</p>,

                                    <p
                                        className="list--actions"
                                        key="list-remove"
                                        onClick={() => showDeleteConfirm(item.id)}
                                        href="#"
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
                    refresh={() => { _getdepartments(setdepartmentData) }}
                />

                <ModifyDeapartmentModal
                    ModifyDepartmentVisible={ContentModalVisible.modifyDepartment}
                    onModifyDepartmentVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, modifyDepartment: value })}
                    getID={IdForModal}
                    refresh={() => { _getdepartments(setdepartmentData) }}
                />

            </div>

            <div className="Organization__column">

                <Button
                    type="primary"
                    style={{ width: 300 }}
                    icon={<PlusCircleOutlined />}
                    onClick={() => { setContentModalVisible({ ...ContentModalVisible, addPosition: true }) }} block>
                    Vəzifə əlavə et
                    </Button>

                <div className="Organization__scroll">
                    <List
                        // dataSource={company.data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">Vəzifə</a>}
                                    description='Departament'
                                />
                                <p>Şirkət</p>
                            </List.Item>
                        )}
                    >
                    </List>
                </div>

                <PositionModal
                    visible={ContentModalVisible.addPosition}
                    onVisibleChange={(value) => setContentModalVisible({ ...ContentModalVisible, addPosition: value })} />

            </div>

            <div className="Organization__column">
                <Descriptions title="Ümumu məlumat" column={1}>
                    <Descriptions.Item label="Şirkət sayı">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Departament sayı">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Vəzifə sayı">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Ümumi işçi sayı">empty</Descriptions.Item>
                </Descriptions>,
            </div>

        </div>
    )
}

export default Content;