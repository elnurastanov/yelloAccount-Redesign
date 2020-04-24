import React, { useState, useEffect } from 'react'
import './salary.css'
import { Form, Select, DatePicker, Input, InputNumber, Progress, Button } from 'antd'
// import moment from 'moment'
import { FormOutlined } from '@ant-design/icons'

// Form PROPS
const layout = {
    labelCol: { span: 16 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: `Boş saxlamayın!`
};



function Salary() {

    //Salary Components State
    const [salaryState, setSalaryState] = useState({
        salaryCompany: undefined,
        salaryExpenseType: undefined,
        salaryVendor: undefined,
        salaryDate: '',
        salaryStaff: undefined,
        salaryDestination: '',
        salaryExpenseChannel: undefined,
        salaryMonthly: null,
        salaryPaid: null
    })


    const [form] = Form.useForm();
    
    useEffect(() => {
        form.setFieldsValue({
            salaryCompany: undefined,
            salaryExpenseType: undefined,
            salaryVendor: undefined,
            salaryDate: '',
            salaryStaff: undefined,
            salaryDestination: '',
            salaryExpenseChannel: undefined,
        });
    }, [form])

    // Select Component
    const options = [{ value: "Yello" }, { value: "YelloAD" }]
    const options1 = [{ value: "test" }, { value: 'test2' }]
    const { Option } = Select;

    function ResetForm() {
        setSalaryState({
            salaryMonthly: null,
            salaryPaid: null
        });

        form.resetFields()
    }

    function onFinish(event) {
        setSalaryState({...salaryState,
            salaryCompany: event.salaryCompany,
            salaryExpenseType: event.salaryExpenseType,
            salaryVendor: event.salaryVendor,
            salaryDate: event.salaryDate,
            salaryStaff: event.salaryStaff,
            salaryDestination: event.salaryDestination,
            salaryExpenseChannel: event.salaryExpenseChannel,
        })        
    }



    return (
        <section className="Salary">
            <Form form={form} {...layout} name="Salary__form" onFinish={onFinish} validateMessages={validateMessages} layout='vertical' size='medium' >
                <div className="Form__customLayout">
                    <Form.Item name="salaryCompany" label="İcra edən şirkət" rules={[{ required: true }]} >
                        <Select style={{ width: 200 }}
                            placeholder="Şirkət">
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="salaryVendor" label="İcraçı / Vendor" rules={[{ required: true }]} >
                        <Select style={{ width: 200 }}
                            placeholder="İcraçı / Vendor">
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="salaryStaff" label="Əməkdaş" rules={[{ required: true }]} >
                        <Select style={{ width: 200 }}
                            placeholder="Əməkdaş">
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div className="Form__customLayout">
                    <Form.Item name="salaryDate" label="Ödəmə tarixi" rules={[{ required: true }]}>
                        <DatePicker style={{ width: 200 }} 
                            format={'DD-MM-YYYY'} />
                    </Form.Item>
                    <Form.Item name="salaryExpenseChannel" label="Ödəmə kanalı" rules={[{ required: true }]} >
                        <Select style={{ width: 200 }}
                            placeholder="Ödəmə kanalı">
                            {
                                options.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item name="formExpenseType" label="Xərc maddəsi" rules={[{ required: true }]} >
                        <Select
                            style={{ width: 200 }}
                            placeholder="Xərc maddəsi" >
                            {
                                options1.map((data, index) => {
                                    return <Option key={index} value={data.value}>{data.value}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </div>
                <div className="Form__customLayout">
                    <Form.Item name="salaryDestination" label="Təyinat" rules={[{ required: true }]} >
                        <Input placeholder='Açıqlama' 
                        prefix={<FormOutlined />}
                        style={{ width: 700 }} />
                    </Form.Item>
                </div>
                <div className="Form__customLayout">
                    <Form.Item name="salaryMonthly" label="Aylıq əməkhaqqı" rules={[{ required: true }]} >
                        <InputNumber
                            formatter={value => `₼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/₼\s?|(,*)/g, '')}
                            style={{ width: 200 }}
                            value={salaryState.salaryMonthly}
                            onChange={(data) => setSalaryState({...salaryState, salaryMonthly : data})}

                        />
                    </Form.Item>
                    <Form.Item name="salaryPaid" label="Ödənilən əməkhaqqı" rules={[{ required: true }]} >
                        <InputNumber
                            formatter={value => `₼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/₼\s?|(,*)/g, '')}
                            style={{ width: 200 }}
                            value={salaryState.salaryPaid}
                            onChange={(data) => setSalaryState({...salaryState, salaryPaid : data})}
                        />
                    </Form.Item>
                    <Form.Item label="Qalıq əməkhaqqı" rules={[{ required: true }]} >
                        <InputNumber
                            formatter={value => `₼ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/₼\s?|(,*)/g, '')}
                            style={{ width: 200 }}
                            disabled
                            value={salaryState.salaryMonthly - salaryState.salaryPaid}
                        />
                    </Form.Item>
                </div>
                <div className="Form__customLayout">
                    <Progress
                        strokeColor={{
                            '0%': '#ff0000',
                            '50': '#fff800',
                            '100%': '#00a8ff',
                        }}
                        status={
                            salaryState.salaryPaid / salaryState.salaryMonthly * 100 < 100
                                ? 'active'
                                : (salaryState.salaryPaid / salaryState.salaryMonthly * 100 >= 100
                                    ? 'success'
                                    : 'active'
                                )
                        }
                        percent={
                            salaryState.salaryMonthly === null || salaryState.salaryPaid === null
                                ? 0
                                : (salaryState.salaryPaid / salaryState.salaryMonthly * 100).toFixed(2)
                        }
                    />
                </div>
                <div className="Form__footer">
                    <div className="Form__footer--button">
                        <Button type="primary" onClick={ResetForm} danger>Sıfırla</Button>
                    </div>
                    <div className="Form__footer--button">
                        <Button type="primary" htmlType="submit">Təsdiqlə</Button>
                    </div>
                </div>
            </Form>
        </section >
    )
}

export default Salary;