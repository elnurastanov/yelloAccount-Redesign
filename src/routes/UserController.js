import Api from './index'

const getUserWithId = (id) => {
    return Api.get(`users/${id}`).then(res => res)
}

const getUserWithStaffId = () => {
    return Api.get('users').then(res => res)
}


const addUser = ({ staff_id, username, password }) => {
    return Api.post('register', {
        staff_id: staff_id,
        username: username,
        password: password
    }).then(res => res)
}

const addNewUserPassword = ({id, password}) => {
    return Api.post('users', {
        id: id,
        password: password
    }).then(res => res)
}



const editUserRoles = ({ id, role }) => {
    return Api.put('users', {
        id: id,
        role: role
    }).then(res => res)
}



const deleteUser = ({ id }) => {
    return Api.delete(`users/${id}`)
        .then(res => res)
}


const activateUser = ({ id }) => {
    return Api.put(`users/${id}`)
        .then(res => res)
}

export {
    getUserWithStaffId,
    getUserWithId,
    addUser,
    editUserRoles,
    deleteUser,
    activateUser,
    addNewUserPassword
}