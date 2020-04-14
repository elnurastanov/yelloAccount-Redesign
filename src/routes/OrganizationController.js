import Api from './index'

const getCompanies = () => {
    return Api.get('organization/company').then(res => res)
}

const getCompaniesByID = (id) => {
    return Api.get(`organization/company/modal/${id}`).then(res => res)
}




const addCompanies = ({name, direction}) => {
    return Api.post(`organization/company/modal`,{
        name: name,
        direction: direction
    }).then(res => res)
}




const editCompanies = (id, {name, direction}) => {
    return Api.put(`organization/company/modal/${id}`, {
        name: name,
        direction: direction
    }).then(res => res)
}



const deleteCompanies = (id) => {
    return Api.delete(`organization/company/${id}`).then(res => res)
}

export {
    getCompanies,
    getCompaniesByID,
    addCompanies,
    editCompanies,
    deleteCompanies
}