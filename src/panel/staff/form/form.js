import React, { useState, useEffect } from 'react'
import { Form, Input, Select, DatePicker, Button } from 'antd'
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

function StaffFrom() {
    
    //Staff Form
    const [form] = Form.useForm();
    const [staffState, setStaffState] = useState({})
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
    }

    // Select Component
    const options = [{ value: "Yello" }, { value: "YelloAD" }]
    const options1 = [{ value: "test" }, { value: 'test2' }]
    const { Option } = Select;

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
    )
}

export default StaffFrom;