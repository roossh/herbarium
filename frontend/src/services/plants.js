import axios from 'axios'
const baseUrl = '/api/plants'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const update = () => {
    const request = axios.put(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, update }