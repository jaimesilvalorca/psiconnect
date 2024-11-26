import axios from 'axios'

const apiORC = axios.create({
    baseURL:import.meta.env.VITE_API_ORC
})

apiORC.interceptors.request.use(config=>{
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default apiORC