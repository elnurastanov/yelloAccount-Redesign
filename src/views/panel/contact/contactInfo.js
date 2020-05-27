import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import appConfig from '../../../config/appconfig'
import { panelAuth } from '../../../routes/AuthController'
import './contact.css'
import { Input, Button, Divider, Select, Timeline } from 'antd'
import { EditOutlined, CheckOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage)).role
const { TextArea } = Input;

const ContactInfo = () => {

    const history = useHistory()

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
    }, [history])

    const [ComponentStatus, setComponentStatus] = useState({
        company: true,
        phone: true,
        email: true,
        address: true,
        person: true,
        staff: true,
        note: true
    })

    const [CompanySelect, setCompanySelect] = useState([
        {
            id: 1,
            name: 'Əlaqəli olduğu şirkətin adı'
        },
        {
            id: 2,
            name: 'Əlaqəli olduğu şirkətin adı2'
        },
        {
            id: 3,
            name: 'Əlaqəli olduğu şirkətin adı3'
        }
    ])

    const [StaffSelect, setStaffSelect] = useState([
        {
            id: 1,
            name: 'Əməkdaşın adı'
        },
        {
            id: 2,
            name: 'Əməkdaşın adı2'
        },
        {
            id: 3,
            name: 'Əməkdaşın adı3'
        }
    ])

    const [ContactData, setContactData] = useState({
        id: 1,
        phone: 'Telefon nömrəsi',
        email: "E-mail",
        address: "Ünvan",
        person: "Əlaqədar şəxs",
        staff: 1,
        note: "Qeyd üçün max 200 söz"
    })
    return (
        <div className="ContactInfo">
            <div className="ContactInfo__main">
                <span className="ContactInfo__name">Contact full name</span>
                <div className="ContactInfo__component">
                    <Select
                        disabled={ComponentStatus.company}
                        showArrow={false}
                        value={ContactData.id}
                        onChange={(event) => setContactData({ ...ContactData, id: event })}
                        style={{ width: 400 }}
                    >
                        {CompanySelect.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}
                    </Select>
                    <Button
                        type='link'
                        icon={ComponentStatus.company ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, company: !ComponentStatus.company }) }}></Button>
                </div>
                <div className="ContactInfo__component">
                    <Input

                        disabled={ComponentStatus.phone}
                        className="ContactInfo__component--input"
                        style={{ width: 400 }}
                        value={ContactData.phone}
                    />
                    <Button
                        type='link'
                        icon={ComponentStatus.phone ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, phone: !ComponentStatus.phone }) }}
                    ></Button>
                </div>
                <div className="ContactInfo__component">
                    <Input
                        disabled={ComponentStatus.email}
                        className="ContactInfo__component--input"
                        style={{ width: 400 }}
                        value={ContactData.email}
                    />
                    <Button
                        type='link'
                        icon={ComponentStatus.email ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, email: !ComponentStatus.email }) }}
                    ></Button>
                </div>
                <div className="ContactInfo__component">
                    <Input
                        disabled={ComponentStatus.address}
                        className="ContactInfo__component--input"
                        style={{ width: 400 }}
                        value={ContactData.address}
                    />
                    <Button
                        type='link'
                        icon={ComponentStatus.address ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, address: !ComponentStatus.address }) }}
                    ></Button>
                </div>
                <div className="ContactInfo__component">
                    <Input
                        disabled={ComponentStatus.person}
                        className="ContactInfo__component--input"
                        style={{ width: 400 }}
                        value={ContactData.person}
                    />
                    <Button
                        type='link'
                        icon={ComponentStatus.person ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, person: !ComponentStatus.person }) }}
                    ></Button>
                </div>
                <div className="ContactInfo__component">
                    <Select
                        disabled={ComponentStatus.staff}
                        showArrow={false}
                        value={ContactData.staff}
                        onChange={(event) => setContactData({ ...ContactData, staff: event })}
                        style={{ width: 400 }}
                    >
                        {StaffSelect.map(item => (
                            <Select.Option key={item.id} value={item.id}>
                                {item.name}
                            </Select.Option>
                        ))}...
                    </Select>
                    <Button
                        type='link'
                        icon={ComponentStatus.staff ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, staff: !ComponentStatus.staff }) }}
                    ></Button>
                </div>
                <div className="ContactInfo__component">
                    <TextArea
                        disabled={ComponentStatus.note}
                        className="ContactInfo__component--input"
                        style={{ width: 400 }}
                        value={ContactData.note}
                        autoSize={{ minRows: 2 }}
                    />
                    <Button
                        type='link'
                        icon={ComponentStatus.note ? <EditOutlined /> : <CheckOutlined />}
                        onClick={() => { setComponentStatus({ ...ComponentStatus, note: !ComponentStatus.note }); setCompanySelect([]); setStaffSelect([]) }}
                    ></Button>
                </div>
            </div>
            <Divider type="vertical" style={{ height: 'auto', width: 1.5 }} />
            <div className="ContactInfo__timeline">
                <Timeline mode='left'>
                    <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: '16px', color: '#00C851' }} />}  >2015-09-01 09:12:11 Create a services</Timeline.Item>
                    <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: '16px', color: '#33b5e5' }} />} >2015-09-01 09:12:11 Solve initial network problems</Timeline.Item>
                    <Timeline.Item dot={<CloseCircleOutlined style={{ fontSize: '16px', color: '#ff4444' }} />} >2015-09-01 09:12:11 Technical testing</Timeline.Item>
                    <Timeline.Item dot={<ExclamationCircleOutlined style={{ fontSize: '16px', color: '#ffbb33' }} />}>2015-09-01 09:12:11 Network problems being solved</Timeline.Item>
                </Timeline>
            </div>
        </div>
    )
}
export default ContactInfo;