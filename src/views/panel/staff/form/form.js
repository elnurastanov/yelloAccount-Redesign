import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getCompanies, getDepartmentsByCompanyID, getPositionsByDepartmentID } from '../../../../controller/OrganizationController'
import { addStaff } from '../../../../controller/StaffController'
import { Form, Input, Select, DatePicker, Button, message } from 'antd'
import {
    UserOutlined,
    IdcardOutlined,
    HomeOutlined,
    MailOutlined,
    PhoneOutlined,
    SolutionOutlined,
    PlusCircleOutlined,
    ReloadOutlined
} from '@ant-design/icons'



// Form PROPS
const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 16 },
};

const StaffFrom = ({ onChangeRelaod = () => { } }) => {

    const history = useHistory()
    // Select Component
    const { Option } = Select;
    const [CompanyOption, setCompanyOption] = useState([])
    const [DepartmentOption, setDepartmentOption] = useState([])
    const [PositionOption, setPositionOption] = useState([])
    const [DropdownData, setDropdownData] = useState({
        company_id: undefined,
        department_id: undefined,
        position_id: undefined
    })

    useEffect(() => {

        getCompanies().then(
            result => setCompanyOption(result.data)
        ).catch(
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 500) history.replace('/500')
                }
            }
        )
    }, [history])

    useEffect(() => {
        if (DropdownData.company_id) {
            getDepartmentsByCompanyID(DropdownData.company_id)
                .then(result => setDepartmentOption(result.data))
                .catch(
                    error => {
                        if (error.response) {
                            const { status } = error.response;
                            if (status === 500) history.replace('/500')
                        }
                    }
                )
                .finally(
                    () => {
                        setDropdownData((DropdownData) => { return { ...DropdownData, department_id: undefined } });
                        setDropdownData((DropdownData) => { return { ...DropdownData, position_id: undefined } })
                    }
                )
        }
    }, [DropdownData.company_id, history])

    useEffect(() => {
        if (DropdownData.department_id) {

            getPositionsByDepartmentID(DropdownData.department_id).then(
                result => setPositionOption(result.data)
            ).catch(
                error => {
                    if (error.response) {
                        const { status } = error.response;
                        if (status === 500) history.replace('/500')
                    }
                }
            ).finally(
                () => { setDropdownData((DropdownData) => { return { ...DropdownData, position_id: undefined } }) }
            )

        }
    }, [DropdownData.department_id, history])

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
            staffNote: null
        });
    }, [form])

    function onFinish(event) {
        addStaff({
            position_id: DropdownData.position_id,
            first_name: event.staffName,
            last_name: event.staffSurname,
            patronymic: event.staffPatronymic,
            id_card: event.staffIDSerial,
            id_FIN: event.staffIDFin,
            adress: event.staffAdress,
            join_date: event.staffStartDate,
            private_phone: event.staffPhone,
            private_email: event.staffEmail,
            note: event.staffNote
        })
            .then(
                result => {
                    if (result.status === 201) {
                        message.success('Əməkdaş uğurla əlavə edildi');
                        ResetForm();
                        onChangeRelaod(true);
                    }
                }
            )
            .catch(
                error => {
                    if (error.response) {
                        const { status } = error.response;
                        if (status === 500) history.replace('/500')
                    }
                }
            )
    }

    function ResetForm() {
        form.resetFields();
        setDropdownData({ company_id: undefined, department_id: undefined, position_id: undefined })
    }

    return (
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
            <div className="Form__customLayout_select">

                <div className="customLayout__select">
                    <label className="select_label">Şirkət</label>
                    <Select
                        placeholder='YelloAD'
                        style={{ width: 200 }}
                        value={DropdownData.company_id}
                        onChange={(event) => setDropdownData({ ...DropdownData, company_id: event })}
                    >
                        {
                            CompanyOption.map((data) => {
                                return <Option key={data.id} value={data.id}>{data.name}</Option>
                            })
                        }
                    </Select>
                </div>



                <div className="customLayout__select">
                    <label className="select_label">Departament</label>
                    <Select
                        placeholder='Administrasiya'
                        style={{ width: 200 }}
                        value={DropdownData.department_id}
                        onChange={(event) => setDropdownData({ ...DropdownData, department_id: event })}
                    >
                        {
                            DepartmentOption.map((data) => {
                                return <Option key={data.id} value={data.id}>{data.name}</Option>
                            })
                        }
                    </Select>
                </div>

                <div className="customLayout__select">
                    <label className="select_label">Vəzifə</label>
                    <Select
                        placeholder='Direktor'
                        style={{ width: 200 }}
                        value={DropdownData.position_id}
                        onChange={(event) => setDropdownData({ ...DropdownData, position_id: event })}
                    >
                        {
                            PositionOption.map((data) => {
                                return <Option key={data.id} value={data.id}>{data.name}</Option>
                            })
                        }
                    </Select>
                </div>

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
    )
}

export default StaffFrom;