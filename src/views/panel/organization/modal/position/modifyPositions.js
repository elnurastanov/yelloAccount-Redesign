import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getDepartments, getPositionsByID, editPositions } from '../../../../../controller/OrganizationController'
import { Modal, Input, Typography, Select, message } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function ModifyPositionModal({ ModifyPositionVisible, onModifyPositionVisibleChange = (value) => { }, getID, refresh = () => { } }) {

    const history = useHistory()
    const [modalDepartmentOption, setmodalDepartmentOption] = useState([])
    const [ModifyPositionModalData, setModifyPositionModalData] = useState({
        department_id: '',
        name: ''
    })

    useEffect(() => {

        if (ModifyPositionVisible) {

            getPositionsByID(getID)
                .then(result => result.data.map(data => setModifyPositionModalData(data)))
                .catch(
                    error => {
                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/')

                        }
                    }
                );

            getDepartments()
                .then(result => setmodalDepartmentOption(result.data))
                .catch(
                    error => {
                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/')

                        }
                    }
                )
        }

    }, [ModifyPositionVisible, getID, history])

    function sendData() {
        if (ModifyPositionModalData.department_id === '' || ModifyPositionModalData.name === '') {

            message.warning('Boş bölmə saxlamayın')

        } else {

            editPositions(
                getID, {
                department_id: ModifyPositionModalData.department_id,
                name: ModifyPositionModalData.name
            })
                .then(
                    result => {
                        if (result.status === 200) {
                            message.success('Vəzifə məlumatları yeniləndi');
                            onModifyPositionVisibleChange(false);
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
            title="Vəzifə məlumatlarını yenilə"
            visible={ModifyPositionVisible}
            onOk={() => sendData()}
            onCancel={() => { onModifyPositionVisibleChange(false) }}
        >

            <div className="Modal__content">
                <Text strong>Departamentin adı</Text>
                <Select
                    style={{ width: 200 }}
                    value={ModifyPositionModalData.department_id}
                    onChange={(event) => { setModifyPositionModalData({ ...ModifyPositionModalData, department_id: event }) }}
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
                    value={ModifyPositionModalData.name}
                    onChange={(event) => setModifyPositionModalData({ ...ModifyPositionModalData, name: event.target.value })}
                />
            </div>

        </Modal >
    )
}

export default ModifyPositionModal;