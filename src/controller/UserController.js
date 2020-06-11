import Api from './index'

const getUserWithId = (id) => {
    return Api.get(`panel/users/${id}`).then(res => res)
}

const getUserWithStaffId = () => {
    return Api.get('panel/users').then(res => res)
}


const addUser = ({ staff_id, username, password }) => {
    return Api.post('register', {
        staff_id: staff_id,
        username: username,
        password: password
    }).then(res => res)
}

const addNewUserPassword = ({id, password}) => {
    return Api.post('panel/users', {
        id: id,
        password: password
    }).then(res => res)
}



const editUserRoles = ({ id, role }) => {
    return Api.put('panel/users', {
        id: id,
        role: role
    }).then(res => res)
}



const deleteUser = ({ id }) => {
    return Api.delete(`panel/users/${id}`)
        .then(res => res)
}


const activateUser = ({ id }) => {
    return Api.put(`panel/users/${id}`)
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