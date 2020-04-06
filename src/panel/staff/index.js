import React, { useState, useEffect } from 'react'
import './staff.css'
import { Form, Input, Select, DatePicker, Button, List, Avatar, Modal, Popconfirm, message } from 'antd'
import moment from 'moment'
import {
    UserOutlined,
    IdcardOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    SolutionOutlined,
    PlusCircleOutlined,
    ReloadOutlined,
    HistoryOutlined,
    CreditCardOutlined,
    BankOutlined,
    WalletOutlined
} from '@ant-design/icons'


// Form PROPS
const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 16 },
};

function Staff() {

    //Staff Components State
    const [staffState, setStaffState] = useState({})

    //Staff Form
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            staffName: undefined,
            staffSurname: undefined,
            staffPatronymic: undefined,
            staffIDSerial: undefined,
            staffIDFin: undefined,
            staffAdress: undefined,
            staffPhone: undefined,
            staffEmail: undefined,
            staffCompany: undefined,
            staffDepartment: undefined,
            staffPosition: undefined,
            staffStartDate: undefined,
            staffNote: undefined
        });
    }, [form])

    function onFinish(event) {
        setStaffState({
            ...staffState,
            staffName: event.staffName,
            staffSurname: event.staffSurname,
            staffPatronymic: event.staffPatronymic,
            staffIDSerial: event.staffIDSerial,
            staffIDFin: event.staffIDFin,
            staffAdress: event.staffAdress,
            staffPhone: event.staffPhone,
            staffEmail: event.staffEmail,
            staffCompany: event.staffCompany,
            staffDepartment: event.staffDepartment,
            staffPosition: event.staffPosition,
            staffStartDate: event.staffStartDate,
            staffNote: event.staffNote
        })


    }

    function ResetForm() {
        form.resetFields()
        console.log(staffState)
    }

    // Select Component
    const options = [{ value: "Yello" }, { value: "YelloAD" }]
    const options1 = [{ value: "test" }, { value: 'test2' }]
    const { Option } = Select;

    //Staff list
    const listData = [];
    for (let i = 0; i < 1; i++) {
        listData.push({

            title: `test`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description:
                'dizayner',

        });
    }

    //Staff modal
    const [visible, setvisible] = useState(false)

    const handleVisible = () => {
        setvisible(!visible)
    }

    const confirm = () => {
        message.success('Əmakdaş işdən azad edildi')
    }



    const [modalData, setModalData] = useState({
        name: 'Elnur',
        surname: 'Astanov',
        patronymic: 'Aslan',
        IDSerial: 'AZE 13553101',
        IDFIN: '63JA0NX',
        adress: 'Gence PR. 44',
        phone: '+994 51 964 68 75',
        email: 'elnurastanov@hotmail.com',
        startDate: moment('12-02-2020', 'DD-MM-YYYY'),
        serviceDate: `2 il 3 ay 17 gün`,
        workPhone: '',
        workEmail: '',
        salaryCard: '',
        socialCard: '',
        salary: '',
        note: 'qeyd bura olacaq'

    })

    const test = () => {

        console.log()
    }

    return (
        <section className="Staff">
            <Form form={form} {...layout} name="Salary__form" onFinish={onFinish} layout='vertical' size='small' >
                <div className="Form__customLayout">

                    <Form.Item name="staffName" label="Adı"
                        rules={[{ required: true, message: 'Adı daxil edin' }]} >
                        <Input placeholder='Elnur'
                            prefix={<UserOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item name="staffSurname" label="Soyadı"
                        rules={[{ required: true, message: 'Soyadı daxil edin' }]} >
                        <Input placeholder='Astanov'
                            prefix={<UserOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item name="staffPatronymic" label="Atasının adı"
                        rules={[{ required: true, message: 'Ata adın daxil edin' }]} >
                        <Input placeholder='Aslan'
                            prefix={<UserOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                </div>
                <div className="Form__customLayout">

                    <Form.Item name="staffIDSerial" label="Ş/v seriyası"
                        rules={[{ required: true, message: 'Seriya nömrəsin daxil edin' }]} >
                        <Input placeholder='AZE ********'
                            prefix={<IdcardOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item name="staffIDFin" label="FIN"
                        rules={[{ required: true, message: 'FİN kodu daxil edin' }]} >
                        <Input placeholder='*******'
                            prefix={<IdcardOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item name="staffAdress" label="Yaşadığı ünvan"
                        rules={[{ required: true, message: 'Ünvanı daxil edin' }]} >
                        <Input placeholder='Bakı ş., Xətai ray.'
                            prefix={<HomeOutlined />}
                            style={{ width: 200 }} />
                    </Form.Item>

                </div>
                <div className="Form__customLayout">

                    <Form.Item name="staffPhone" label="Əlaqə nömrəsi"
                        rules={[
                            { required: true, message: 'Əlaqə nömrəsin daxil edin!' }
                        ]} >
                        <Input placeholder='+994 51 551 51 51'
                            prefix={<PhoneOutlined />}
                            style={{ width: 325 }}
                        />
                    </Form.Item>

                    <Form.Item name="staffEmail" label="E-mail"
                        rules={[
                            { required: true, message: 'E-mail daxil edin!' },
                            { type: 'email', message: 'E-mail formatı doğru deyil!' }
                        ]} >
                        <Input placeholder='hello@yelload.com'
                            prefix={<MailOutlined />}
                            style={{ width: 325 }} />
                    </Form.Item>

                </div>
                <div className="Form__customLayout">

                    <Form.Item name="staffCompany" label="Şirkət"
                        rules={[{ required: true, message: 'Şirkət seçin' }]} >
                        <Select placeholder='YelloAD' style={{ width: 200 }} >
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item name="staffDepartment" label="Departament"
                        rules={[{ required: true, message: 'Departament seçin' }]} >
                        <Select placeholder='Administrasiya' style={{ width: 200 }} >
                            {
                                options1.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item name="staffPosition" label="Vəzifə"
                        rules={[{ required: true, message: 'Vəzifə seçin' }]} >
                        <Select placeholder='Direktor' style={{ width: 200 }} >
                            {
                                options1.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                </div>
                <div className="Form__customLayout">

                    <Form.Item name="staffStartDate" label="İşə başlama tarixi"
                        rules={[{ required: true, message: 'Başlama tarixi seçin' }]} >
                        <DatePicker style={{ width: 200 }} format={'DD-MM-YYYY'} />
                    </Form.Item>

                    <Form.Item name="staffNote" label="Qeyd" rules={[{ required: false }]} >
                        <Input placeholder='Qeyd...'
                            prefix={<SolutionOutlined />}
                            style={{ width: 450 }} />
                    </Form.Item>

                </div>
                <div className="Form__footer">
                    <div className="Form__footer--button">
                        <Button type="primary" onClick={ResetForm} danger icon={<ReloadOutlined />} size='middle'>Sıfırla</Button>
                    </div>
                    <div className="Form__footer--button">
                        <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />} size='middle'>Əlavə et</Button>
                    </div>
                </div>
            </Form>
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}

                style={{ width: 300 }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item key={item.title} style={{ height: 40, paddingTop: 0, paddingBottom: 0, paddingLeft: 16, paddingRight: 16 }}>
                        <List.Item.Meta
                            avatar={<Avatar onClick={handleVisible} src={item.avatar} style={{ cursor: 'pointer' }} />}
                            title={<a onClick={handleVisible} href={item.href}>{item.title}</a>}
                            description={item.description}

                        />
                    </List.Item>
                )}
            />
            <div>
                <Modal
                    visible={visible}
                    title="İşçinin adı"
                    onCancel={handleVisible}
                    footer={[
                        <Popconfirm
                            title="Əməkdaşı işdən azad etməyə əminsizniz?"
                            onConfirm={confirm}
                            okText="Bəli"
                            cancelText="Xeyr"
                            key="12314"
                        >
                            <Button type="primary" danger >Işdən azad et</Button>
                        </Popconfirm>,
                        <Button type="primary" onClick={test} key="12374" >Məlumatları yenilə</Button>,
                    ]}
                >
                    <div className="modalContent">
                        <Input
                            prefix={<UserOutlined />}
                            style={{ width: 150 }}
                            value={modalData.name}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                        <Input
                            prefix={<UserOutlined />}
                            style={{ width: 150 }}
                            value={modalData.surname}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                        <Input
                            prefix={<UserOutlined />}
                            style={{ width: 150 }}
                            value={modalData.patronymic}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">
                        <Input
                            prefix={<IdcardOutlined />}
                            style={{ width: 150 }}
                            value={modalData.IDSerial}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                        <Input
                            prefix={<IdcardOutlined />}
                            style={{ width: 150 }}
                            value={modalData.IDFIN}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                        <Input
                            prefix={<HomeOutlined />}
                            style={{ width: 150 }}
                            value={modalData.adress}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">
                        <Input
                            prefix={<PhoneOutlined />}
                            style={{ width: 230 }}
                            value={modalData.phone}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                        <Input
                            prefix={<MailOutlined />}
                            style={{ width: 230 }}
                            value={modalData.email}
                            onChange={(event) => { setModalData({ ...modalData, name: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">
                        <DatePicker
                            defaultValue={modalData.startDate}
                            format={'DD-MM-YYYY'}
                            style={{ width: 230 }}
                            size='small'
                        />
                        <Input
                            prefix={<HistoryOutlined />}
                            style={{ width: 230 }}
                            value={modalData.serviceDate}
                            disabled={true}
                            size='small'
                        />

                    </div>
                    <div className="modalContent">
                        <Select placeholder='YelloAD' style={{ width: 150 }} size='small'>
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                        <Select placeholder='Administrasiya' style={{ width: 150 }} size='small'>
                            {
                                options1.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                        <Select placeholder='Direktor' style={{ width: 150 }} size='small'>
                            {
                                options1.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </div>
                    <div className="modalContent">
                        <Input
                            placeholder='Şirkət nömrəsi'
                            prefix={<PhoneOutlined />}
                            style={{ width: 230 }}
                            value={modalData.workPhone}
                            onChange={(event) => { setModalData({ ...modalData, workPhone: event.target.value }) }}
                            size='small' />
                        <Input
                            placeholder='Şirkət e-maili'
                            prefix={<MailOutlined />}
                            style={{ width: 230 }}
                            value={modalData.workEmail}
                            onChange={(event) => { setModalData({ ...modalData, workEmail: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">
                        <Input
                            placeholder='Ə/H kartının nömrəsi'
                            prefix={<CreditCardOutlined />}
                            style={{ width: 230 }}
                            value={modalData.salaryCard}
                            onChange={(event) => { setModalData({ ...modalData, salaryCard: event.target.value }) }}
                            size='small' />
                        <Input
                            placeholder='S/S kartının nömrəsi'
                            prefix={<BankOutlined />}
                            style={{ width: 230 }}
                            value={modalData.socialCard}
                            onChange={(event) => { setModalData({ ...modalData, socialCard: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">
                        
                        <Input
                            placeholder='Əməkhaqqı'
                            prefix={<WalletOutlined />}
                            style={{ width: 150 }}
                            value={modalData.salary}
                            onChange={(event) => { setModalData({ ...modalData, salary: event.target.value }) }}
                            size='small'
                            type='number' />
                        <Input
                            prefix={<SolutionOutlined />}
                            style={{ width: 311 }}
                            value={modalData.note}
                            onChange={(event) => { setModalData({ ...modalData, note: event.target.value }) }}
                            size='small' />
                    </div>
                    <div className="modalContent">

                    </div>
                    <div className="modalContent">

                    </div>
                </Modal>

            </div>
        </section >
    )
}

export default Staff;