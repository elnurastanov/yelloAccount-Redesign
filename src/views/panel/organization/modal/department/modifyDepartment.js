import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getCompanies, getDepartmentsByID, editDepartments } from '../../../../../controller/OrganizationController'
import { Modal, Input, Typography, Select, message } from 'antd';
import { PartitionOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select



function ModifyDeapartmentModal({ ModifyDepartmentVisible, onModifyDepartmentVisibleChange = (value) => { }, getID, refresh = () => { } }) {

    const history = useHistory()
    const [CompanyOption, setCompanyOption] = useState([])
    const [ModifyDepartmentData, setModifyDepartmentData] = useState({
        company_id: '',
        department_name: ''
    })

    useEffect(() => {

        if (ModifyDepartmentVisible) {
            getDepartmentsByID(getID)
                .then(result => result.data.map(data => setModifyDepartmentData(data)))
                .catch(
                    error => {
                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/500')

                        }
                    }
                );
            getCompanies()
            .then(result => setCompanyOption(result.data))
            .catch(
                error => {
                    if (error.response) {

                        const { status } = error.response;
                        if (status === 500) history.replace('/500')

                    }
                }
            );
        }

    }, [ModifyDepartmentVisible, getID, history])

    const sendData = () => {
        if (ModifyDepartmentData.company_id === '' || ModifyDepartmentData.name === '') {
            message.warning('Boş bölmə saxlamayın')
        } else {
            editDepartments(
                getID,
                {
                    name: ModifyDepartmentData.department_name,
                    company_id: ModifyDepartmentData.company_id
                }
            )
            .then(
                result => {
                if (result.status === 200) {
                    message.success('Departament məlumatları yeniləndi');
                    onModifyDepartmentVisibleChange(false);
                    refresh();
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
        }
    }

    return (
        <Modal
            title="Departament məlumatlarını yenilə"
            visible={ModifyDepartmentVisible}
            onOk={sendData}
            onCancel={() => { onModifyDepartmentVisibleChange(false) }}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={ModifyDepartmentData.company_id}
                    onChange={(event) => setModifyDepartmentData({ ...ModifyDepartmentData, company_id: event })}

                >
                    {
                        CompanyOption.map((data, index) => {
                            return <Option key={index} value={data.id}>{data.name}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Departament adı</Text>
                <Input placeholder="Departament"
                    prefix={<PartitionOutlined />}
                    value={ModifyDepartmentData.department_name}
                    onChange={(event) => { setModifyDepartmentData({ ...ModifyDepartmentData, department_name: event.target.value }) }}
                />
            </div>
        </Modal>
    )
}

export default ModifyDeapartmentModal;