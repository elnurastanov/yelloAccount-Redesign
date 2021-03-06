import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getCompaniesByID, editCompanies } from '../../../../../controller/OrganizationController'
import { Modal, Input, Typography, message } from 'antd';
import { ShopOutlined, NodeExpandOutlined } from '@ant-design/icons'
const { Text } = Typography


function ModifyCompany({ visibleModifyCompany, onVisibleModifyCompanyChange = (value) => { }, getID, refresh = () => { } }) {

    const history = useHistory()
    const [ModifyCompanyData, setModifyCompanyData] = useState([{
        name: '',
        direction: ''
    }])

    useEffect(() => {

        if (visibleModifyCompany) {
            getCompaniesByID(getID)
                .then(res => res.data.map(data => setModifyCompanyData(data)))
                .catch(
                    error => {
                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/500')

                        }
                    }
                )
        }

    }, [visibleModifyCompany, getID, history])

    const sendData = () => {
        if (ModifyCompanyData.name === '' || ModifyCompanyData.direction === '') {
            message.info("Boş bölmə saxlamayın")
        } else {
            editCompanies(
                getID,
                {
                    name: ModifyCompanyData.name,
                    direction: ModifyCompanyData.direction
                }
            )
                .then(result => {
                    if (result.status === 200) {
                        message.success('Şirkət məlumatları yeniləndi');
                        onVisibleModifyCompanyChange(false);
                        refresh();
                    } else if (result.status === 404) {
                        message.error('Daxili xəta baş verdi')
                    }
                })
                .catch(
                    error => {
                        if (error.response) {

                            const { status } = error.response;
                            if (status === 500) history.replace('/500')

                        }
                    })
        }
    }

    return (
        <Modal
            title="Şirkət məlumatlarını yenilə"
            visible={visibleModifyCompany}
            onOk={sendData}
            onCancel={() => onVisibleModifyCompanyChange(false)}
            on
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Input placeholder="Şirkət"
                    prefix={<ShopOutlined />}
                    value={ModifyCompanyData.name}
                    onChange={(event) => { setModifyCompanyData({ ...ModifyCompanyData, name: event.target.value }) }}
                />
            </div>
            <div className="Modal__content">
                <Text strong>Şirkətin fəaliyyət istiqaməti</Text>
                <Input placeholder="Fəaliyyət istiqaməti"
                    prefix={<NodeExpandOutlined />}
                    value={ModifyCompanyData.direction}
                    onChange={(event) => { setModifyCompanyData({ ...ModifyCompanyData, direction: event.target.value }) }}
                />
            </div>
        </Modal>
    )
}

export default ModifyCompany;