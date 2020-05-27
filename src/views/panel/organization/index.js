import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { panelAuth } from '../../../routes/AuthController'
import appConfig from '../../../config/appconfig'
import './organization.css'
import { Divider } from 'antd'
import Header from './header'
import Content from './content'

const temp = JSON.parse(window.sessionStorage.getItem(appConfig.sessionStorage)).role

const Organization = () => {

    const history = useHistory()

    useEffect(() => {
        panelAuth({
            panel: 'users',
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
        <section className="Organization">
            <Header />
            <Divider />
            <Content />
        </section >
    )
}

export default Organization;