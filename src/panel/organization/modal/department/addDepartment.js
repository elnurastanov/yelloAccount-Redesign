import React, { useState, useEffect } from 'react'
import { getCompanies, addDepartments } from '../../../../routes/OrganizationController'
import { Modal, Input, Typography, Select, message } from 'antd';
import { PartitionOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select



function AddDeapartmentModal({ AddDepartmentVisible, onAddDepartmentVisibleChange = (value) => { }, refresh = () => {} }) {

    const [CompanyOption, setCompanyOption] = useState([])
    const [addDepartmentData, setaddDepartmentData] = useState({
        companyID: '',
        departmentName: ''
    })

    useEffect(() => {
        
        if(AddDepartmentVisible){
            getCompanies().then(
                result => setCompanyOption(result.data)
            )
        }
        
    }, [AddDepartmentVisible])

    const sendData = () => {
        if (addDepartmentData.companyID === '' || addDepartmentData.departmentName === '') {
            message.warning('Boş bölmə saxlamayın')
        } else {
            addDepartments({
                id: addDepartmentData.companyID,
                name: addDepartmentData.departmentName
            }).then(result => {
                if (result.status === 201) {
                    message.success('Departament əlavə edildi');
                    setaddDepartmentData({ companyID: '', departmentName: '' });
                    onAddDepartmentVisibleChange(false)
                    refresh();
                }else if(result.status === 404){
                    message.error('Daxili xəta baş verdi')
                }
            }).catch(error => {
                console.log(error);
                message.warning('Xəta baş verdi')
            })
        }
    }

    return (
        <Modal
            title="Departament əlavə et"
            visible={AddDepartmentVisible}
            onOk={sendData}
            onCancel={() => { onAddDepartmentVisibleChange(false) }}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={addDepartmentData.companyID}
                    onChange={(event) => setaddDepartmentData({ ...addDepartmentData, companyID: event })}>
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
                    value={addDepartmentData.departmentName}
                    onChange={(event) => setaddDepartmentData({ ...addDepartmentData, departmentName: event.target.value })}
                />
            </div>
        </Modal>
    )
}

export default AddDeapartmentModal;