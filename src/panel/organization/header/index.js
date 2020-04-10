import React, { useState, useEffect } from 'react'
import CompanyModal from '../modal/company'
import axios from 'axios'
import { organization_companyURL } from '../../../config/apiconfig'
import { List, Card, Button, message } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

function Header() {

    const [companyDATA, setcompanyDATA] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        axios.get(organization_companyURL.get)
        .then(result => {
            setcompanyDATA(result.data);
        }).catch(error => {
            console.log(error);
            message.error('Serverə qoşulma zamanı xəta baş verdi')
        })
    }, [modalVisible])
    
    return (
        <div className="Organization__header">
            <Button type="primary" style={{ width: 150 }} icon={<PlusCircleOutlined />} onClick={() => { setModalVisible(true) }} block>
                Şirkət əlavə et
                </Button>
            <List
                grid={{ gutter: 5, column: 6 }}
                dataSource={companyDATA}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.name} size='small'>{item.direction}</Card>
                    </List.Item>
                )}
            />
            <CompanyModal visible={modalVisible} onVisibleChange={(value) => { setModalVisible(value) }} />
        </div>
    )
}

export default Header;