import axios from 'axios'

const apiDL = axios.create({
    baseURL:import.meta.env.VITE_API_URL
})

apiDL.interceptors.request.use(config=>{
    const token = localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// api.interceptors.request.use(config=>{
//     const token = import.meta.env.VITE_API_KEY
//     if(token){
//         config.headers['X-API-KEY'] = apikey
        
//     }
// })

export default apiDL