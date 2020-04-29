import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'


const serverError = () => {

    return (
        <Result
            status="500"
            title="500"
            subTitle="Bağışlayın, Serverdə xəta baş verdi."
            extra={<Button type="primary"><Link to='/'>Ana Səhifə</Link></Button>}
        />
    )

}

export default serverError;