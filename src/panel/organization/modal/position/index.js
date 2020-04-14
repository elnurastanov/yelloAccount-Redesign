import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal, Input, Typography, Select } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function PositionModal({ visible, onVisibleChange = (value) => { } }) {

    const [modalCompanyOption, setmodalCompanyOption] = useState([])
    const [modalDepartmentOption, setmodalDepartmentOption] = useState([])
    const [positionModalData, setpositionModalData] = useState({
        companyID: '',
        departmentID: '',
        positionName: ''
    })

    useEffect(() => {
        axios.get('http://localhost:2000/v1/panel/')
            .then(result => {
                setmodalCompanyOption(result.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [visible])

    useEffect(() => {
        if (positionModalData.companyID !== '') {
            axios.post('http://localhost:2000/v1/panel/', positionModalData)
            .then(result => {
                setmodalDepartmentOption(result.data)
            })
            .catch(error => {
                console.log(error)
            });
        }
    }, [positionModalData])

    return (
        <Modal
            title="Vəzifə əlavə et"
            visible={visible}
            onOk={() => { console.log(positionModalData) }}
            onCancel={() => { onVisibleChange(false) }}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={positionModalData.companyID}
                    onChange={(event) => setpositionModalData({ ...positionModalData, companyID: event })}
                >
                    {
                        modalCompanyOption.map((data, index) => {
                            return <Option key={index} value={data.id}>{data.name}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Departamentin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={positionModalData.departmentID}
                    onChange={(event) => { }}
                >
                    {
                        modalDepartmentOption.map((data, index) => {
                            return <Option key={index} value={data.id}>{data.name}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Vəzifə adı</Text>
                <Input placeholder="Vəzifə" prefix={<ReconciliationOutlined />} />
            </div>
        </Modal>
    )
}

export default PositionModal;