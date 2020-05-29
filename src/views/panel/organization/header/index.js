import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AddCompanyModal from '../modal/company/addCompany'
import ModifyCompany from '../modal/company/modifyCompany'
import { getCompanies, deleteCompanies } from '../../../../controller/OrganizationController'
import { List, Card, Button, Modal, message } from 'antd';
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const { confirm } = Modal;



const _getcompany = (setState, history) => {
    getCompanies()
        .then(res => setState(res.data))
        .catch(
            error => {
                if (error.response) {

                    const { status } = error.response;
                    if (status === 500) history.replace('/500')

                }
            }
        )
}

function Header() {

    const history = useHistory()
    const [companyDATA, setcompanyDATA] = useState([])
    const [IDForModal, setIDForModal] = useState('')
    const [AddCompanyModalVisible, setAddCompanyModalVisible] = useState({
        addCompany: false,
        modifyCompany: false
    })

    useEffect(() => {

        getCompanies()
            .then(res => setcompanyDATA(res.data))
            .catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/500')

                    }
                }
            )

    }, [history])

    function showDeleteConfirm(id) {
        confirm({
            title: 'Bu şirkəti silməyinizə əminsiniz?',
            icon: <ExclamationCircleOutlined />,
            content: 'Şirkətlə bağlı bütün məlumatlar silinəcək!',
            okText: 'Bəli',
            okType: 'danger',
            cancelText: 'Xeyr',
            onOk() {
                deleteCompanies(id)
                    .then(
                        result => {
                            if (result.status === 200) {
                                message.success('Şirkət uğurla silindi');
                                _getcompany(setcompanyDATA, history);
                            }
                        })
                    .catch(
                        error => {
                            if (error.response) {

                                const { status } = error.response;
                                if (status === 500) history.replace('/500')

                            }
                        }
                    )
            },
        });
    }

    return (
        <div className="Organization__header">
            <Button type="primary"
                style={{ width: 150 }}
                icon={<PlusCircleOutlined />}
                onClick={() => { setAddCompanyModalVisible({ ...AddCompanyModalVisible, addCompany: true }) }} block>
                Şirkət əlavə et
                </Button>
            <div className="Organization__header--list">
                <List
                    grid={{ gutter: 5, column: 7 }}
                    dataSource={companyDATA}
                    renderItem={item => (
                        <List.Item>
                            <Card
                                title={item.name}
                                size='small'
                                hoverable={true}
                                actions={[
                                    <EditOutlined
                                        key="edit"
                                        onClick={() => {
                                            setAddCompanyModalVisible({ ...AddCompanyModalVisible, modifyCompany: true });
                                            setIDForModal(item.id)
                                        }}
                                    />,
                                    <DeleteOutlined key="delete" onClick={() => showDeleteConfirm(item.id)} />
                                ]}
                            >{item.direction}
                            </Card>
                        </List.Item>
                    )}
                />
            </div>

            <AddCompanyModal
                visibleAddCompany={AddCompanyModalVisible.addCompany}
                onVisibleAddCompanyChange={(value) => { setAddCompanyModalVisible({ ...AddCompanyModalVisible, addCompany: value }) }}
                refresh={() => { _getcompany(setcompanyDATA, history) }}
            />
            <ModifyCompany
                visibleModifyCompany={AddCompanyModalVisible.modifyCompany}
                onVisibleModifyCompanyChange={(value) => { setAddCompanyModalVisible({ ...AddCompanyModalVisible, modifyCompany: value }) }}
                getID={IDForModal}
                refresh={() => { _getcompany(setcompanyDATA, history) }}
            />
        </div>
    )
}

export default Header;