import React from 'react'
import './register.css'
import { Input } from 'antd';
import logo from '../../../assets/black.svg'


const Register = () => {
    return(
        <div className="Register">
            <img src={logo} alt="logo" />
            <Input className="Register_content" placeholder="FIN kodunuzu daxil edin" style={{ width: 300 }}/>
        </div>
    )
}

export default Register;