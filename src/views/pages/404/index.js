import React from 'react'
import { Link } from 'react-router-dom'
import { Result, Button } from 'antd'


const notFound = () => {

    return (
        <Result
            status="404"
            title="404"
            subTitle="Bağışlayın, daxil olmaq isdədiyiniz səhifə mövcud deyil."
            extra={<Button type="primary"><Link to='/'>Ana Səhifə</Link></Button>}
        />
    )

}

export default notFound;