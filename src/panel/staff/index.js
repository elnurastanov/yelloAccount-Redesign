import React, { useState } from 'react'
import './staff.css'
import { Divider } from 'antd'
import StaffForm from './form/form'
import StaffList from './list/list'

function Staff() {

    const [ReloadState, setReloadState] = useState(false)

    return (
        <section className="Staff">
            <StaffList reload={ReloadState}/>
            <Divider type="vertical" style={{ height: 'auto' }} />
            <StaffForm onChangeRelaod={(value) => setReloadState(value)}/>
        </section >
    )
}

export default Staff;