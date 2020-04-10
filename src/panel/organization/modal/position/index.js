import React from 'react'
import { Modal, Input, Typography, Select } from 'antd';
import { ReconciliationOutlined } from '@ant-design/icons'

const { Text } = Typography
const { Option } = Select

function PositionModal({visible, onVisibleChange = (value) => {}}) {

    const option = [
        { company: 'Yello' },
        { company: 'YelloAD' }
    ]

    return (
        <Modal
            title="Vəzifə əlavə et"
            visible={visible}
            onOk={() => { }}
            onCancel={() => {onVisibleChange(false)}}
        >
            <div className="Modal__content">
                <Text strong>Şirkətin adı</Text>
                <Select defaultValue="Şirkət" style={{ width: 200 }} >
                    {
                        option.map((data, index) => {
                            return <Option key={index}>{data.company}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Departamentin adı</Text>
                <Select defaultValue="Departament" style={{ width: 200 }} >
                    {
                        option.map((data, index) => {
                            return <Option key={index}>{data.company}</Option>
                        })
                    }
                </Select>
            </div>
            <div className="Modal__content">
                <Text strong>Vəzifə adı</Text>
                <Input placeholder="Vəzifə" prefix={<ReconciliationOutlined />} />
            </div>
        </Modal>
    )
}

export default PositionModal;