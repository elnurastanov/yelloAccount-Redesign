import React from 'react'
import './organization.css'
import {Divider} from 'antd'
import Header from './header'
import Content from './content'

function Organization() {
     return (
        <section className="Organization">
            <Header />
            <Divider />
            <Content />
        </section >
    )
}

export default Organization;