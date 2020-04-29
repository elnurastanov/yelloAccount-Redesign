import React from 'react'
import { Modal, Button } from 'antd'

const ModifyUser = ({visible, isVisible = (value) => {}}) => {
    return (
        <div>
            <Button type="primary" onClick={this.showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                visible={visible}
                onCancel={isVisible(false)}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Bağla
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => {}}>
                      Məlumatları yenilə
                    </Button>,
                  ]}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default ModifyUser;