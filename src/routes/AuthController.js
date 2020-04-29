import Api from './index'

const loginUser = ({username,  password}) => {
    return Api.post('login', {
        username: username,
        password: password
    }).then(res => res)
}

export {
    loginUser
}