import { useEffect, useState } from 'react'
import appConfig from '../config/appconfig'

const Authenticated = () => {

    const [isAuthenticated, setisAuthenticated] = useState(true)

    useEffect(() => {

        let sessionData = window.sessionStorage.getItem(appConfig.sessionStorage)

        if (sessionData) {
            setisAuthenticated(true)
        } else {
            setisAuthenticated(false)
        }

    }, [])

    return isAuthenticated;

}

export default Authenticated;