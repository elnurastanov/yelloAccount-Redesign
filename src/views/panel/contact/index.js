import React, { useState, Suspense, useEffect } from 'react'
import appConfig from '../../../config/appconfig'
import { panelAuth } from '../../../routes/AuthController'
import './contact.css'
import { Switch, Route, Link, useHistory } from "react-router-dom"
import AddContact from './modal/addContact'
import { Breadcrumb, Table, Button, Spin } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons'


const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage)).role
const ContactInfo = React.lazy(() => import('./contactInfo'))

const Contact = () => {

    const history = useHistory()
    const [ModalVisible, setModalVisible] = useState(false)
    const [DummyData, setDummyData] = useState([])

    useEffect(() => {
        panelAuth({
            panel: 'Contact',
            userRole: temp.split(',')
        }).then(
            result => null
        ).catch(
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 403) history.replace('/403')

                }
            }
        )
    }, [])

    for (let i = 0; i < 50; i++) {
        DummyData.push({
            name: `name ${i}`,
            company: `company ${i}`,
            phone: `phone ${i}`,
            key: i + 20
        })
    }

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
            render: () => <Link onClick={() => setContactID(45)} to={`/Contact/${ContactID}`} style={{ color: '#0466c8' }}>Ətraflı</Link>
        }

    ];

    const [ContactID, setContactID] = useState(undefined)

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
                                onClick={() => { setModalVisible(true) }}
                            >Əlavə et</Button>
                            <Table
                                columns={columns}
                                dataSource={DummyData}
                                size="middle"
                                scroll={{ y: 330 }}
                                pagination={{ position: ["bottomCenter"] }}
                            />
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