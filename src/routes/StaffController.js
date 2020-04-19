import Api from './index'

const getStaff = () => {
    return Api.get('staff').then(res => res)
}



const addStaff = ({ position_id, first_name, last_name, patronymic, id_card, id_FIN, adress, join_date, private_phone, private_email, note }) => {
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

export {
    getStaff,
    addStaff
}