import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getDepartments, addPositions } from '../../../../../controller/OrganizationController'
import { Modal, Input, Typography, Select, message } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function AddPositionModal({ AddPositionVisible, onAddPositionVisibleChange = (value) => { }, refresh = () => { } }) {

    const history = useHistory()
    const [modalDepartmentOption, setmodalDepartmentOption] = useState([])
    const [AddPositionModalData, setAddPositionModalData] = useState({
        department_id: '',
        position_name: ''
    })

    useEffect(() => {

        if (AddPositionVisible) {
            getDepartments().then(
                result => setmodalDepartmentOption(result.data)
            );
        }

    }, [AddPositionVisible])

    function sendData() {
        if (AddPositionModalData.department_id === '' || AddPositionModalData.position_name === '') {

            message.warning('Boş bölmə saxlamayın')

        } else {

            addPositions({
                id: AddPositionModalData.department_id,
                name: AddPositionModalData.position_name
            })
                .then(
                    result => {
                        if (result.status === 201) {
                            message.success('Vəzifə əlavə edildi');
                            setAddPositionModalData({ company_id: '', department_id: '', position_name: '' });
                            onAddPositionVisibleChange(false)
                            refresh();
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

        }
    }

    return (

        <Modal
            title="Vəzifə əlavə et"
            visible={AddPositionVisible}
            onOk={() => sendData()}
            onCancel={() => { onAddPositionVisibleChange(false) }}
        >

            <div className="Modal__content">
                <Text strong>Departamentin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={AddPositionModalData.department_id}
                    onChange={(event) => { setAddPositionModalData({ ...AddPositionModalData, department_id: event }) }}
                >
                    {
                        modalDepartmentOption.map((data, index) => {
                            return <Option key={index} value={data.id}>{data.company_name} > {data.department_name}</Option>
                        })
                    }
                </Select>
            </div>

            <div className="Modal__content">
                <Text strong>Vəzifə adı</Text>
                <Input
                    placeholder="Vəzifə"
                    prefix={<ReconciliationOutlined />}
                    value={AddPositionModalData.position_name}
                    onChange={(event) => setAddPositionModalData({ ...AddPositionModalData, position_name: event.target.value })}
                />
            </div>

        </Modal >
    )
}

export default AddPositionModal;