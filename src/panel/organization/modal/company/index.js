import React, { useState } from 'react'
import axios from 'axios'
import {organization_companyURL} from '../../../../config/apiconfig'
import { Modal, Input, Typography, message} from 'antd';
import { ShopOutlined, NodeExpandOutlined } from '@ant-design/icons'
const { Text } = Typography


function CompanyModal({visible, onVisibleChange = (value) => {}}) {
    
    const [companyData, setCompanyData] = useState({
        companyName: '',
        companyDirection: ''
    })

    const sendData = () => {
        if(companyData.companyName === '' || companyData.companyDirection === ''){
            message.info("Boş bölmə saxlamayın")
        }else{
            axios.post(organization_companyURL.post, companyData)
            .then(result => {
                if(result.data === 'OK'){
                    message.success('Şirkət əlavə edildi');
                    onVisibleChange(false);
                    setCompanyData({...companyData,companyName:'', companyDirection:''});
                    console.log(result)
                }
            }).catch(error => {
                console.log(error);
                message.warning('Serverə qoşulma zamanı xəta baş verdi')
            })
        }
    }
    
    return (
        <Modal
            title="Şirkət əlavə et"
            visible={visible}
            onOk={sendData}
            onCancel={() => onVisibleChange(false)}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Input placeholder="Şirkət" 
                prefix={<ShopOutlined />} 
                value={companyData.companyName}
                onChange={(event) => setCompanyData({...companyData, companyName: event.target.value})}
                />
            </div>
            <div className="Modal__content">
                <Text strong>Şirkətin fəaliyyət istiqaməti</Text>
                <Input placeholder="Fəaliyyət istiqaməti" 
                prefix={<NodeExpandOutlined />} 
                value={companyData.companyDirection}
                onChange={(event) => setCompanyData({...companyData, companyDirection: event.target.value})}
                />
            </div>
        </Modal>
    )
}

export default CompanyModal;