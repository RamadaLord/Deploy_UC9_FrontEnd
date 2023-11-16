import axios from 'axios'

const apiLocal = axios.create({
    // baseURL: 'http://localhost:3333'
    baseURL: 'https://node-deploy-senac-6mzx.onrender.com'
})

export default apiLocal