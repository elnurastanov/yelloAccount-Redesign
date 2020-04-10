import React, { useState } from 'react'
import { Input, Select, DatePicker, Button, Modal, Popconfirm, message } from 'antd'
import moment from 'moment'
import {
    UserOutlined,
    IdcardOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    SolutionOutlined,
    HistoryOutlined,
    CreditCardOutlined,
    BankOutlined,
    WalletOutlined
} from '@ant-design/icons'

function StaffModal({ visible, onVisibleChange = (value) =>{} }) {

    const options = [{ value: "Yello" }, { value: "YelloAD" }]
    const options1 = [{ value: "test" }, { value: 'test2' }]
    const { Option } = Select;

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
        company: '',
        department: '',
        position: '',
        workPhone: '',
        workEmail: '',
        salaryCard: '',
        socialCard: '',
        salary: '',
        note: 'Qeyd...'

    })

    const test = () => {console.log(modalData)}

    return (
        <Modal
            visible={visible}
            title="İşçinin adı"
            onCancel={ () => onVisibleChange(false)}
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
                <Button type="primary" key="12374" onClick={test} >Məlumatları yenilə</Button>,
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
                <Select placeholder='YelloAD' style={{ width: 150 }} size='small' onChange={(data) => {setModalData({...modalData, company:data})}}>
                    {
                        options.map((data, index) => {
                            return <Option key={index} value={data.value}>{data.value}</Option>
                        })
                    }
                </Select>
                <Select placeholder='Administrasiya' style={{ width: 150 }} size='small' onChange={(data) => {setModalData({...modalData, department:data})}}>
                    {
                        options1.map((data, index) => {
                            return <Option key={index} value={data.value}>{data.value}</Option>
                        })
                    }
                </Select>
                <Select placeholder='Direktor' style={{ width: 150 }} size='small' onChange={(data) => {setModalData({...modalData, position:data})}}>
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
        </Modal>
    )
}

export default StaffModal;