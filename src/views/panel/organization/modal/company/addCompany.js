import React, { useState } from 'react'
import {addCompanies} from '../../../../../routes/OrganizationController'
import { Modal, Input, Typography, message} from 'antd';
import { ShopOutlined, NodeExpandOutlined } from '@ant-design/icons'
const { Text } = Typography


function AddCompanyModal({visibleAddCompany, onVisibleAddCompanyChange = (value) => {}, refresh = () => {}}) {
    
    const [AddCompanyData, setAddCompanyData] = useState({
        companyName: '',
        companyDirection: ''
    })

    const sendData = () => {
        if(AddCompanyData.companyName === '' || AddCompanyData.companyDirection === ''){
            message.info("Boş bölmə saxlamayın")
        }else{
           addCompanies({
               name: AddCompanyData.companyName,
               direction: AddCompanyData.companyDirection
           })
            .then(result => {
                if(result.status === 201){
                    message.success('Şirkət əlavə edildi');
                    onVisibleAddCompanyChange(false);
                    setAddCompanyData({...AddCompanyData,companyName:'', companyDirection:''});
                    refresh()
                }else if(result.status === 500){
                    message.error('Daxili xəta baş verdi')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
    
    return (
        <Modal
            title="Şirkət əlavə et"
            visible={visibleAddCompany}
            onOk={sendData}
            onCancel={() => onVisibleAddCompanyChange(false)}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Input placeholder="Şirkət" 
                prefix={<ShopOutlined />} 
                value={AddCompanyData.companyName}
                onChange={(event) => setAddCompanyData({...AddCompanyData, companyName: event.target.value})}
                />
            </div>
            <div className="Modal__content">
                <Text strong>Şirkətin fəaliyyət istiqaməti</Text>
                <Input placeholder="Fəaliyyət istiqaməti" 
                prefix={<NodeExpandOutlined />} 
                value={AddCompanyData.companyDirection}
                onChange={(event) => setAddCompanyData({...AddCompanyData, companyDirection: event.target.value})}
                />
            </div>
        </Modal>
    )
}

export default AddCompanyModal;