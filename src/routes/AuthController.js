import Api from './index'

const loginUser = ({ username, password }) => {
    return Api.post('login', {
        username: username,
        password: password
    }).then(res => res)
}

const panelAuth = ({ panel, userRole }) => {
    return Api.get(`panelauth/${panel}/${userRole}`).then(res => res)
}

export {
    loginUser,
    panelAuth
}