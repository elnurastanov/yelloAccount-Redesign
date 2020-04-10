import React, { useState } from 'react'
import { List, Avatar } from 'antd'
import StaffModal from '../modal/modal'


function StaffLIst() {


    //Staff modal
    const [visible, setVisible] = useState(false)

    const listData = [{
        staffName: 'Elnur',
        staffSurname: 'Astanov',
        staffPatronymic: 'Aslan',
        staffPosition: 'Dev'
    }]

    return (
        <section className="StaffList">
            <List
                itemLayout="vertical"
                size="small"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}

                style={{ width: 300, height: 396 }}
                dataSource={listData}
                renderItem={item => (
                    <List.Item key={item.staffName} style={{ height: 40, paddingTop: 0, paddingBottom: 0, paddingLeft: 16, paddingRight: 16 }}>
                        <List.Item.Meta
                            avatar={<Avatar onClick={() => { setVisible(true) }} src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} style={{ cursor: 'pointer' }} />}
                            title={<span onClick={() => { setVisible(true) }} style={{ cursor: 'pointer' }} >{`${item.staffName} ${item.staffSurname} ${item.staffPatronymic}`}</span>}
                            description={item.staffPosition}
                        />
                    </List.Item>
                )}
            />
            <StaffModal visible={visible} onVisibleChange = {(value) => setVisible(value) } />
        </section>

    )
}

export default StaffLIst