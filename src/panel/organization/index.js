import React, { useState } from 'react'
import './organization.css'
import { List, Card, Button, Divider, Descriptions, Modal, Input, Typography, Select } from 'antd';
import { PlusCircleOutlined, ShopOutlined, NodeExpandOutlined, ReconciliationOutlined, PartitionOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function Organization() {

    const org = [
        {
            title: 'Şirkət',
        },
        {
            title: 'Şirkət',
        }
    ]

    const [company, setCompany] = useState({
        data: [
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' },
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' },
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' },
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' },
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' },
            { value: 'test1', id: 1, email: 'ssss', name: 'elnur' }
        ],
        loading: false,
        hasMore: true,
    })

    const [visible, setVisible] = useState({
        company: false,
        department: false,
        position: false
    })

    const companyModal = () => {
        setVisible({...visible, company: !visible.company})
    }

    const departmentModal = () => {
        setVisible({...visible, department: !visible.department})
    }

    const positionModal = () => {
        setVisible({...visible, position: !visible.position})
    }

    const option = [
        { company: 'Yello' },
        { company: 'YelloAD' }
    ]

    return (
        <section className="Organization">
            <div className="Organization__header">
                <Button type="primary" style={{ width: 150 }} icon={<PlusCircleOutlined />} onClick={companyModal} block>
                    Şirkət əlavə et
                </Button>
                <List
                    grid={{ gutter: 16, column: 6 }}
                    dataSource={org}
                    renderItem={item => (
                        <List.Item>
                            <Card title={item.title} size='small'>Fəaliyyət istiqaməti</Card>
                        </List.Item>
                    )}
                />
                <Divider />
            </div>
            <div className="Organization__content">
                <div className="Organization__column">
                    <Button type="primary" style={{ width: 300 }} icon={<PlusCircleOutlined />} onClick={departmentModal} block>
                        Departament əlavə et
                    </Button>
                    <div className="Organization__scroll">
                        <List
                            dataSource={company.data}
                            renderItem={item => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta

                                        title={<a href="https://ant.design">Departament</a>}
                                        description='Şirkət'
                                    />
                                </List.Item>
                            )}
                        >
                        </List>
                    </div>
                </div>
                <div className="Organization__column">
                    <Button type="primary" style={{ width: 300 }} icon={<PlusCircleOutlined />} onClick={positionModal} block>
                        Vəzifə əlavə et
                    </Button>
                    <div className="Organization__scroll">
                        <List
                            dataSource={company.data}
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
            <Modal
                title="Şirkət əlavə et"
                visible={visible.company}
                onOk={() => { }}
                onCancel={companyModal}
            >
                <div className="Modal__content">
                    <Text strong>Şirkətin adı</Text>
                    <Input placeholder="Şirkətin adı" prefix={<ShopOutlined />} />
                </div>
                <div className="Modal__content">
                    <Text strong>Ant Design</Text>
                    <Input placeholder="Şirkətin fəaliyyət istiqaməti" prefix={<NodeExpandOutlined />} />
                </div>
            </Modal>
            <Modal
                title="Departament əlavə et"
                visible={visible.department}
                onOk={() => { }}
                onCancel={departmentModal}
            >
                <div className="Modal__content">
                    <Text strong>Şirkətin adı</Text>
                    <Select defaultValue="Şirkət" style={{ width: 200 }} >
                        {
                            option.map((data, index) => {
                               return <Option key={index}>{data.company}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="Modal__content">
                    <Text strong>Departament adı</Text>
                    <Input placeholder="Departament" prefix={<PartitionOutlined />} />
                </div>
            </Modal>
            <Modal
                title="Vəzifə əlavə et"
                visible={visible.position}
                onOk={() => { }}
                onCancel={positionModal}
            >
                <div className="Modal__content">
                    <Text strong>Şirkətin adı</Text>
                    <Select defaultValue="Şirkət" style={{ width: 200 }} >
                        {
                            option.map((data, index) => {
                               return <Option key={index}>{data.company}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="Modal__content">
                    <Text strong>Departamentin adı</Text>
                    <Select defaultValue="Departament" style={{ width: 200 }} >
                        {
                            option.map((data, index) => {
                               return <Option key={index}>{data.company}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className="Modal__content">
                    <Text strong>Vəzifə adı</Text>
                    <Input placeholder="Vəzifə" prefix={<ReconciliationOutlined />} />
                </div>
            </Modal>
        </section >
    )
}

export default Organization;