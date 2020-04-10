import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { organization_departmentURL } from '../../../../config/apiconfig'
import { Modal, Input, Typography, Select, message } from 'antd';
import { PartitionOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function DeapartmentModal({ visible, onVisibleChange = (value) => { } }) {

    const [modalOption, setmodalOption] = useState([])
    const [modalDATA, setmodalDATA] = useState({
        companyID: '',
        departmentName: ''
    })

    useEffect(() => {
        axios.get(organization_departmentURL.getcompany)
            .then(result => {
                setmodalOption(result.data)
            })
            .catch(error => {
                message.error('Serverə qoşulma zamanı xəta baş verdi')
            })
    }, [visible])

    const sendData = () => {
        if (modalDATA.companyID === '' || modalDATA.departmentName === '') {
            message.warning('Boş bölmə saxlamayın')
        } else {
            axios.post(organization_departmentURL.post, modalDATA)
                .then(result => {
                    if(result.data === 'OK'){
                        message.success('Departament əlavə edildi');
                        onVisibleChange(false);
                        setmodalDATA({companyID: '', departmentName: ''})
                    }else{
                        message.error('Xəta baş verdi. Yenidən cəhd edin')
                    }
                })
                .catch(error => {
                    message.error('Serverə qoşulma zamanı xəta baş verdi')
                    console.log(error)
                })
        }
    }

    return (
        <Modal
            title="Departament əlavə et"
            visible={visible}
            onOk={sendData}
            onCancel={() => { onVisibleChange(false) }}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={modalDATA.companyID}
                    onChange={(event) => setmodalDATA({ ...modalDATA, companyID: event })}>
                    {
                        modalOption.map((data, index) => {
                            return <Option key={index} value={data.id}>{data.name}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Departament adı</Text>
                <Input placeholder="Departament"
                    prefix={<PartitionOutlined />}
                    value={modalDATA.departmentName}
                    onChange={(event) => setmodalDATA({ ...modalDATA, departmentName: event.target.value })}
                />
            </div>
        </Modal>
    )
}

export default DeapartmentModal;