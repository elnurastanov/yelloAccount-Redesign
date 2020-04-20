import React, { useState, useEffect } from 'react'
import { getCompanies, getDepartmentsByCompanyID, getPositionsByDepartmentID } from '../../../routes/OrganizationController'
import { getStaffById, editStaff } from '../../../routes/StaffController'
import { Input, Select, Button, Modal, message } from 'antd'
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
    WalletOutlined,
    CalendarOutlined
} from '@ant-design/icons'

function StaffModal({ visible, onVisibleChange = (value) => { }, getID, refresh = () => { } }) {

    const { Option } = Select;
    const [SelectOption, setSelectOption] = useState({
        companyOption: [],
        departmentOption: [],
        positionOption: []
    })

    const [modalData, setModalData] = useState({
        name: undefined,
        surname: undefined,
        patronymic: undefined,
        IDSerial: undefined,
        IDFIN: undefined,
        adress: undefined,
        phone: undefined,
        email: undefined,
        startDate: undefined,
        serviceDate: undefined,
        company: undefined,
        department: undefined,
        position: undefined,
        workPhone: undefined,
        workEmail: undefined,
        salaryCard: undefined,
        socialCard: undefined,
        salary: undefined,
        note: 'Qeyd...',
        defaultCompany: undefined,
        defaultDepartment: undefined

    })

    useEffect(() => {
        if (visible) {
            getStaffById(getID).then(
                result => {
                    setModalData((modalData) => {
                        return {
                            ...modalData,
                            name: result.data.first_name,
                            surname: result.data.last_name,
                            patronymic: result.data.patronymic,
                            IDSerial: result.data.id_card,
                            IDFIN: result.data.id_FIN,
                            adress: result.data.adress,
                            phone: result.data.private_phone,
                            email: result.data.private_email,
                            startDate: result.data.join_date,
                            serviceDate: result.data.experience,
                            company: result.data.company_id,
                            department: result.data.department_id,
                            position: result.data.position_id,
                            note: result.data.note,
                            defaultCompany: result.data.company_id,
                            defaultDepartment: result.data.department_id
                        }
                    })
                }
            ).catch(
                error => {
                    console.log(`getStaffById Error => ${error}`);
                    message.error('Xəta baş verdi')
                }
            )
        }
    }, [visible, getID])

    useEffect(() => {

        getCompanies().then(
            result => setSelectOption((SelectOption) => {
                return {
                    ...SelectOption,
                    companyOption: result.data
                }
            })
        ).catch(
            error => {
                console.log(`getCompany Error => ${error}`);
                message.error('Xəta baş verdi')
            }
        )

    }, [])

    useEffect(() => {
        if (modalData.company) {
            getDepartmentsByCompanyID(modalData.company).then(
                result => setSelectOption((SelectOption) => {
                    return {
                        ...SelectOption,
                        departmentOption: result.data
                    }
                })
            ).catch(
                error => {
                    console.log(`getDepartmentsByCompanyId Error => ${error}`);
                    message.error('Xəta baş verdi')
                }
            ).finally(
                () => {
                    if (modalData.company !== modalData.defaultCompany) {
                        setModalData((modalData) => { return { ...modalData, department: undefined } });
                        setModalData((modalData) => { return { ...modalData, position: undefined } });
                        setModalData((modalData) => { return { ...modalData, defaultCompany: modalData.company } });
                        setSelectOption((SelectOption) => { return { ...SelectOption, positionOption: [] } });
                    }
                }
            )
        }
    }, [modalData.company, modalData.defaultCompany])

    useEffect(() => {
        if (modalData.department) {
            getPositionsByDepartmentID(modalData.department).then(
                result => setSelectOption((SelectOption) => {
                    return {
                        ...SelectOption,
                        positionOption: result.data
                    }
                })
            ).catch(
                error => {
                    console.log(`getPositionByDepartmentId Error => ${error}`);
                    message.error('Xəta baş verdi')
                }
            ).finally(
                () => {
                    if (modalData.department !== modalData.defaultDepartment) {
                        setModalData((modalData) => { return { ...modalData, position: undefined } });
                        setModalData((modalData) => { return { ...modalData, defaultDepartment: modalData.department } });

                    }
                }
            )
        }
    }, [modalData.department, modalData.defaultDepartment])

    function sendData(id) {
        if (modalData.name === '' || modalData.surname === '' || modalData.patronymic === '' || modalData.IDSerial === '' || modalData.IDFIN === '' || modalData.adress === '' || modalData.phone === '' || modalData.email === '') {
            message.warning('Əməkdaş haqqında ilkin məlumatlar boş ola bilməz');
        } else {
            editStaff(id, {
                position_id: modalData.position,
                first_name: modalData.name,
                last_name: modalData.surname,
                patronymic: modalData.patronymic,
                id_card: modalData.IDSerial,
                id_FIN: modalData.IDFIN,
                adress: modalData.adress,
                private_phone: modalData.phone,
                private_email: modalData.email,
                work_phone: modalData.workPhone,
                work_email: modalData.workEmail,
                salary_card: modalData.salaryCard,
                social_insurance: modalData.socialCard,
                salary: modalData.salary,
                note: modalData.note
            }).then(
                result => {
                    if(result.status === 200){
                        message.success('Əməkdaş haqqında məlumatlar yeniləndi');
                        onVisibleChange(false);
                        refresh();
                    }
                }
            ).catch(
                error => {
                    console.log(`editStaff Error => ${error}`);
                    message.error('Xəta baş verdi');
                }
            )
        }

    }

    return (
        <Modal
            visible={visible}
            title="İşçinin adı"
            onCancel={() => onVisibleChange(false)}
            footer={[
                <Button key="1237" onClick={() => onVisibleChange(false)} >Bağla</Button>,
                <Button type="primary" key="12374" onClick={() => sendData(getID)} >Məlumatları yenilə</Button>
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
                    onChange={(event) => { setModalData({ ...modalData, surname: event.target.value }) }}
                    size='small' />
                <Input
                    prefix={<UserOutlined />}
                    style={{ width: 150 }}
                    value={modalData.patronymic}
                    onChange={(event) => { setModalData({ ...modalData, patronymic: event.target.value }) }}
                    size='small' />
            </div>
            <div className="modalContent">
                <Input
                    prefix={<IdcardOutlined />}
                    style={{ width: 150 }}
                    value={modalData.IDSerial}
                    onChange={(event) => { setModalData({ ...modalData, IDSerial: event.target.value }) }}
                    size='small' />
                <Input
                    prefix={<IdcardOutlined />}
                    style={{ width: 150 }}
                    value={modalData.IDFIN}
                    onChange={(event) => { setModalData({ ...modalData, IDFIN: event.target.value }) }}
                    size='small' />
                <Input
                    prefix={<HomeOutlined />}
                    style={{ width: 150 }}
                    value={modalData.adress}
                    onChange={(event) => { setModalData({ ...modalData, adress: event.target.value }) }}
                    size='small' />
            </div>
            <div className="modalContent">
                <Input
                    prefix={<PhoneOutlined />}
                    style={{ width: 230 }}
                    value={modalData.phone}
                    onChange={(event) => { setModalData({ ...modalData, phone: event.target.value }) }}
                    size='small' />
                <Input
                    prefix={<MailOutlined />}
                    style={{ width: 230 }}
                    value={modalData.email}
                    onChange={(event) => { setModalData({ ...modalData, email: event.target.value }) }}
                    size='small' />
            </div>
            <div className="modalContent">
                <Input
                    prefix={<CalendarOutlined />}
                    style={{ width: 230 }}
                    value={modalData.startDate}
                    disabled={true}
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
                <Select
                    style={{ width: 150 }}
                    size='small'
                    value={modalData.company}
                    onChange={(data) => { setModalData({ ...modalData, company: data }) }}>
                    {
                        SelectOption.companyOption.map((value) => {
                            return <Option key={value.id} value={value.id}>{value.name}</Option>
                        })
                    }
                </Select>
                <Select
                    style={{ width: 150 }}
                    size='small'
                    value={modalData.department}
                    onChange={(data) => { setModalData({ ...modalData, department: data }) }}>
                    {
                        SelectOption.departmentOption.map((value) => {
                            return <Option key={value.id} value={value.id}>{value.name}</Option>
                        })
                    }
                </Select>
                <Select
                    style={{ width: 150 }}
                    size='small'
                    value={modalData.position}
                    onChange={(data) => { setModalData({ ...modalData, position: data }) }}>
                    {
                        SelectOption.positionOption.map((value) => {
                            return <Option key={value.id} value={value.id}>{value.name}</Option>
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