import React, { useState, useEffect } from 'react'
import DepartamentModal from '../modal/department'
import PositionModal from '../modal/position'
import axios from 'axios'
import { organization_departmentURL } from '../../../config/apiconfig'
import { List, Button, Descriptions } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

function Content() {

    const [departmentModal, setDepartmentModal] = useState(false)
    const [positionModal, setPositionModal] = useState(false)
    const [departmentData, setdepartmentData] = useState([])

    useEffect(() => {
        axios.get(organization_departmentURL.get)
            .then(result => {
                setdepartmentData(result.data)
            })
            .catch(error => {
                console.log(error)
            });
    }, [departmentModal, positionModal])

    return (
        <div className="Organization__content">
            <div className="Organization__column">
                <Button type="primary" style={{ width: 300 }} icon={<PlusCircleOutlined />} onClick={() => { setDepartmentModal(true) }} block>
                    Departament əlavə et
                    </Button>
                <div className="Organization__scroll">
                    <List
                        dataSource={departmentData}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta

                                    title={<a href="https://ant.design">{item.department_name}</a>}
                                    description={item.company_name}
                                />
                            </List.Item>
                        )}
                    >
                    </List>
                </div>
                <DepartamentModal visible={departmentModal} onVisibleChange={(value) => setDepartmentModal(value)} />
            </div>
            <div className="Organization__column">
                <Button type="primary" style={{ width: 300 }} icon={<PlusCircleOutlined />} onClick={() => { setPositionModal(true) }} block>
                    Vəzifə əlavə et
                    </Button>
                <div className="Organization__scroll">
                    <List
                        // dataSource={company.data}
                        renderItem={item => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    title={<a href="https://ant.design">Vəzifə</a>}
                                    description='Departament'
                                />
                                <p>Şirkət</p>
                            </List.Item>
                        )}
                    >
                    </List>
                </div>
                <PositionModal visible={positionModal} onVisibleChange={(value) => setPositionModal(value)} />
            </div>
            <div className="Organization__column">
                <Descriptions title="Ümumu məlumat" column={1}>
                    <Descriptions.Item label="Şirkət sayı">Zhou Maomao</Descriptions.Item>
                    <Descriptions.Item label="Departament sayı">1810000000</Descriptions.Item>
                    <Descriptions.Item label="Vəzifə sayı">Hangzhou, Zhejiang</Descriptions.Item>
                    <Descriptions.Item label="Ümumi işçi sayı">empty</Descriptions.Item>

                </Descriptions>,
                </div>
        </div>
    )
}

export default Content;