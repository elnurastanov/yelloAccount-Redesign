import Api from './index'

const getUserWithStaffId = () => {
    return Api.get('users').then(res => res)
}

const addUser = ({staff_id, username, password}) => {
    return Api.post('register', {
        staff_id: staff_id,
        username: username,
        password: password
    }).then(res => res)
}

export {
    getUserWithStaffId,
    addUser
}