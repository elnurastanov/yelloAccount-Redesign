import React, { useState, useEffect } from 'react'
import { getStaff } from '../../../routes/StaffController'
import { List, Avatar, message } from 'antd'
import StaffModal from '../modal/modal'


function StaffLIst() {


    //Staff modal
    const [visible, setVisible] = useState(false)

    const [ListData, setListData] = useState([])

    useEffect(() => {
        getStaff().then(
            result => {
                setListData(result.data)
            }
        ).catch(
            error => {
                message.error('Xəta baş verdi');
                console.log(`getStaff Error => ${error}`)
            }
        )
    }, [])

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
                dataSource={ListData}
                renderItem={item => (
                    <List.Item key={item.id} style={{ height: 40, paddingTop: 0, paddingBottom: 0, paddingLeft: 16, paddingRight: 16 }}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    onClick={() => { setVisible(true) }}
                                    src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
                                    style={{ cursor: 'pointer' }}
                                />}
                            title={
                                <span
                                    onClick={() => { setVisible(true) }}
                                    style={{ cursor: 'pointer' }}
                                >{item.fullName}</span>
                            }
                            description={item.fullMeta}
                        />
                    </List.Item>
                )}
            />
            <StaffModal visible={visible} onVisibleChange={(value) => setVisible(value)} />
        </section>

    )
}

export default StaffLIst