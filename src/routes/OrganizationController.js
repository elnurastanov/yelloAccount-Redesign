import Api from './index'

const getCompanies = () => {
    return Api.get('organization/company').then(res => res)
}

const getCompaniesByID = (id) => {
    return Api.get(`organization/company/modal/${id}`).then(res => res)
}

const getDepartments = () => {
    return Api.get(`organization/department`).then(res => res)
}

const getDepartmentsByID = (id) => {
    return Api.get(`organization/department/modal/${id}`).then(res => res)
}

const getPositions = () => {
    return Api.get(`organization/position`).then(res => res)
}

const getPositionsByID = (id) => {
    return Api.get(`organization/position/modal/${id}`).then(res => res)
}

const getOrganizationCounts = () => {
    return Api.get(`organization/count`).then(res => res)
}




const addCompanies = ({name, direction}) => {
    return Api.post(`organization/company/modal`,{
        name: name,
        direction: direction
    }).then(res => res)
}

const addDepartments = ({id, name}) => {
    return Api.post(`organization/department/modal`, {
        id: id,
        name: name
    }).then(res => res)
}

const addPositions = ({id, name}) => {
    return Api.post(`organization/position/modal`, {
        id: id,
        name: name
    }).then(res => res)
}




const editCompanies = (id, {name, direction}) => {
    return Api.put(`organization/company/modal/${id}`, {
        name: name,
        direction: direction
    }).then(res => res)
}

const editDepartments = (id, {name, company_id}) => {
    return Api.put(`organization/department/modal/${id}`, {
        name: name,
        company_id: company_id
    }).then(res => res)
}

const editPositions = (id, {name, department_id}) => {
    return Api.put(`organization/position/modal/${id}`, {
        name: name,
        department_id: department_id
    }).then(res => res)
}



const deleteCompanies = (id) => {
    return Api.delete(`organization/company/${id}`).then(res => res)
}

const deleteDepartments = (id) => {
    return Api.delete(`organization/department/${id}`).then(res => res)
}

const deletePositions = (id) => {
    return Api.delete(`organization/position/${id}`).then(res => res)
}

export {
    getCompanies,
    getCompaniesByID,
    getDepartments,
    getDepartmentsByID,
    getPositions,
    getPositionsByID,
    getOrganizationCounts,
    addCompanies,
    addDepartments,
    addPositions,
    editCompanies,
    editDepartments,
    editPositions,
    deleteCompanies,
    deleteDepartments,
    deletePositions
}