import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import appConfig from '../../../config/appconfig'
import { panelAuth } from '../../../controller/AuthController'
import './staff.css'
import { Divider } from 'antd'
import StaffForm from './form/form'
import StaffList from './list/list'

const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage)).role

const Staff = () => {

    const history = useHistory()
    const [ReloadState, setReloadState] = useState(false)

    useEffect(() => {
        
        panelAuth({
            panel: 'staff',
            userRole: temp.split(',')
        }).then(
            result => null
        ).catch(
            error => {
                if (error.response) {
                    const { status } = error.response;
                    if (status === 403) history.replace('/403')

                }
            }
        )

    }, [history])

    return (
        <section className="Staff">
            <StaffList reload={ReloadState}/>
            <Divider type="vertical" style={{ height: 'auto' }} />
            <StaffForm onChangeRelaod={(value) => setReloadState(value)}/>
        </section >
    )
}

export default Staff;