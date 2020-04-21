import React, { useState, Suspense } from 'react'
import './contact.css'
import {
    Switch,
    Route,
    Link
} from "react-router-dom"
import AddContact from './modal/addContact'
import { Breadcrumb, Table, Button, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'

const ContactInfo = React.lazy(() => import('./contactInfo'))

const Contact = () => {

    const [ModalVisible, setModalVisible] = useState(false)
    const [DummyData, setDummyData] = useState([
        {
            name: 'Elnur Astanov',
            company: 'Yello',
            phone: '+994 51 550 50 50',
            key: '20'
        },
        {
            name: 'Əli Mehraliyev',
            company: 'Tesla',
            phone: '+994 51 551 51 51',
            key: '21'
        }
    ])

    const columns = [
        {
            title: 'Adı',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left'

        },
        {
            title: 'Şirkət',
            width: 100,
            dataIndex: 'company',
            key: 'company',
            fixed: 'left',
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'E-mail',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'Ünvan',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Əlaqədar şəxs',
            dataIndex: 'contact',
            key: 'contact',
            width: 150,
        },
        {
            dataIndex: 'more',
            key: 'more',
            width: 100,
            fixed: 'right',
            render: () => <Link onClick={() => setContactID(45) } to={`/Contact/${ContactID}`}>Ətraflı</Link>
        }

    ];

    const [ContactID, setContactID] = useState(null)

    return (
        <section className="Contact">
            <Breadcrumb separator="/">
                <Breadcrumb.Item href="/contact">Contacts</Breadcrumb.Item>
                {
                    ContactID ? <Breadcrumb.Item >Contacts name</Breadcrumb.Item> : null
                }
            </Breadcrumb>
            <Suspense fallback={<Spin style={{ marginLeft: '50%', marginTop: '25%' }} size="large" />}>
                <Switch>
                    <Route exact path='/Contact' >
                        <div className="Contact__content">
                            <Button
                                type='primary'
                                size='small'
                                style={{ width: 100 }}
                                icon={<PlusCircleOutlined />}
                                onClick={() => { setModalVisible(true)}}
                            >Əlavə et</Button>
                            <Table columns={columns} dataSource={DummyData} scroll={{ x: 1500, y: 300 }} />
                        </div>
                        <AddContact
                            visible={ModalVisible}
                            onVisibleChange={(value) => setModalVisible(value)}
                        />
                    </Route>
                    <Route exact path='/Contact/:id' component={ContactInfo} />
                </Switch>
            </Suspense>
        </section>
    )
}

export default Contact;