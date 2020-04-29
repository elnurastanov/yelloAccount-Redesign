import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'


const notAuthorized = () => {

    return (
        <Result
            status="403"
            title="403"
            subTitle="Bağışlayın, sizin bu səhifəyə daxil olmağa səlahiyyətiniz yoxdur"
            extra={<Button type="primary"><Link to='/'>Ana Səhifə</Link></Button>}
        />
    )

}

export default notAuthorized;