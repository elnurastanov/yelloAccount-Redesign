import React from 'react'
import './staff.css'
import { Divider } from 'antd'
import StaffForm from './form/form'
import StaffList from './list/list'

function Staff() {

    return (
        <section className="Staff">
            <StaffForm/>
            <Divider type="vertical" style={{ height: 'auto' }} />
            <StaffList/>
        </section >
    )
}

export default Staff;