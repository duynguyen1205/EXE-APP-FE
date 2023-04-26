import axios from "../utils/axios-customize"


export const callRegister = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', { fullName, email, password, phone })
}

export const login = ( username, password) => {
    return axios.post('/api/v1/auth/login', {  username, password, delay: 1000 })
}

export const getUser = () => {
    return axios.get('/api/v1/auth/account')
}