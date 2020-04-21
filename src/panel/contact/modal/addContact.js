import React from 'react'
import { Modal, Button, Select, Input } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'

const { Option } = Select

const AddContact = ({ visible, onVisibleChange = (value) => { }, refresh = () => { } }) => {
    return (
        <Modal
            visible={visible}
            title="Kontakt əlavə edin"
            onCancel={() => onVisibleChange(false)}
            footer={[
                <Button
                    key="back"
                    onClick={() => onVisibleChange(false)}

                >
                    Geriyə
            </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={() => console.log('AddStaff OK')}

                >
                    Əlavə et
            </Button>,
            ]}
        >
            <p className="AddContactModal__label">Əlaqəli olduğu şirkət</p>
            <Select defaultValue="lucy" style={{ width: 200 }} >
                <Option value="lucy">Lucy</Option>
            </Select>
            <p className="AddContactModal__label">Kontaktın adı</p>
            <Input placeholder="Kontaktın tam adı" prefix={<UserAddOutlined />} />
        </Modal>
    )
}

export default AddContact