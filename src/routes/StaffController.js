import Api from './index'

const getStaff = () => {
    return Api.get('staff').then(res => res)
}

const getStaffById = (id) => {
    return Api.get(`staff/modal/${id}`).then(res => res)
}



const addStaff = ({
    position_id,
    first_name,
    last_name,
    patronymic,
    id_card,
    id_FIN,
    adress,
    join_date,
    private_phone,
    private_email,
    note
}) => {
    return Api.post('staff', {
        position_id: position_id,
        first_name: first_name,
        last_name: last_name,
        patronymic: patronymic,
        id_card: id_card,
        id_FIN: id_FIN,
        adress: adress,
        join_date: join_date,
        private_phone: private_phone,
        private_email: private_email,
        note: note
    }).then(res => res)
}



const editStaff = (id,
    {
        position_id,
        first_name,
        last_name,
        patronymic,
        id_card,
        id_FIN,
        adress,
        private_phone,
        private_email,
        work_phone,
        work_email,
        salary_card,
        social_insurance,
        salary,
        note
    }) => {
    return Api.put(`staff/modal/${id}`, {
        position_id: position_id,
        first_name: first_name,
        last_name: last_name,
        patronymic: patronymic,
        id_card: id_card,
        id_FIN: id_FIN,
        adress: adress,
        private_phone: private_phone,
        private_email: private_email,
        work_phone: work_phone,
        work_email: work_email,
        salary_card: salary_card,
        social_insurance: social_insurance,
        salary: salary,
        note: note
    }).then(res => res)
}



const deleteStaff = (id) => {
    return Api.delete(`staff/modal/${id}`).then(res => res)
}

export {
    getStaff,
    getStaffById,
    addStaff,
    editStaff,
    deleteStaff,
}